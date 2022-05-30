const https = require("https");
const fs = require("fs");
const journey = require("journey");

var mrouter = new (journey.Router)();

// Lectura de certificado público y clave privada
const options = {
    key: fs.readFileSync("cert/key.pem"),
    cert: fs.readFileSync("cert/cert.pem")
};

// ROUTING REST API request
mrouter.map(function () {
    
    // GET por defecto
    // https://localhost:8080/
    this.root.bind(function (req, res) {
        res.send("Bienvenido al API REST sobre https")
    });

    // GET request /sd
    // https://localhost:8080/sd
    this.get("/sd").bind(function (req, res) {
        res.send("petición GET sobre SD")
    });

    // GET request /sd/([A-Za-z0-9_]+)
    // https://localhost:8080/sd/25
    this.get(/^sd\/([A-Za-z0-9_]+)$/).bind(function (req, res, id) {
        res.send("Petición GET sobre SD: " + id)
    });

    /* GET request con 3 parámetros codificados mediante expresiones regulares.
    ** https://localhost:8080/param1/id1/param2/hola/param3/mundo 
    */
    this.get(/^param1\/([A-Za-z0-9_]+)\/param2+\/([A-Za-z0-9_]+)\/param3+\/([A-Za-z0-9_]+)$/).bind(function (req, res, param1, param2, param3) {
        res.send('GET p1 '+param1+ ' p2: '+param2 + ' p3: '+ param3);
    });
    

    /* PUT request con varios parámetros codificados mediante expresiones regulares.
    ** https://localhost:8080/param1/id1/param2/hola/param3/mundo
    */
    this.put(/^param1\/([A-Za-z0-9_]+)\/param2+\/([A-Za-z0-9_]+)\/param3+\/([A-Za-z0-9_]+)$/).bind(function (req, res, param1, param2, param3,data) {
        res.send('PUT '+param1+ ' p1: '+param2 + ' p2: '+ param3);
    });

    /** POST request con varios parámetros codificados mediante expresiones regulares.
     *  https://localhost:8080/param1/id1/param2/hola/param3/mundo
     */
    this.post(/^param1\/([A-Za-z-0-9_]+)\/param2+\/([A-Za-z0-9_]+)\/param3+\/([A-Za-z0-9_]+)$/).bind(function (req, res, param1, param2, param3, data) {
        res.send("POST " + param1 + " p1: " + param2 + " p2: " + param3);
    });

    /** DELETE request con varios parámetros codificados mediante expresiones regulares. *
     *  https://localhost:8080/delete/usuario/id/25
     */
    this.get(/^delete\/([A-Za-z0-9_]+)\/id+\/([A-Za-z0-9_]+)$/).bind(function (req, res, entidad, id) {
        res.send("DELETE " + entidad + " id: " + id);
    });

}); // end mapping

// Creación del servidor https
https.createServer(options, function (request, response) {
    var body = "";
    
    request.addListener("data", function (chunk) { body += chunk });
    request.addListener("end", function () {

        mrouter.handle(request, body, function (result) {

            response.writeHead(result.status, result.headers);
            response.end(result.body);

        });

    });
}).listen(8080);