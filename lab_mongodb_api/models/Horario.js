const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//horario
const HorarioSchema = new Schema({
  laboratorioid: {
    type: String,
    required: true
  },
  docente: {
    type: String,
    required: true
  },
  materia: {
    type: String,
    required: true
  },
  
  horainicio: {
    type: String,
    required: true
  },
  horafin: {
    type: String,
    required: true
  }
});

module.exports = Item = mongoose.model('horario', HorarioSchema);
