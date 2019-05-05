const User = require('../models/User');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const config = require('../../config');

module.exports = {
    /**
     * Retorna a lista de usuários cadastrados
     */
    async index(req, res) {
        // Busca no banco por todos os usuários cadastrados
        // O sort no find ordena por data de criação
        // O ' - ' antes do parametro é para inverter a ordenação
        const users = await User.find({}).sort("-createdAt");

        // Retorna a lista de usuários
        return res.json(users);
    },

    /**
     * Cadastra um novo usuário no banco de dados
     */
    async store(req, res) {

        // Chama a função responsável pela validação dos campos
        var message = validation(req);

        // Caso exista alguma mensagem de erro retorna a mensagem
        if (message) {
            return res.json(message);
        }

        // Trata a senha com o bcrypt (criptografia)
        bcrypt.hash(req.body.password, 10, function(err, hash) {
            // Se der erro retorna a mensagem de erro
            if(err) {
                return err.msg;
            }

            // Salva o valor criptografado como senha do usuário
            req.body.password = hash;

            // Busca por um usuário com o e-mail recebido na request
            User.find({email:req.body.email}, function(err, docs) {
                // Se der erro retorna a mensagem de erro
                if(err) {
                    return err.msg;
                }

                // Caso encontre um usuário com mesmo e-mail retorna a mensagem
                if(docs.length >0) {
                    return res.json("Email já está cadastrado, tente outro e-mail");
                }

                // Salva o usuário no banco de dados
                user = User.create(req.body);

                // envia um evento para todos que estão conectados na aplicação
                // esse evento é a criação de um novo event
                // req.io.emit('user', user);

                return res.json("Usuário cadastrado com sucesso");
            });
        });
    },

    /**
     * Atualiza as informações de um usuário com os dados recebidos via request
     */
    async update(req, res) {
        // Busca um usuário pelo id passado na requisição
        const user = await User.findById(req.params.id);

        // Caso não encontre um usuário retorna a mensagem
        if (!user) {
            return res.json("Usuário não encontrado");
        }

        // Chama a função responsável pela validação dos campos
        var message = validation(req);

        // Caso exista alguma mensagem de erro retorna a mensagem
        if (message) {
            return res.json(message);
        }

        // Altera os dados do usuário conforme o que foi passado na request
        user.set(req.body);

        // Salva no banco o usuário com os dados alterados
        await user.save();

        return res.json(user);
    },

    /**
     * Deleta um usuário do banco de dados
     */
    async delete(req, res) {
        // Busca um usuário pelo id passado na requisição
        const user = await User.findById(req.params.id);

        // Caso não encontre um usuário retorna a mensagem
        if (!user) {
            return res.json("Usuário não encontrado");
        }

        // Remove o usuário do banco de dados
        user.delete();

        return res.json("Usuário excluído com sucesso");
    },

    /**
     * Realiza o login do usuário no sistema. Retorna o token de autenticação
     */
    async login(req, res) {
        // Busca um usuário pelo e-mail passado na request
        User.findOne({email:req.body.email}, function(err, user) {
            // Se der erro retorna a mensagem de erro
            if(err) {
                return err.msg;
            }

            // Caso não encontre um usuário retorna a mensagem
            if (!user) {
                return res.json("You shall not pass");
            }

            // Caso encontre um usuário cadastrado
            if (user) {
                // Usa o bcrypt para validar se a senha está correta
                bcrypt.compare(req.body.password, user.password, function(err, response) {
                    // Se der erro retorna a mensagem de erro
                    // if(err) {
                    //     return err.msg;
                    // }

                    console.log(response);

                    // Caso não retorne
                    if (!response) {
                        return res.json("You shall not pass");
                    }

                    if (response) {
                        var token = jwt.sign({ id: user._id, email: user.email }, config.secret, {
                            expiresIn: 86400 // expires in 24 hours
                        });
                        return res.json(token);
                    }
                });
            }
        });
    },
};

/**
 * Responsável pelas validações das informações que são enviadas na request
 */
function validation(req) {

    // Caso não envie o nome do usuário
    if (!req.body.name) {
        return "O campo nome não pode ser vazio"
    }

    // Caso não envie a senha do usuário
    if (!req.body.password && !req.body.passwordConfirmation) {
        return "É necessário preencher ambos os campos de senha";
    }

    // Caso a senha não seja igual a confirmação de senha
    if (req.body.password !== req.body.passwordConfirmation) {
        return "A senha deve ser igual a confirmação de senha";
    }

    // Regex que valida o formato de e-mail enviado
    const regexObj = new RegExp('.*@.+\..+');

    // Recebe 0 ou 1 após validar o e-mail com o regex
    let emailValidation = req.body.email.match(regexObj);

    // Caso o e-mail não passe no regex
    if (!emailValidation) {
        return "O e-mail não está em um formato válido";
    }
}
