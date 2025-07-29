const express = require('express');
const expositorController = require('../controllers/expositor.controller');
const router = express.Router();

// cadastrar expositor
router.post('/', expositorController.Cadastrar);
// listar expositores
router.get('/', expositorController.Listar);
// listar por expositor
router.get('/:id', expositorController.ListarPorId)
// deletar expositor
router.delete('/:id', expositorController.deletar)

module.exports = router;
