const express = require('express');
const app = express();
const paciente = require('./data/pacientes.js');

app.use(express.json());

app.get('/', (req, res)=>{
    res.json( paciente() );
});

// app.listen(3000);