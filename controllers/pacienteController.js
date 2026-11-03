// Importando el modelo de paciente
const Paciente = require('../models/paciente');

// Función para traer todos los pacientes
exports.getPacientes = async (req, res) => {
  try {
    const pacientes = await Paciente.find();
    res.json(pacientes);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

// Función para crear un nuevo paciente
exports.addPaciente = async (req, res) => {
  const { nombre, edad, responsable } = req.body;
  const paciente = new Paciente({ nombre, edad, responsable });

  try {
    await paciente.save();
    res.status(201).json(paciente);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

// Función para actualizar un paciente
exports.updatePaciente = async (req, res) => {
  const { id } = req.params;
  const { nombre, edad, responsable } = req.body;

  try {
    // returnDocument: 'after' retorna el paciente ya actualizado
    // (equivale al { new: true } del video, que en Mongoose 9 está obsoleto)
    const paciente = await Paciente.findByIdAndUpdate(
      id,
      { nombre, edad, responsable },
      { returnDocument: 'after' }
    );

    if (!paciente) {
      return res.status(404).json({ mensaje: 'Paciente no encontrado' });
    } else {
      res.status(200).json(paciente);
    }
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

// Función para eliminar un paciente
exports.deletePaciente = async (req, res) => {
  const { id } = req.params;

  try {
    await Paciente.findByIdAndDelete(id);
    res.status(200).json({ mensaje: 'Paciente eliminado' });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};
