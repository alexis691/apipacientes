const mongoose = require('mongoose');

const pacienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  // Semana 12: los mismos atributos extra que ya tenía la pantalla de
  // pacientes (tarea de la semana 8). Son opcionales.
  edad: { type: Number, default: null },
  responsable: { type: String, default: '' },
});

module.exports = mongoose.model('Paciente', pacienteSchema);
