const User = require('../models/User');

module.exports = {
  async index(req, res) {
    // O sort no find ordena por data de criação
    // O ' - ' antes do parametro é para inverter a ordenação
    const users = await User.find({}).sort("-createdAt");

    return res.json(users);
  },

  async store(req, res) {
    // console.log('Rola');
    // const teste = await ;
    // console.log(teste);

    if(User.find({'email':req.body.email})){
      return res.json("Email já está cadastrado, tente outro e-mail");
    }

    const user = await User.create(req.body);
    //envia um evento para todos que estão conectados na aplicação
    //esse evento é a criação de um novo event
    req.io.emit('user', user);

    return res.json(user);

    // usar salt para o md5 da senha
    // enviar duas senhas, validar se estão iguais e salvar apenas um valor
    // validar se já existe e-mail cadastrado - FEITO
    // validar formato do email antes de salvar
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
};
