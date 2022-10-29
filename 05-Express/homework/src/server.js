// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

const server = express();
// to enable parsing of json bodies for post requests
// server.use(express.json());
server.use(express.json())

// TODO: your code to handle requests

server.post('/posts/author/:author', (req, res) => {
    const {params: { author }, body: {contents, title}} = req;

    if(!contents || !title) res.status(STATUS_USER_ERROR).send({error: "information incomplete"})

    const post = {
        id: posts.length,
        author,
        title,
        contents
    }

    posts.push(post)

    res.status(200).send(post)
})

server.post("/posts", (req, res) => {
    const { author, contents, title } = req.body
    
    if(!author || !contents || !title) res.status(STATUS_USER_ERROR).send({error: "information incomplete"})

    const newPost = {id: posts.length, ...req.body}

    posts.push(newPost)

    res.status(200).send(newPost)
})

server.get("/posts/:author/:title", (req, res) => {
    const {params: {author, title}} = req

    const postsMatched = posts.filter(post => post.author === author && post.title.includes(title))

    if(!postsMatched.length) res.status(STATUS_USER_ERROR).send({error: "No existe ningun post con dicho titulo y autor indicado"})

    res.status(200).send(postsMatched)
})

server.get("/posts/:author", (req, res) => {
    const {params: {author}} = req

    const postsMatched = posts.filter(post => post.author === author)

    if(!postsMatched.length) res.status(STATUS_USER_ERROR).send({error: "Author not found"})

    res.status(200).send(postsMatched)
})

server.get("/posts", (req, res) => {
    const { term } = req.query

    if(req.query.term) res.send(posts.filter(post => post.title.includes(term) || post.contents.includes(term)))

    res.send(posts)
})

server.put("/posts", (req, res) => {
    const changes = req.body
    const postIndex = posts.findIndex(post => post.id === changes.id)

    if(!changes.title ||
    !changes.contents ||
    postIndex === -1) res.status(STATUS_USER_ERROR).send({error: "information incomplete"})

    Object.assign(posts[postIndex], changes)

    res.status(200).send(posts[postIndex])
})

server.delete("/posts", (req, res) => {
    const { id } = req.body
    const postIndex = posts.findIndex(post => post.id === id)

    if(postIndex === -1) res.status(STATUS_USER_ERROR).send({error: "information incomplete"})

    posts.splice(postIndex, 1)

    res.status(200).send({success: true})
})

server.delete("/author", (req, res) => {
    const { author } = req.body

    const postsDeleted = posts.filter(post => post.author === author)
    if(!postsDeleted.length) res.status(STATUS_USER_ERROR).send({error: "No existe el autor indicado"})

    postsDeleted.forEach(post => posts.splice(posts.indexOf(post), 1))

    res.status(200).send(postsDeleted)
})

module.exports = { posts, server };
