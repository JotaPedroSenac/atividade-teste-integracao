const expositorModel = require('../models/expositor.model');

class expositorController {
    static async Cadastrar(req, res){
        try {
            const { nome, email, instituicao } = req.body;
            if (!nome || !email || !instituicao) {
                return res.status(400).json({ msg: 'Todos os campos são obrigatórios' });
            }

            //verifica se o email é duplicado
            const existe = await expositorModel.findOne({ where: { email } });
            if (existe) {
                return res.status(400).json({ msg: 'Email já cadastrado' });
            }
            const expositor = await expositorModel.create({ nome, email, instituicao });
            res.status(201).json({msg: 'Expositor cadastrado com sucesso', data: expositor});
        } catch (error) {
            console.error('Erro ao cadastrar expositor:', error);
            return res.status(500).json({ msg: 'Erro interno no servidor' });
        }
    }

    static async Listar(req, res) {
        try {
            const expositores = await expositorModel.findAll();
            res.status(200).json(expositores);
        } catch (error) {
            console.error('Erro ao listar expositores:', error);
            return res.status(500).json({ msg: 'Erro interno no servidor' });
        }
    }

    static async ListarPorId(req, res){
        try {
            const {id} = req.params;
            const expositor = await expositorModel.findByPk(id);
            if(!expositor){
                return res.status(404).json({msg: 'Expositor não encontrado'})
            }
            res.status(200).json(expositor);
        } catch (error) {
            console.error('Erro ao buscar expositor:', error)
            res.status(500).json({msg: 'Erro interno do servidor'})
        }
    }

    static async deletar(req, res){
        try {
            const {id} = req.params;
            const expositor = await expositorModel.findByPk(id);
            if(!expositor){
                return res.status(404).json({msg: 'Expositor não encontrado'})
            }
            await expositor.destroy();
            res.status(200).json({msg: 'Expositor removido com sucesso'})
        } catch (error) {
            console.error('Erro ao deletar expositor:', error);
            res.status(500).json({msg: 'Erro interno do servidor'})
        }
    }
}

module.exports = expositorController;