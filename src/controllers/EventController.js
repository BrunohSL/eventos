const Event = require('../models/Event');

module.exports = {
  async index(req, res) {
    // O sort no find ordena por data de criação
    // O ' - ' antes do parametro é para inverter a ordenação
    const events = await Event.find({}).sort("-createdAt");

    return res.json(events);
  },

  async store(req, res) {

    validation(req, res);

    const event = await Event.create(req.body);

    // console.log(req.body);

    //envia um evento para todos que estão conectados na aplicação
    //esse evento é a criação de um novo event
    req.io.emit('event', event);

    return res.json(event);
    // return res.json("true");
  },

  async update(req, res) {
    // console.log(req.body);

    const event = await Event.findById(req.params.id);

    validation(req, res);

    event.set(req.body);
    await event.save();

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

function validation(req, res) {
  if(!req.body.name) {
    return res.json("O nome do evento não pode ser vazio");
  }

  if (!req.body.category) {
    return res.json("Você precisa informar uma categoria");
  }

  if (!req.body.location) {
    return res.json("Você precisa informar o local do evento");
  }

  if (!req.body.eventDate) {
    return res.json("Você precisa informar a data do evento");
  }
}
