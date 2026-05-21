// importando bibliotecas
const express = require('express');
const cors = require('cors');

// definições iniciais
const app = express();
const porta = 5000;

// middlewares
app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// rotas
app.use('/', require('./routes/usuariosRoutes'));
app.use('/linhas', require('./routes/linhasRoutes'));
// escuta de porta
app.listen(porta, () => {
    console.log(`O express está escutando a porta ${porta}`);
})

