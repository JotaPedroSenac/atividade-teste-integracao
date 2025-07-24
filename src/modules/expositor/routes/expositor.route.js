const express = require('express');
const expositorController = require('../controllers/expositor.controller');
const router = express.Router();

// cadastrar expositor
router.post('/', expositorController.Cadastrar);

module.exports = router;
