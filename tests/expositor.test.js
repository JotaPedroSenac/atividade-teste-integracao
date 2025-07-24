const expositorModel = require('../src/modules/expositor/models/expositor.model');
const expositorController = require('../src/modules/expositor/controllers/expositor.controller');
const { sequelize } = require('../src/config/configDB');
const app = require('../index');
const req = require('supertest')

beforeAll(async () => {
    await sequelize.sync({ force: true })
})
afterAll(async () => {
    await sequelize.close();
})

afterEach(async ()=>{
   // Truncate the table (a cada teste ele exclui os dados)
    await expositorModel.truncate();
})

describe('Testes do Expostor Controller', () => {
    test('Deve cadastrar um expositor corretamente no banco de dados', async () =>{
        const res = await req(app).post('/expositores').send({nome: 'teste', email: 'teste@teste.com', instituicao: 'teste instituicao'});
        expect(res.status).toBe(201);
    })
})
