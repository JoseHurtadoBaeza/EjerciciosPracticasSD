const https = require('https')
const data = new TextEncoder().encode(
    JSON.stringify({
        todo: 'data to send'
    })
)

const options = {
    hostname: 'jose-B450-AORUS-PRO',
    port: 8080,
    path: 'param1/id1/param2/hola/param3/mundo',
    method: 'POST',
    rejectUnauthorized: false, // Para que admita certificados autofirmados
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
}

const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', d => {
        process.stdout.write(d)
    })
})

req.on('error', error => {
    console.error(error)
})

req.write(data)
req.end()