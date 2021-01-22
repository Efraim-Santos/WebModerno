const express = require('express');
const app = express();

app.use(express.json());

const pacientes = require('./data/pacientes')

app.get('/', (req, res)=>{
    res.json(pacientes)
});

// module.exports = (req, res) => {
//     res.json(pacientes)
//   }