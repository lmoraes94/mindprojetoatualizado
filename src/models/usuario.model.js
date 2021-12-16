const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const dataSchema = new mongoose.Schema({
    nome_usuario:String,
    email_usuario:String,
    senha_usuario:String,
    cpf_usuario:String,
    },{
timestamps:true
    });

    dataSchema.pre('save', function(next){
        this.senha_usuario = bcrypt.hashSync(this.senha_usuario, 10);
        next();
    });

    const usuarios = mongoose.model('Usuarios', dataSchema);
    module.exports = usuarios