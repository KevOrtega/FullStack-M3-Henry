const express = require('express');
const app = express();

app.use(express.json()); // for parsing application/json

app.get('/test', (_req, res) => {
  res.send({
    message: 'hola',
  });
});

app.get('/', (_req, res) => {
  res.send({
    message: 'hola',
  });
});

app.post('/Pluck', (req, res) => {
  const { array } = req.body

  if(!Array.isArray(array)) res.status(400).send({error: 'Expected array not found'})

  const result = []
  
  array.forEach(obj => result.push(...Object.values(obj)))

  result.length ?
  res.status(200).send({result: result}) :
  res.status(400).send({error: 'Objects in array has no values'})
})

app.post('/numString', (req, res) => {
  const { str } = req.body
  
  if(typeof str !== "string") res.status(400).send({error: 'Expected string not found'})

  res.status(200).send({result: str.length})
})

app.post('/sumArray', (req, res) => {
  const { array, num } = req.body
  const sumSet = new Set(array)

  if(sumSet.size !== array.length) res.status(400).send({error: 'The array contains two equal elements'})

  res.send({
    result: array.reduce((prev, curr) => prev + curr) === num,
  });
});

app.post('/sum', (req, res) => {
  res.send({
    result: req.body.a + req.body.b,
  });
});

app.post('/product', (req, res) => {
  res.send({
    result: req.body.a * req.body.b,
  });
});

module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
