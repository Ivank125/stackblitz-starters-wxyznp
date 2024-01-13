const express = require('express');
const cors = require('cors');

const { router } = require('./src/routers/router');
const { routes } = require('./src/routers/routes');

const app = express();

app.use(cors());

app.use('/bandinha', routes);
app.use('/music', router);

app.listen(3001, () => console.log('Servidor rodando na porta 3001'));