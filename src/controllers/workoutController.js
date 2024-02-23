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
  try {
    res.status(200).send({ status: 'OK', data: allWorkouts })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const getWorkout = (req, res) => {
  const {
    params: { workoutId }
  } = req

  if (!workoutId) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: "Parameter ':workoutId' can not be empty" }
    })
  }

  try {
    const workout = workoutService.getWorkout(workoutId)
    res.status(200).send({ status: 'OK', data: workout })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
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
  try {
    const createdWorkout = workoutService.createNewWorkout(newWorkout)
    res.status(201).send({ status: 'OK', data: createdWorkout })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const updateWorkout = (req, res) => {
  const { bodyWorkout } = req
  const {
    params: { workoutId }
  } = req

  if (!workoutId) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: "Parameter ':workoutId' can not be empty" }
    })
    return
  }

  try {
    const updatedWorkout = workoutService.updateWorkout({
      workoutId,
      bodyWorkout
    })
    res.status(200).send({ status: 'OK', data: updatedWorkout })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const deleteWorkout = (req, res) => {
  const {
    params: { workoutId }
  } = req

  if (!workoutId) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: "Parameter ':workoutId' can not be empty" }
    })
    return
  }

  try {
    workoutService.deleteWorkout(workoutId)
    res.status(200).send({ status: 'OK' })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

module.exports = {
  getAllWorkouts,
  getWorkout,
  createNewWorkout,
  updateWorkout,
  deleteWorkout
}
