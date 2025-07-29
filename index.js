const express = require('express');
const { sequelize } = require('./src/config/configDB');
require('dotenv').config();
const expositorRoute = require('./src/modules/expositor/routes/expositor.route');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use('/expositores', expositorRoute);

async function main() {
    try {
      //await sequelize.sync({ force: true });
      app.listen(PORT, () => {
        console.log(`Aplicação rodando em http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error('Erro ao iniciar o servidor:', error);
    }
  }
  
  main();
  
  module.exports = app;