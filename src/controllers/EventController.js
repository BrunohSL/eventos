const Event = require('../models/Event');

module.exports = {
  async index(req, res) {
    // O sort no find ordena por data de criação
    // O ' - ' antes do parametro é para inverter a ordenação
    const events = await Event.find({}).sort("-createdAt");

    return res.json(events);
  },

  async store(req, res) {
    const event = await Event.create(req.body);

    //envia um evento para todos que estão conectados na aplicação
    //esse evento é a criação de um novo event
    req.io.emit('event', event);

    return res.json(event);
  },

  async participate(req, res) {
    const event = await Event.findById(req.params.id);

    event.set({ confirmCont: event.confirmCont +1 });

    await event.save();

    req.io.emit('participate', event);

    return res.json(event);
  },

  async delete(req, res) {
    const event = await Event.findById(req.params.id);

    event.delete();

    return res.json("Evento excluído com sucesso");
  }
};
