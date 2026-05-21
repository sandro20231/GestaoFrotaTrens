const express = require('express');
const router = express.Router();
const seriesControllers = require('../controllers/serieTrensControllers');
const autorizacao = require('../helpers/authorization');

// cadastrar series
router.post('/serieTrem', autorizacao, seriesControllers.cadastrarSeries);
// remover series
router.delete('/serieTrem/:idSerie', autorizacao, seriesControllers.removerSerie);
// alterar series 
router.patch('/serieTrem/:idSerie', autorizacao, seriesControllers.alterarSerie);
// ver series por usuario
router.get('/minhasSeries', autorizacao, seriesControllers.minhasSeries);
// ver todas series 
router.get('/serieTrem', autorizacao, seriesControllers.todasSeries);
// ver serie individula
router.get('/serieTrem/:idSerie', autorizacao, seriesControllers.serieIndividual);
// filtrar por fabricante
router.get('/fabricante', autorizacao, seriesControllers.filtrarPorFabricante);
// filtrar por ano de fabricacao
router.get('/ano', autorizacao, seriesControllers.filtrarPorAno);

module.exports = router;