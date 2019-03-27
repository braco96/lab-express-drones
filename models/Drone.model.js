// Iteration #1
const { Schema, model } = require('mongoose');

// Definimos el esquema del dron con las propiedades solicitadas.
const droneSchema = new Schema(
  {
    name: String, // Guardamos el nombre del modelo.
    propellers: Number, // Indicamos cuántas hélices tiene el dron.
    maxSpeed: Number // Velocidad máxima en metros por segundo.
  },
  {
    timestamps: true // Añadimos marcas de tiempo para posibles usos futuros.
  }
);

// Exportamos el modelo para poder interactuar con la colección desde otras partes de la app.
module.exports = model('Drone', droneSchema);