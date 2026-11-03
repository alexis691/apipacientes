const express = require('express');
const {
  getPacientes,
  addPaciente,
  updatePaciente,
  deletePaciente,
} = require('../controllers/pacienteController');

const router = express.Router();

// Rutas para pacientes
router.get('/', getPacientes);
router.post('/', addPaciente);
router.put('/:id', updatePaciente);
router.delete('/:id', deletePaciente);

module.exports = router;
