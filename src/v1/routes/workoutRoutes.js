const express = require('express')

const workoutController = require('../../controllers/workoutController')
const router = express.Router()

/// define endpoints to workout resource

router
  .get('/', workoutController.getAllWorkouts)

  .get('/:workoutId', workoutController.getWorkout)

  .post('/', workoutController.createNewWorkout)

  .patch('/:workoutId', workoutController.updateWorkout)

  .delete('/:workoutId', workoutController.deleteOneWorkout)

module.exports = router
