const express = require('express');
const router = express.Router();
const autorizacao = require('../helpers/authorization')
const operacaoController = require('../controllers/opercaoesControllers');
const Operacoes2 = require('../models/Operacoes');

// cadastrar operacoes
router.post('/operacao', autorizacao, operacaoController.cadastrarOperacao);
// remover operacoes
router.delete('/operacao/:idOperacao', autorizacao, operacaoController.removerOperacao);
// ver operacoes por usuario
router.get('/operacaoPorUsuario', autorizacao, operacaoController.porUsuario);
// ver todas operacoes 
router.get('/operacao', autorizacao, operacaoController.todasOperacoes);
// ver operacao individual
router.get('/operacao/:idOperacao', autorizacao, operacaoController.operacaoIndividual);

module.exports = router;


