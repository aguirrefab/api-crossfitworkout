const DB = require('./db.json')
const { saveToDatabase, updateWorkoutResource } = require('./utils')

const getAllWorkouts = () => {
  return DB.workouts
}

const getWorkout = (workoutId) => {
  const workout = DB.workouts.find(({ id }) => {
    return id === workoutId
  })
  if (workout) {
    return workout
  } else {
    return new Error('no existe workout ')
  }
}

const createNewWorkout = (newWorkout) => {
  const isAlreadyAdded =
    DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1
  if (isAlreadyAdded) {
    return
  }
  DB.workouts.push(newWorkout)
  saveToDatabase(DB)
  return newWorkout
}

const updateWorkout = (workoutId, body) => {
  const workout = getWorkout(workoutId)

  let workout2 = []

  if (!workout) {
    return new Error('no existe workout ')
  } else {
    // updateWorkoutResource(workout, body)
    workout2 = {
      ...workout,
      ...body,
      updatedAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' })
    }
  }

  console.log({ workout2 })

  saveToDatabase(DB)
  return workout2
}

module.exports = { getAllWorkouts, getWorkout, updateWorkout, createNewWorkout }
