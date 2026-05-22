const mongoose = require('../db/conn');
const { Schema } = mongoose;

const Operacoes2 = mongoose.model(
    'Operacoes',
    new Schema({
        linha: Object,
        composicao: Object,
        usuario: Object
    }, { timestamps: true })
);



module.exports = Operacoes2;