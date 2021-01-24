// const { json } = require('body-parser');
const express = require('express');
const app = express();
const pacientes = require('./data/pacientes.js');
// const dados = require('./arquivoPacientes.json');

// let dadosJson = JSON.stringify(pacientes())
app.use(express.json());

app.get('/', (req, res)=>{
    // console.log("aqui" + JSON.stringify(pacientes()));
    // console.log("type" + typeof(JSON.stringify(pacientes())));
    // console.log(dadosJson);
    // res.json(pacientes());

    res.send(pacientes());
});

// app.listen(3000);

// module.exports = (req, res) => {
//     res.json(pacientes)
//   }  