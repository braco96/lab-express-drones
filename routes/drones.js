const express = require('express');
const router = express.Router();

// require the Drone model here
// Importamos el modelo de Drone para interactuar con la base de datos.
const Drone = require('../models/Drone.model');

// Ruta que muestra el listado completo de drones.
router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  // ... your code here
  Drone.find() // Buscamos todos los drones disponibles.
    .then(allDrones => res.render('drones/list', { drones: allDrones })) // Enviamos los drones a la vista.
    .catch(err => next(err)); // Si algo falla, delegamos el error al middleware.
});

// Ruta que muestra el formulario de creación de un nuevo dron.
router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  res.render('drones/create-form'); // Renderizamos la vista con el formulario vacío.
});

// Ruta que gestiona la creación de un nuevo dron en la base de datos.
router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  Drone.create(req.body) // Creamos el dron con los datos recibidos del formulario.
    .then(() => res.redirect('/drones')) // Tras crear, redirigimos al listado.
    .catch(err => res.render('drones/create-form')); // En caso de error, mostramos de nuevo el formulario.
});

// Ruta que muestra el formulario de edición para un dron específico.
router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  const { id } = req.params; // Obtenemos el identificador del dron desde la URL.
  Drone.findById(id)
    .then(droneToEdit => res.render('drones/update-form', { drone: droneToEdit })) // Pasamos el dron a la vista para prellenar el formulario.
    .catch(err => next(err));
});

// Ruta que guarda los cambios de un dron editado.
router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  const { id } = req.params; // Obtenemos el id del dron que se va a actualizar.
  Drone.findByIdAndUpdate(id, req.body, { new: true }) // Actualizamos con los nuevos datos.
    .then(() => res.redirect('/drones')) // Tras actualizar, volvemos al listado.
    .catch(err => res.render('drones/update-form')); // Si falla, renderizamos de nuevo el formulario.
});

// Ruta que elimina un dron de la base de datos.
router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
  const { id } = req.params; // Obtenemos el id del dron a eliminar.
  Drone.findByIdAndDelete(id)
    .then(() => res.redirect('/drones')) // Redirigimos al listado tras eliminar.
    .catch(err => next(err));
});

module.exports = router;