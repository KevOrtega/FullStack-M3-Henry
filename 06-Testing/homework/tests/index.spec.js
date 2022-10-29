const session = require('supertest-session');
const app = require('../index.js'); // Importo el archivo de entrada del server de express.

const agent = session(app);

describe('Test de APIS', () => {
  describe('GET /', () => {
    it('responds with 200', () => agent.get('/').expect(200));
    it('responds with and object with message `hola`', () =>
        agent.get('/').then((res) => {
          expect(res.body.message).toEqual('hola');
        }));
  });

  describe('GET /test', () => {
    it('responds with 200', () => agent.get('/test').expect(200));
    it('responds with and object with message `test`', () =>
      agent.get('/test').then((res) => {
        expect(res.body.message).toEqual('hola');
      }));
  });

  describe('POST /sum', () => {
    it('responds with 200', () => agent.post('/sum').expect(200));
    it('responds with the sum of 2 and 3', () =>
      agent.post('/sum')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(5);
        })
    );
  });

  describe('POST /producto', () => {
    it('responds with 200', () => agent.post('/product').expect(200));
    it('responds with the product of 2 and 3', () =>
      agent.post('/product')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(6);
        })
    );
  });

  describe('POST /sumArray', () => {
    it('responds with 200', () => agent.post('/sumArray').send({array: [1, 5, 7], num: 13}).expect(200))
    it('if sum of array is equal to num responds with an object with result true', () =>
      agent.post('/sumArray')
        .send({array: [1, 5, 7], num: 13})
        .then(res => expect(res.body.result).toEqual(true)))
    it('if sum of array is not equal to num responds with result false', () =>
      agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 13})
        .then(res => expect(res.body.result).toEqual(false)))
    it('if the array contains 2 equal elements responds with error', () =>
      agent.post('/sumArray')
        .send({array: [5,5,7,10,11,15,20], num: 13})
        .expect(400)
        .then(res => expect(res.body.error).toEqual('The array contains two equal elements')))
  });

  describe('POST /numString', () => {
    it('responds with 200', () => 
    agent.post('/numString').send({str: 'hola'}).expect(200))
    it('responds with the length of the string', () => 
    agent.post('/numString')
      .send({str: 'hola'})
      .then(res => expect(res.body.result).toBe(4)))
    it('responds with error if str is not a string', () =>
    agent.post('/numString')
      .send({str: 155})
      .expect(400))
    it('responds with error if str its empty', () =>
    agent.post('/numString')
      .send({})
      .expect(400))
  })
  describe('POST /Pluck', () => {
    it('responds with 200', () => agent.post('/Pluck').send({array: [{num: 123}]}).expect(200))
    it('receive an array of objects and respond with an array of the values', () =>
    agent.post('/Pluck')
      .send({array: [{num: 144}, {num: 13123}, {num: 1234}]})
      .then(res => expect(res.body.result).toEqual([144, 13123, 1234])))
    it('responds with error if array is not an array', () =>
    agent.post('/Pluck')
     .send({array: 'hola'})
     .expect(400))
    it('responds with error if array has no values', () =>
    agent.post('/Pluck')
      .send({array: []})
      .expect(400))
  })
})
