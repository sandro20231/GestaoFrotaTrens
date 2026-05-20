// conexão com mongodb
const mongoose = require('mongoose');

async function main() {
    const conn = mongoose.connect('mongodb://localhost:27017/gestaoFrotaTrens');
    console.log("Banco de dados conectado com sucesso!");
}

main().catch((err) => {
    console.log(err);
    return;
})

module.exports = mongoose;
