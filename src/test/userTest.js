// /**
//  * Carrega as bibliotecas que vamos utilizar
//  * O mocha nao eh carregado aqui, pois ele que executa este arquivo
//  */
// // var should = require("should");
// var request = require("request");
// var chai = require("chai");
// var assert = chai.assert;
// var expect = chai.expect;
// var chaiHttp = require('chai-http');
// var urlBase = "http://localhost:3000";

// chai.use(chaiHttp);

// // Criamos nosso primeiro caso de teste e fornecemos uma descricao utilizando describe
// describe("Teste usuário", function() {
//   // a funcao it eh o que vamos testar realmente, neste caso o endpoint /cards, que deve retornar no maximo 100 cartas
//   it ("Não deve existir usuário", function(done) {
//     request.get (
//       {
//         url: urlBase + "/users"
//       },
//       function(error, res, body) {

//         // precisamos converter o retorno para um objeto json
//         // var _body = {};

//         console.log("Body: " + body);
//         console.log("res code: " + res.statusCode)
//         console.log("error: " + error);
//         // try{
//         //   _body = JSON.parse(body);
//         // }
//         // catch(e){
//         //   _body = {};
//         // }

//         // utilizando a funcao expect do chai, vamos verificar se o resultado da chamada foi sucesso (200)
//         expect(res.statusCode).to.equal(200);
//         // expect(_body).to.have.lengthOf(0);
//         assert.lengthOf(body, 0);

//         done(); // avisamos o test runner que acabamos a validacao e ja pode proseeguir
//       }
//     );
//   });

//   it ("Deve cadastrar 1 usuário", function(done) {
//     chai
//       .request(urlBase)
//       .post('/users/store')
//       .send({
//         "name": "bruno",
//         "password": "senha",
//         "passwordConfirmation": "senha",
//         "email": "email@email.com"
//       })
//       .end(function(error, response, body) {
//         if (error) {
//             done(error);
//         } else {
//             done();
//         }
//     });

//     done();
//   });
// });