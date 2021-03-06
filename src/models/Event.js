const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  createdBy: String,
  name: String,
  description: String,
  confirmedUsers: {
    type: Array,
    default: [],
  },
  confirmCont: {
    type: Number,
    default: 0,
  },
  category: String,
  eventDate: Date,
  eventTime: [Number],
  location: [String],
  createdAt: {
    // yyyy/mm/dd
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Event', EventSchema);
