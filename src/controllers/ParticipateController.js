const Event = require('../models/Event');

module.exports = {
  async participate(req, res) {
    const event = await Event.findById(req.params.id);

    event.set({ confirmCont: event.confirmCont +1 });

    await event.save();

    req.io.emit('participate', event);

    return res.json(event);
  },
};
