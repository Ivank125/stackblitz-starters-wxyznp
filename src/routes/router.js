const express = require('express');
const fs = require('fs');
const { promisify } = require('util');
const fileInfo = promisify(fs.stat);


const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
    
        const filePath = `./src/arquivos/bandinhas/${id}`;

        const { size } = await fileInfo(filePath);
        const range = req.headers.range;
        if (range) {
            let [start, end] = range.replace(/bytes=/, '').split('-');
            start = parseInt(start, 10);
            end = end ? parseInt(end, 10) : size - 1;
            res.writeHead(206, {
                'Content-Range': `bytes ${start}-${end}/${size}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': (end - start) + 1,
                'Content-Type': 'audio/mp3'
            });
            fs.createReadStream(filePath, { start, end }).pipe(res);
        } else {
            res.writeHead(200, {
                'Content-Length': size,
                'Content-Type': 'audio/mp3'
            });
            fs.createReadStream(filePath).pipe(res);
        }
    }
    catch (error) {
        res.send({musica: 'Erro ao buscar a música'});
    }
});




module.exports = { router };