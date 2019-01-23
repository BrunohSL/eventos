const User = require('../models/User');
const passwordHash = require('password-hash');

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

    const hashPassword = passwordHash.generate(req.body.password);
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

  // async login(req, res){

  // }
};
