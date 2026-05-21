const mongoose = require('../db/conn');
const { Schema } = mongoose;

const Composicoes = mongoose.model('Composicoes', new Schema({
    prefixo: { type: String, required: true },
    manutencao: { type: Boolean, required: true },
    operacao: { type: Boolean, required: true },
    usuario: Object,
    serieTrens: Object
}, { timestamps:true }));

module.exports = Composicoes;