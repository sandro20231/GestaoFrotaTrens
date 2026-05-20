const mongoose = require('../db/conn');
const { Schema } = mongoose;

const SerieTrens = mongoose.model('SerieTrens', new Schema({
    serie: { type: String, required: true },
    fabricante: { type: String, required: true },
    anoFabricacao: { type: String, required: true },
    usuario: Object,
    linhaOperacao: Object
}, { timestamps: true }));

module.exports = SerieTrens;