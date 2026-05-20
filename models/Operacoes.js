const mongoose = require('../db/conn');
const { Schema } = mongoose;

const Operacoes = mongoose.model('Operacoes', new Schema({
    linha: Object,
    composicao: Object
}, { timestamps: true }))

module.exports = Operacoes;