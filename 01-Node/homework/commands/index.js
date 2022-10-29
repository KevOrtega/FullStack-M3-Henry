const fs = require('fs')
const request = require('request')

module.exports = {
    pwd: () => process.stdout.write(process.cwd() + "\nPrompt > "),
    date: () => process.stdout.write(Date() + "\nPrompt > "),
    ls: () => fs.readdir('.', (err, files) => {
        if(err) throw err
        process.stdout.write(files.join("\n") + "\n")
        process.stdout.write("Prompt > ")
    }),
    echo: ([str]) => str[0] === "$" ? process.stdout.write(process.env[str.slice(1)] + "\nPrompt > ") : process.stdout.write(str + "\nPrompt > "),
    cat: ([filename]) => fs.readFile(filename, "utf8", (err, data) => {
        if(err) throw err
        process.stdout.write(data + "\nPrompt > ")
    }),
    head: ([filename]) => fs.readFile(filename, "utf8", (err, data) => {
        if(err) throw err
        process.stdout.write(data.split("\n")[0] + "\nPrompt > ")
    }),
    tail: ([filename]) => fs.readFile(filename, "utf8", (err, data) => {
        if(err) throw err
        process.stdout.write(data.split("\n").at(-1) + "\nPrompt > ")
    }),
    curl: ([path]) => {
        request(path.toString(), (err, data) => process.stdout.write(data.body + "\nPrompt > "))
    }
}