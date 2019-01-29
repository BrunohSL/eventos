jwt = require('jsonwebtoken');
const config = require('../../config');

module.exports = {

  async auth(req, res) {

    jwt.verify(req.headers.token, config.secret, function(err, decoded) {
      // console.log(decoded);

      if (decoded.email !== req.headers.email) {
        return res.json("You shall not pass");
      }

      // GERA UM NOVO TIMESTAMP
      const timestamp = new Date().getTime();
      // console.log(timestamp);
      // console.log(decoded.exp);
      // console.log(timestamp - decoded.exp);
      // var TimeStamp = timestamp - decoded.exp;

      // CONVERTE TIMESTAMP PARA DATA
      const teste = new Date(timestamp*1000);

      console.log(teste.toLocaleDateString("pt-BR"));
      console.log(teste);
      // console.log(timestamp.toLocaleDateString("pt-BR"));
      // console.log(timestamp);

      // if (res.status(500)) {
      //   return ({ auth: false, message: 'Failed to authenticate token.' });
      // }

      return res.json("true");
    });
  },
}
