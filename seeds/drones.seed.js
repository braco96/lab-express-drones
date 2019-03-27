// Iteration #1
const mongoose = require('mongoose');
const Drone = require('../models/Drone.model');

// Lista inicial de drones que se insertarán en la base de datos.
const drones = [
  { name: 'Creeper XL 500', propellers: 3, maxSpeed: 12 },
  { name: 'Racer 57', propellers: 4, maxSpeed: 20 },
  { name: 'Courier 3000i', propellers: 6, maxSpeed: 18 }
];

// Conectamos con la base de datos utilizando la misma URI que la aplicación principal.
mongoose
  .connect('mongodb://127.0.0.1:27017/lab-express-drones')
  .then(response => {
    console.log(`Conectados a Mongo! Base de datos: ${response.connections[0].name}`);

    // Creamos los drones en la colección correspondiente.
    return Drone.create(drones);
  })
  .then(createdDrones => {
    console.log(`Se han creado ${createdDrones.length} drones.`);
  })
  .catch(err => {
    console.error('Error al insertar drones en la base de datos', err);
  })
  .finally(() => {
    // Cerramos la conexión para no dejarla abierta una vez finalizada la tarea.
    mongoose.connection.close();
  });