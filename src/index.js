const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use((req, res, next) => {
  req.io = io;

  return next();
});

mongoose.connect('mongodb+srv://root:root@cluster0.066s0.mongodb.net/calendarioEvento?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use(require('./routes'));

server.listen(3010, () => {
  console.log('Server started on port :3010');
});
