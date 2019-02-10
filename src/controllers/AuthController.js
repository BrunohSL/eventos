jwt = require('jsonwebtoken');
const config = require('../../config');

module.exports = {

  async auth(req, res, next) {
    jwt.verify(req.headers.token, config.secret, function(err, decoded) {
      if (err) {
        return res.json(err);
      }

      if (decoded.email !== req.headers.email) {
        return res.json("You shall not pass");
      }
      console.log("Valid authentication");
      next();
    });
  },
}
