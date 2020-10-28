// import supertest from 'supertest';
// import express from 'express';
// import http from 'http';

// describe('demo test', () => {
//     let app, server;

//     beforeAll(done => {
//         app = new express();
//         server = http.createServer(app);
//         server.listen(done);
//     });

//     afterAll(done => {
//         server.close(done);
//     });

//     it('returns 500', async () => {
//         const response = await supertest(app).get('/');
//         expect(response.status).toBe(500);
//     });
// });









// const UserController = require('../controllers/UserController');

const request = require('supertest');
const app = require('express');
const http = require('http');
// import request from 'supertest';
// import express from 'express';
// import http from 'http';

// describe('demo test', () => {
//   // beforeAll(done => {
//   //     // app = new express();
//   //     server = http.createServer(app);
//   //     server.listen(done);
//   // });

//   // afterAll(done => {
//   //     server.close(done);
//   // });

//   it('should create a new user', async () => {
//     const res = await request('localhost:3000')
//       .post('/users/store')
//       .send({
//         name: "Teste",
//         email: "EmailTeste@teste.com",
//         password: "outroTeste",
//         passwordConfirmation: "diferente"
//       });
//     expect(res.statusCode).toEqual(500);
//     expect(res.body).toBe('A senha deve ser igual a confirmação de senha');
//   });
// });

const server = require('http').Server(app);

server.listen('3000');
// server = http.createServer(app);

describe('Post Endpoints', () => {
  it('should create a new user', async () => {
    const res = await request(server)
      .post('/users/store')
      .send({
        name: "Teste",
        email: "EmailTeste@teste.com",
        password: "outroTeste",
        passwordConfirmation: "diferente"
      });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toBe('A senha deve ser igual a confirmação de senha');
  });
});
// app.close();

// let req = {
//   body: {
//     name: "Teste",
//     email: "EmailTeste@teste.com",
//     password: "outroTeste",
//     passwordConfirmation: "diferente"
//   }
// }

// test('Error validation', () => {
//   expect(UserController.store()).toBe("O campo nome não pode ser vazio");
// });
