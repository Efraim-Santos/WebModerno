const express = require('express');
const app = express();
const pacientes = require('./data/pacientes.js')


app.use(express.json());

app.get('/', (req, res)=>{
    res.json(pacientes())
});

// app.listen(3000);

// module.exports = (req, res) => {
//     res.json(pacientes)
//   }