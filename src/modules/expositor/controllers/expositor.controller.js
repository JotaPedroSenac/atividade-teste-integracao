const expositorModel = require('../models/expositor.model');

class expositorController {
    static async Cadastrar(req, res){
        try {
            const { nome, email, instituicao } = req.body;
            const expositor = await expositorModel.create({ nome, email, instituicao });
            res.status(201).json({msg: 'deu bom'})
        } catch (error) {
            
        }
    }
}

module.exports = expositorController;