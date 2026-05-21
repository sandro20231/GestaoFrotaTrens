const express = require('express');
const router = express.Router();
const autorizacao = require('../helpers/authorization');
const composicoesController = require('../controllers/composicoesControllers');

// cadastrar composicoes
router.post('/composicao', autorizacao, composicoesController.cadastrarComposicao);
// remover composicoes
router.delete('/composicao/:idComposicao', autorizacao, composicoesController.removerComposicao);
// alterar composicoes
router.patch('/composicao/:idComposicao', autorizacao, composicoesController.alterarComposicao);
// ver composicoes por usuario
router.get('/composicaoPorUsuario', autorizacao, composicoesController.composicoesPorUsuario);
// ver todas composicoes 
router.get('/todasComposicoes', autorizacao, composicoesController.todasComposicoes);
// ver composicao individual
router.get('/composicao/:idComposicao', autorizacao, composicoesController.composicaoIndividual);
// filtrar por status de manutencao
router.get('/statusManutencao', autorizacao, composicoesController.statusManutencao);
// filtrar por status de operacao
router.get('/statusOperacao', autorizacao, composicoesController.statusOperacao);
// mandar composicao para manutencao
router.patch('/iniciarManuntencao/:idComposicao', autorizacao, composicoesController.iniciarManuntencao);
// retirar composicao da manutencao
router.patch('/finalizarManuntencao/:idComposicao', autorizacao, composicoesController.finalizarManuntencao);




module.exports = router;