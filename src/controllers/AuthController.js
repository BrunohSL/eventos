jwt = require('jsonwebtoken');
const config = require('../../config');

module.exports = {
    /**
     * Função responsável por autenticar o token de login
     */
    async auth(req, res, next) {
        // Função que verifica o token enviado
        jwt.verify(req.headers.token, config.secret, function(err, decoded) {
        // Trata a mensagem de erro
        if (err) {
            return res.json(err);
        }

        // Caso o e-mail enviado no header não seja igual ao e-mail do token
        if (decoded.email !== req.headers.email) {
            return res.json("You shall not pass");
        }
        console.log("Valid authentication");
        // Chama a próxima função após realizar a validação
        next();
        });
    },
}
