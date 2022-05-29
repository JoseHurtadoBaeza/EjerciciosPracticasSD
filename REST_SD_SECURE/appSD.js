const https = require("https");
const fs = require("fs");

const options = {
    key: fs.readFileSync("cert/key.pem"),
    cert: fs.readFileSync("cert/cert.pem")
};

https.createServer(options, function (req, res) {
    res.writeHead(200);
    res.end("Hola Mundo\n");
}).listen(8080);