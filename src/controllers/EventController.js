const Event = require('../models/Event');
const User = require('../models/User');

module.exports = {
    /**
     * Função responsável por trazer todos os registros de evento do banco de dados
     */
    async index(req, res) {
        // Busca no banco por todos os usuários cadastrados
        // O sort no find ordena por data de criação
        // O ' - ' antes do parametro é para inverter a ordenação
        const events = await Event.find({}).sort("-createdAt");

        return res.json(events);
    },
    /**
     * Função responsável por armazenar um novo evento no baco de dados
     */
    async store(req, res) {
        // Valida os dados de cadastro recebidos no request
        var message = validation(req);

        // Se a validação retornar alguma mensagem, retorna a mensagem de erro
        if (message) {
            return res.json(message);
        }

        // Recebe os parametros enviados
        var event = req.body;

        // Busca pelo usuário que possui o e-mail enviado no header do request
        User.findOne({email: req.headers.email}, function(err, user) {
            // Registra no evento o id do usuário encontrado como criador do evento
            event.createdBy = user.id;

            // Cadastra o evento no banco de dados
            event = Event.create(req.body);

            //envia um evento para todos que estão conectados na aplicação
            //esse evento é a criação de um novo event
            req.io.emit('event', event);
        });

        return res.json(event);
    },

    /**
     * Função responsável por atualizar os dados de um evento
     */
    async update(req, res) {
        // Busca o evento com id passado na request
        const event = await Event.findById(req.params.id);

        // Valida os dados enviados na request
        var message = validation(req);

        // Se a validação retornar alguma mensagem, retorna a mensagem de erro
        if (message) {
            return res.json(message);
        }

        // Atualiza o evento com os dados passados via update
        event.set(req.body);

        // Salva o evento no banco de dados
        await event.save();

        return res.json(event);
    },

    /**
     * Função responsável por inscrever um usuário em um evento
     */
    async participate(req, res) {
        // Busca pelo evendo com id passado por parametro na request
        const event = await Event.findById(req.params.id);

        // Busca pelo usuário com email recebido no header da request
        const user = await User.findOne({email: req.headers.email});

        // Recebe se o usuário já está participando do evento
        var participating = false;

        // Recebe a mensagem se o usuário já estiver inscrito no evento
        var msg = "";

        // Caso não encontre um evento retorna a mensagem
        if (!event) {
            return res.json("Não encontrou o evento informado");
        }

        // Valida se já existe o ID do evento dentro da lista de eventos confirmados do usuário
        user.confirmedEvents.forEach((confirmedEvent) => {
            // Se encontrar, atualiza participating para true e retorna a mensagem
            if (confirmedEvent === req.params.id) {
                // Atualiza a flag indicando que o usuário está participando do evento e retorna a mensagem
                participating = true;
                return msg = "Você já está participando deste evento";
            }
        });

        // Valida se já existe o ID do usuário dentro da lista de usuários confirmados do evento
        event.confirmedUsers.forEach((confirmedUser) => {
            // Se encontrar, atualiza participating para true e retorna a mensagem
            if (confirmedUser === user.id) {
                // Atualiza a flag indicando que o usuário está participando do evento e retorna a mensagem
                participating = true;
                return msg = "Você já está participando deste evento";
            }
        });

        // Se existir mensagem na variável retorna a mensagem
        if (msg) {
            return res.json(msg);
        }

        // Se o usuário não estiver inscrito no evento
        if (!participating) {
            // Adiciona o id do usuário na lista de usuários inscritos no evento e salva no banco de dados
            event.confirmedUsers.push(user.id);
            event.save();

            // Adiciona o id do evento na lista de eventos confirmados do usuário e salva no banco de dados
            user.confirmedEvents.push(event.id);
            user.save();

            return res.json("Inscrição concluída");
        }
    },

    /**
     * Função responsável por remover um usuário de um evento
     */
    async quitEvent(req, res) {
        const event = await Event.findById(req.params.id);
        var userId;

        await User.findOne({email: req.headers.email}, function(err, user) {
            userId = user.id;
        });

        var find = false;
        var count = 0;
        var newList = [];
        event.confirmedUsers.forEach(user => {
            if (user != userId) {
                newList.push(user);
                count++
            }

            if (user === userId) {
                find = true
            }
        });

        if (find) {
            event.set({confirmCont: count});
            event.set({confirmedUsers: newList});
            event.save();
            find = false;
            return res.json("Cancelou a participação no evento");
        }
        return res.json("Não está participando do evento");
    },

    async delete(req, res) {
        const event = await Event.findById(req.params.id);

        event.delete();

        return res.json("Evento excluído com sucesso");
    },
};

/**
 * Função responsável por validar dados de cadastro e update enviadas via request
 */
function validation(req) {
    // Caso não informe o nome do evento
    if (!req.body.name) {
        return "O nome do evento não pode ser vazio";
    }

    // Caso não informe a categoria do evento
    if (!req.body.category) {
        return "Você precisa informar uma categoria";
    }

    // Caso não informe a localização do evento
    if (!req.body.location) {
        return "Você precisa informar o local do evento";
    }

    // Caso não informe a data do evento
    if (!req.body.eventDate) {
        return "Você precisa informar a data do evento";
    }

    // Caso não informe o horário do evento
    if (!req.body.eventTime) {
        return "Você precisa informar a data do evento";
    }
}
