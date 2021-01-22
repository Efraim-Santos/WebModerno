const express = require('express');
const app = express();
const rotas = require('./controllers/rotas')

app.use(express.json());

rotas(app);

app.listen(3000)

