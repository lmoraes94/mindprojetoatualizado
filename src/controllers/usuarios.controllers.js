const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt');
module.exports = {
    async index(req, res) {
        const user = await Usuario.find();
        res.json(user);
    },
    async create(req, res) {
        const { nome_usuario, email_usuario, tipo_usuario, senha_usuario, cpf_usuario } = req.body;


        let data = {};

        let user = await Usuario.findOne({ email_usuario });

        if (!user) {
            data = { nome_usuario, email_usuario, tipo_usuario, senha_usuario, cpf_usuario };

            user = await Usuario.create(data);
            return res.status(200).json(user);
        } else {
            return res.status(500).json(user);
        }

    },
    async details(req, res) {
        const { _id } = req.params;
        const user = await Usuario.findOne({ _id })
        res.json(user);
    },
    async delete(req, res) {
        const { _id } = req.query;
        const user = await Usuario.findByIdAndDelete({ _id });
        return res.json(user);
    },
    async update(req, res) {
        const { _id, nome_usuario, email_usuario, tipo_usuario, senha_usuario, cpf_usuario } = req.body;
        const data = { nome_usuario, email_usuario, tipo_usuario, senha_usuario, cpf_usuario };
        const user = await Usuario.findOneAndUpdate({ _id }, data, { new: true });
        res.json(user);
    },
    async login(req, res) {
        const { email, senha } = req.body;
        Usuario.findOne({ email_usuario: email }, function (err, user) {
            if (err) {
                console.log(err);
                res.status(500).json({ erro: "Erro no servidor, tente novamente" });
            } else if (!user) {
                res.status(403).json({ status: 2, erro: 'Email ou senha não conferem' });
            } else {
                if (!bcrypt.compareSync(senha,user.senha_usuario)) {
                    return res.status(403).json({ status: 2, erro: 'Email ou senha não conferem' });
                }
                const payload = { email };
                res.status(200).json({ status: 1, auth: true, id_client: user._id, user_name: user.nome_usuario });
            }
        })
    }
}