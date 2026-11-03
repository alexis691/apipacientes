const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Variables de entorno (backend/.env): ahí va la cadena de conexión de
// MongoDB Atlas, para no dejar el usuario y la contraseña dentro del código
try {
  process.loadEnvFile();
} catch {
  // si no existe el .env se usa la base de datos local
}

// Crear servidor HTTP
const app = express();

// Configuraciones al servidor HTTP
app.use(bodyParser.json()); // recibir información en formato JSON
app.use(cors()); // conectar el backend con el frontend

// Conexión a la base de datos: MongoDB Atlas (en la nube) si está definida,
// si no, la base de datos local
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sistema-clinica';

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('Conexión a MongoDB exitosa'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

// Rutas de la API
const authRoutes = require('./routes/auth'); // rutas para autenticación
const pacienteRoutes = require('./routes/pacientes'); // rutas para pacientes

app.use('/api/auth', authRoutes);
app.use('/api/pacientes', pacienteRoutes);

// Configurar puerto para el backend
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
