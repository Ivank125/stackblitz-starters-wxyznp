
const express = require('express');

const fs = require('fs');

const routes = express.Router();

routes.get('/', async (req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Content-Type', 'application/json')
        const folderPath = './src/arquivos/bandinhas';
        const fr = {musica: fs.readdirSync(folderPath)};
        res.send(fr);
    } catch (error) {
        res.send({musica: 'Erro ao buscar as músicas'});
    }
});

module.exports = { routes }
;