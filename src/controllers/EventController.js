const Event = require('../models/Event');

module.exports = {
  async index(req, res) {
    // O sort no find ordena por data de criação
    // O ' - ' antes do parametro é para inverter a ordenação
    const events = await Event.find({}).sort("-createdAt");

    // return res.json(events);
  },

  async store(req, res) {
    console.log(req.body);
    const event = await Event.create(req.body);

    console.log(req.body);

    //envia um evento para todos que estão conectados na aplicação
    //esse evento é a criação de um novo event
    req.io.emit('event', event);

    // return res.json(event);
  }
};
