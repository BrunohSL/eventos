const jwt = require('jsonwebtoken');
const config = require('../../config');

function autentication() {
  console.log("minha rola");
}

module.exports.auth = (req, res, next) => {
  jwt.verify(req.headers.token, config.secret, function(err, decoded) {

    if (err) {
      return res.json("false time");
    }

    if (decoded.email !== req.headers.email) {
      return res.json("false email");
    }

    return res.json("True");
  });
}
