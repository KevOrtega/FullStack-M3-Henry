var fs  = require("fs")
var http  = require("http")

// Escribí acá tu servidor
var images = {
    arcoiris: "showByName/images/arcoiris_doge.jpg",
    badboy: "showByName/images/badboy_doge.jpg",
    code: "showByName/images/code_doge.jpg",
    resaca: "showByName/images/resaca_doge.jpg",
    retrato: "showByName/images/retrato_doge.jpg",
    sexy: "showByName/images/sexy_doge.jpg",
}
http.createServer((req, res) => {
    if(!images[req.url.slice(1)]) {
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end("error: not found")
    }

    res.writeHead(200, {"Content-Type": "image/jpeg"});
    res.end(fs.readFileSync(images[req.url.slice(1)]));
}).listen(3001, "localhost")