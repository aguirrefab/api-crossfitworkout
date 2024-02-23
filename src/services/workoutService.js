/* eslint-disable no-useless-catch */
const Workout = require('../database/Workout')

const { v4: uuid } = require('uuid')

const getAllWorkouts = () => {
  try {
    const allWorkouts = Workout.getAllWorkouts()
    return allWorkouts
  } catch (error) {
    throw error
  }
}

const getWorkout = (workoutId) => {
  try {
    const workout = Workout.getWorkout(workoutId)
    return workout
  } catch (error) {
    throw error
  }
}

const createNewWorkout = (newWorkout) => {
  const workoutToInsert = {
    ...newWorkout,
    id: uuid(),
    createdAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
    updatedAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' })
  }
  try {
    const createdWorkout = Workout.createNewWorkout(workoutToInsert)
    return createdWorkout
  } catch (error) {
    throw error
  }
}

const updateWorkout = ({ workoutId, body }) => {
  try {
    const updatedWorkout = Workout.updateWorkout(workoutId, body)
    return updatedWorkout
  } catch (error) {
    throw error
  }
}

const deleteWorkout = (workoutId) => {
  try {
    return Workout.deleteWorkout(workoutId)
  } catch (error) {
    throw error
  }
}

module.exports = {
  getAllWorkouts,
  getWorkout,
  createNewWorkout,
  updateWorkout,
  deleteWorkout
}
