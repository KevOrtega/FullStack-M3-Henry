var http = require('http');
var fs   = require('fs');

var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]

http.createServer((req, res) => {
  const [url, params] = req.url.replace("%20", " ").split("/").splice(1)
  const beatle = beatles.find(e => e.name == url || e.name == params)

  if(!url) {
    res.writeHead(200, {"Content-Type": "text/html"})
    res.end(fs.readFileSync(__dirname + "/index.html", "utf8"))
  }

  if(url === "api") {
    res.writeHead(200, {"Content-Type": "application/json"})
    if(!params) res.end(JSON.stringify(beatles))
    res.end(JSON.stringify(beatle || "error: not found"))
  }

  const beatleHTML = fs.readFileSync(__dirname + "/beatle.html", "utf8").replaceAll("{name}", beatle.name).replaceAll("{birthday}", beatle.birthdate).replaceAll("{imageSource}", beatle.profilePic)

  res.writeHead(200, {"Content-Type": "text/html"})
  res.end(beatle ? beatleHTML : "error: not found")
}).listen(3001, "localhost")