const workoutService = require('../services/workoutService')

const getAllWorkouts = (req, res) => {
  const allWorkouts = workoutService.getAllWorkouts()
  if (!allWorkouts) {
    res.status(404).send({
      status: 'FAILED',
      data: {
        error: 'Cannot get all workouts'
      }
    })
  }
  res.status(200).send({ status: 'OK', data: allWorkouts })
}

const getWorkout = (req, res) => {
  const {
    params: { workoutId }
  } = req
  if (!workoutId) {
    res.status(400).send({
      status: 'FAILED',
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'id'"
      }
    })
    return
  }
  const workout = workoutService.getWorkout(workoutId)
  res.status(200).send({ status: 'OK', data: workout })
}

const createNewWorkout = (req, res) => {
  const { body } = req
  if (
    !body.name ||
    !body.exercises ||
    !body.equipment ||
    !body.trainerTips ||
    !body.mode
  ) {
    res.status(400).send({
      status: 'FAILED',
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'trainerTips'"
      }
    })
    return
  }

  const newWorkout = {
    name: body.name,
    mode: body.mode,
    equipment: body.equipment,
    exercises: body.exercises,
    trainerTips: body.trainerTips
  }

  const createdWorkout = workoutService.createNewWorkout(newWorkout)
  res.status(201).send({ status: 'OK', data: createdWorkout })
}

const updateWorkout = (req, res) => {
  const { body } = req
  const {
    params: { workoutId }
  } = req

  const updatedWorkout = workoutService.updateWorkout({ workoutId, body })
  res.status(200).send({ status: 'OK', data: updatedWorkout })
}

const deleteOneWorkout = (req, res) => {
  workoutService.deleteOneWorkout()
  res.send('Delete an existing workout')
}

module.exports = {
  getAllWorkouts,
  getWorkout,
  createNewWorkout,
  updateWorkout,
  deleteOneWorkout
}
