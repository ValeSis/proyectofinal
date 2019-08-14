const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//usuarios
const LaboratorioSchema = new Schema({
  nombre: {
    type: String,
    unique : true,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  }
});

module.exports = Item = mongoose.model('laboratorio', LaboratorioSchema);
