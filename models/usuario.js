const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
  nombreUsuario: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  rol: { type: String, required: true }, // admin o user
});

// Middleware para encriptar la contraseña antes de guardarla
// (en Mongoose 9 los middleware async ya no reciben next: basta con retornar)
usuarioSchema.pre('save', async function () {
  // Si la contraseña no ha sido modificada se salta el proceso de encriptación
  if (!this.isModified('contraseña')) return;

  const salt = await bcrypt.genSalt(10);
  this.contraseña = await bcrypt.hash(this.contraseña, salt);
});

module.exports = mongoose.model('Usuario', usuarioSchema);
