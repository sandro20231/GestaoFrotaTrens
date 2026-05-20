const express = require('express');
const router = express.Router();
const authorization = require('../helpers/authorization');
const manager = require('../helpers/manager');
const usuariosControllers = require('../controllers/usuariosControllers');

// cadastrar usuario 
router.post('/usuarios', usuariosControllers.criar);
// login
router.post('/login', usuariosControllers.login);
// ver todos usuarios - gerente
router.get('/todosUsuarios', authorization, manager, usuariosControllers.todosUsuarios);
// ver usuario
router.get('/usuarios/:id', authorization, usuariosControllers.verUsuario);
// remover usuario - gerente
router.delete('/usuarios/:id', authorization, manager, usuariosControllers.remover);
// alterar  - gerente
router.patch('/usuarios/:id', authorization, manager, usuariosControllers.alterar);

module.exports = router;