const expositorModel = require('../src/modules/expositor/models/expositor.model');
const { sequelize } = require('../src/config/configDB');
const app = require('../index');
const req = require('supertest')

beforeAll(async () => {
    await sequelize.sync({ force: true });
})

afterAll(async () => {
    await sequelize.close();
})

afterEach(async () => {
    // Truncate the table (a cada teste ele exclui os dados)
    await expositorModel.truncate();
})

describe('Testes do Expostor Controller', () => {
    test('Deve cadastrar um expositor corretamente no banco de dados', async () => {
        const res = await req(app).post('/expositores').send({ nome: 'teste', email: 'teste@teste.com', instituicao: 'teste instituicao' });
        expect(res.status).toBe(201);
        expect(res.body.msg).toBe('Expositor cadastrado com sucesso');
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('id');
    });

    test('Erro ao cadastrar expositor com email duplicado', async () => {
        await expositorModel.create({ nome: 'Zezin', email: 'zezin@email.com', instituicao: 'Zezin Instituicao' });
        const res = await req(app).post('/expositores').send({ nome: 'Zezin', email: 'zezin@email.com', instituicao: 'Instituicao do ze' });
        expect(res.status).toBe(400);
        expect(res.body.msg).toBe('Email já cadastrado');
    });

    test('Erro ao cadastrar expositor com campos obrigatórios faltando', async () => {
        const res = await req(app).post('/expositores').send({ nome: 'Zezin' });
        expect(res.status).toBe(400);
        expect(res.body.msg).toBe('Todos os campos são obrigatórios');
    });

    test('listar expositores', async () => {
        await req(app).post('/expositores').send({ nome: 'Zezin', email: 'zezinho@email.com', instituicao: 'Zezinho Instituicao' });
        const res = await req(app).get('/expositores');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    test('Buscar expositor por ID existente', async () => {
       const expositor =  await req(app).post('/expositores').send({ nome: 'Ana', email: 'ana@email.com', instituicao: 'IF' });
       const id = expositor.body.data.id;
        const res = await req(app).get(`/expositores/${id}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('nome', 'Ana');
    });
    
    test('Buscar expositor por ID inexistente', async () => {
        const res = await req(app).get('/expositores/9999');
        expect(res.status).toBe(404);
        expect(res.body.msg).toBe('Expositor não encontrado');
    });

    test('Deletar expositor existente', async () => {
        const expositor = await req(app).post('/expositores').send({ nome: 'Carlos', email: 'carlos@email.com', instituicao: 'UF' });
        const id = expositor.body.data.id;
        const res = await req(app).delete(`/expositores/${id}`);
        expect(res.status).toBe(200);
        expect(res.body.msg).toBe('Expositor removido com sucesso');
    });
    
})

