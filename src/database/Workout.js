/* eslint-disable no-throw-literal */
const DB = require('./db.json')
const { saveToDatabase } = require('./utils')

const getAllWorkouts = () => {
  try {
    return DB.workouts
  } catch (error) {
    throw { status: 500, message: error?.message || error }
  }
}

const getWorkout = (workoutId) => {
  try {
    const workout = DB.workouts.find(({ id }) => {
      return id === workoutId
    })

    return workout
  } catch (error) {
    throw { status: 500, message: error?.message || error }
  }
}

const createNewWorkout = (newWorkout) => {
  const isAlreadyAdded =
    DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1
  if (isAlreadyAdded) {
    return
  }
  try {
    DB.workouts.push(newWorkout)
    saveToDatabase(DB)
    return newWorkout
  } catch (error) {
    throw { status: 500, message: error?.message || error }
  }
}

const updateWorkout = (workoutId, bodyWorkout) => {
  try {
    const workout = getWorkout(workoutId)
    if (workout) {
      throw {
        status: 400,
        message: `Workout with the name '${bodyWorkout.name}' already exists`
      }
    }
    const indexForUpdate = DB.workouts.findIndex(
      (item) => item.id === workoutId
    )

    if (indexForUpdate < 0) {
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`
      }
    }
    const updatedWorkout = {
      ...DB.workouts[indexForUpdate],
      ...bodyWorkout,
      updatedAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' })
    }
    DB.workouts[indexForUpdate] = updatedWorkout
    saveToDatabase(DB)
    return updatedWorkout
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
}

const deleteWorkout = (workoutId) => {
  try {
    const indexForDeletion = DB.workouts.findIndex(
      (workout) => workout.id === workoutId
    )
    if (indexForDeletion < 0) {
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`
      }
    }
    DB.workouts.splice(indexForDeletion, 1)
    saveToDatabase(DB)
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
}

module.exports = {
  getAllWorkouts,
  getWorkout,
  updateWorkout,
  createNewWorkout,
  deleteWorkout
}
