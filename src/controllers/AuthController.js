jwt = require('jsonwebtoken');
const config = require('../../config');

module.exports = {

  async auth(req, res) {

    jwt.verify(req.headers.token, config.secret, function(err, decoded) {
      if (err) {
        return res.json("false time");
      }

      if (decoded.email !== req.headers.email) {
        return res.json("false email");
      }

      return res.json("True");
    });
  },
}
