const jwt = require('jsonwebtoken');
const User = require('../models/User');
const UserController = require('../controllers/UserController');
const config = require('../../config');

// var request = require("request");
var chai = require("chai");
var assert = chai.assert;
var expect = chai.expect;
var chaiHttp = require("chai-http");
var urlBase = "http://localhost:3000";

// var token = getToken();
// setTimeout(function() {console.log("Token: " + token)}, 5000);

async function getToken() {
  // var user = await User.find({email: "email@email.com"});
  // console.log("user: " + user);
  // var teste = UserController.login();
  // console.log("UserController.login: " + teste);
}


chai.use(chaiHttp);

describe("Create first user", function() {

  it ("Should teste getToken", function(done) {
    // getToken();

    // var user = async function() {
    //   await User.find({email: "email@email.com"});
    //   console.log("user: " + user);
    //   var teste = UserController.login();
    //   console.log("UserController.login: " + teste);
    // }
    var req = {body: {
      _id: "5c73535ac97ddb0beb055817",
      email: "email@email.com",
      password: "$2b$10$U85k4E307hDYB6ngosc1WeDgSFXkm80vAmHQdljR01UdSVilJUf76"
    }};

    var token = await UserController.login(req);

    console.log(token);

    done();
  });

  // it ("Should create the first user", function(done) {
  //   chai
  //   .request(urlBase)
  //   .post('/users/store')
  //   .send({
  //     name: "admin",
  //     password: "senha",
  //       passwordConfirmation: "senha",
  //       email: "email@email.com"
  //     })
  //     .end(function(err, res) {
  //       console.log("que merda");
  //       getToken().then(function() {
  //         console.log("tomilirola");
  //       })
  //       setTimeout(function(){}, 5000);
  //       // console.log(teste.body);
  //       // expect(res.statusCode).to.equal(200);
  //       // expect(res.body).to.equal("Usuário cadastrado com sucesso");
  //       done();
  //     });

  // });

  // it ("Should login", function(done){

  //   // var token = getToken();

  //   // console.log(token);

  //   chai
  //     .request(urlBase)
  //     .post('/login')
  //     .send({
  //       email: "email@email.com",
  //       password: "senha"
  //     })
  //     .end(function(err, res) {
  //       // console.log(res.body);
  //       // token = res.body;
  //       // console.log(token);
  //       // console.log("meu ovo");

  //       chai
  //       .request(urlBase)
  //       .get('/users')
  //       // .set({
  //       //   email: "email@email.com",
  //       //   token: token
  //       // })
  //       .end(function(err, res) {
  //         // console.log("meu ovo2");
  //         // console.log(token);
  //         // console.log(res.body);
  //         // console.log(token);
  //         done();
  //       })
  //     });

  //     // console.log("Meu ovo no chai");
  //     // setTimeout(
  //       // , 500);

  //   // chai
  //   //   .request(urlBase)
  //   //   .get('/users')
  //   //   .set({
  //   //     email: "email@email.com",
  //   //     token: token
  //   //   })
  //   //   .end(function(err, res) {
  //   //     // console.log(token);
  //   //     // console.log(res.body);
  //   //     // console.log(token);
  //   //   });

  // });

  // it ("Should show 1 user", function(done) {
  //   chai
  //     .request(urlBase)
  //     .get('/users')
  //     .set({email: "email@email.com", token: token})
  //     .end(function(err, res) {
  //       console.log(res.body);
  //       console.log(token);
  //       done();
  //     })
  // });
});
