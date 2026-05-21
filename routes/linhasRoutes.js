const express = require('express');
const router = express.Router();
const autorizacao = require('../helpers/authorization');
const linhaController = require('../controllers/linhasControllers');

// ver linhas por usuario
router.get('/linhasUsuario', autorizacao, linhaController.linhaPorUsuario);
// cadastrar linha
router.post('/linha', autorizacao, linhaController.criarLinha);
// remover linha
router.delete('/linha/:idLinha', autorizacao, linhaController.removerLinha);
// alterar linha
router.patch('/linha/:idLinha', autorizacao, linhaController.atualizar);
// ver todas linhas 
router.get('/linha', autorizacao, linhaController.todasLinhas);
// ver linha individual
router.get('/linha/:idLinha', autorizacao, linhaController.linhaIndividual);
// filtrar por status de habilitada
router.get('/filtrarHabilitada', autorizacao, linhaController.filtrarPorHabilitada);
// filtrar por status de obras
router.get('/filtrarStatus', autorizacao, linhaController.filtrarStatus);
// habilitar linha
router.patch('/habilitarLinha/:idLinha', autorizacao, linhaController.habilitarLinha);
// desabilitar linha
router.patch('/desabilitarLinha/:idLinha', autorizacao, linhaController.desabilitarLinha);
// colocar linha em obras
router.patch('/reformarLinha/:idLinha', autorizacao, linhaController.reformarLinha);
// retirar linha de obras
router.patch('/finalizarReforma/:idLinha', autorizacao, linhaController.finalizarReformaLinha);

module.exports = router;