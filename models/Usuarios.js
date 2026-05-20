const mongoose = require('../db/conn');
const { Schema } = mongoose;
// cadastros de usuarios para utilizar o sistema
const Usuarios = mongoose.model('Usuarios', new Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    funcao: { type: String },
    senha: { type: String, required: true }

}, { timestamps: true }))

module.exports = Usuarios

