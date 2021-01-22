const pacientes = require('./data/pacientes')
module.exports = (req, res) => {
    res.json(pacientes)
  }