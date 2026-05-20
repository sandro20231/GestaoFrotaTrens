const mongoose = require('../db/conn');
const { Schema } = mongoose;
// Modelo de linhas sem chaves extrangeiras e com timestamps
const Linhas = mongoose.model('Linhas', new Schema({
    numero: { type: String, required: true },
    nome: { type: String, required: true },
    cor: { type: String, required: true },
    habilitada: { type: Boolean, required: true },
    emObras: { type: Boolean, required: true },
    usuario: Object
}, { timestamps: true }));

module.exports = Linhas;