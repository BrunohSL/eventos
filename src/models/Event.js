const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  author: String,
  name: String,
  content: String,
  confirmCont: {
    type: Number,
    default: 0,
  },
  category: String,
  eventDate: Date,
  createdAt: {
    // yyyy/mm/dd
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Event', EventSchema);
