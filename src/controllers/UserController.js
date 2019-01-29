const User = require('../models/User');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const config = require('../../config');

module.exports = {
  async index(req, res) {
    // O sort no find ordena por data de criação
    // O ' - ' antes do parametro é para inverter a ordenação
    const users = await User.find({}).sort("-createdAt");

    // console.log("teste");

    return res.json(users);
  },

  async store(req, res) {

    if(req.body.password !== req.body.passwordConfirmation){
      return(res.json("A senha deve ser igual a confirmação de senha"));
    }

    const regexObj = new RegExp('.*@.+\..+');
    let emailValidation = req.body.email.match(regexObj);

    if(!emailValidation){
      return res.json("O e-mail não está em um formato válido");
    }

    bcrypt.hash(req.body.password, 10, function(err, hash) {
      const hashPassword = hash;
      req.body.password = hashPassword;

      User.find({email:req.body.email}, function(err, docs){

        if(docs.length >0){
          return res.json("Email já está cadastrado, tente outro e-mail");
        }

        const user = User.create(req.body);

        // envia um evento para todos que estão conectados na aplicação
        // esse evento é a criação de um novo event
        req.io.emit('user', user);

        return res.json(user);

      });
    });

  },

  async teste(req, res) {
    bcrypt.hash(req.body.senha, 10, function(err, hash) {
      const hashSenha = hash;

      console.log(hashSenha);
    });
  },

  // async update(req, res){
    //Receber parametros também
    //const user = await User.findById(req.params.id);
    // event.set({ confirmCont: event.confirmCont +1 });
    // await event.save();
  // },

  async delete(req, res){
    const user = await User.findById(req.params.id);

    user.delete();

    return res.json("Usuário excluído com sucesso");
  },

  async login(req, res){
    // console.log(req.headers);
    User.findOne({email:req.body.email}, function(err, user){

      if(!user) {
        return res.json("You shall not pass");
      }

      if(user){
        bcrypt.compare(req.body.password, user.password, function(err, response) {

          if(!response) {
            return res.json("You shall not pass");
          }

          if(response) {
            var token = jwt.sign({ id: user._id, email: user.email }, config.secret, {
              // expiresIn: 86400 // expires in 24 hours
              expiresIn: 86400 // expires in 24 hours
            });
            return res.json("Utilize o token abaixo para acessar a API: " + token);
          }
        })
      }
    });
  },
};
