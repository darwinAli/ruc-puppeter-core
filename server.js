const express = require('express');
const fs = require('fs');
const { openWebPage } = require('./funcion');

const app = express();

// Servir archivo HTML
app.get('/', (req, res) => {
    try {
        const htmlContent = fs.readFileSync('./interfaz.html', 'utf8');
        res.send(htmlContent);
    } catch (error) {
        console.error("Error al leer el archivo HTML:", error);
        res.status(500).send('Ocurrió un error al servir el archivo HTML.');
    }
});

// Endpoint para obtener los datos del RUC
app.get('/scrape', async (req, res) => {
    const numRuc = req.query.numRuc;
    if (!numRuc || !/^\d{11}$/.test(numRuc)) {
        return res.status(400).send('Por favor, proporcione un RUC válido de 11 dígitos.');
    }

    try {
        const result = await openWebPage(numRuc);
        res.send(result);
    } catch (error) {
        console.error("Error al consultar RUC:", error);
        res.status(500).send('Ocurrió un error al consultar el RUC.');
    }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Servidor listo, escuchando en el puerto ${PORT}`);
});
