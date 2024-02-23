const Workout = require('../database/Workout')

const { v4: uuid } = require('uuid')

const getAllWorkouts = () => {
  const allWorkouts = Workout.getAllWorkouts()
  return allWorkouts
}

const getWorkout = (workoutId) => {
  const workout = Workout.getWorkout(workoutId)
  return workout
}

const createNewWorkout = (newWorkout) => {
  const workoutToInsert = {
    ...newWorkout,
    id: uuid(),
    createdAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
    updatedAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' })
  }
  const createdWorkout = Workout.createNewWorkout(workoutToInsert)
  return createdWorkout
}

const updateWorkout = ({ workoutId, body }) => {
  const updatedWorkout = Workout.updateWorkout(workoutId, body)
  return updatedWorkout
}

const deleteOneWorkout = () => {
  return
}

module.exports = {
  getAllWorkouts,
  getWorkout,
  createNewWorkout,
  updateWorkout,
  deleteOneWorkout
}
