const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect('mongodb://root:root123@ds211724.mlab.com:11724/calendario-evento', {
  useNewUrlParser: true
});
// mongoose.connect('mongodb://root:root123@ds331145.mlab.com:31145/eventstest', {
  // useNewUrlParser: true
// });

app.use((req, res, next) => {
  req.io = io;

  return next();
});

app.use(cors());
app.use(express.json());
app.use(require('./routes'));

server.listen(3000, () => {
  console.log('Server started on port :3000');
});
