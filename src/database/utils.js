const fs = require('fs')

const saveToDatabase = (DB) => {
  fs.writeFileSync('./src/database/db.json', JSON.stringify(DB, null, 2), {
    encoding: 'utf-8'
  })
}

const updateWorkoutResource = ({ workout, workoutBody }) => {
  if (workout.name !== workoutBody.name) {
    workout.name = workoutBody.name
  } else if (workout.exercises !== workoutBody.exercises) {
    workout.exercises = workoutBody.exercises
  } else if (workout.mode !== workoutBody.mode) {
    workout.mode = workoutBody.mode
  } else if (workout.equipment !== workoutBody.equipment) {
    workout.equipment = workoutBody.equipment
  } else if (workout.trainerTips !== workoutBody.trainerTips) {
    workout.trainerTips = workoutBody.trainerTips
  }

  const updateWorkout = {
    ...workout,
    updatedAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' })
  }

  return updateWorkout
}

module.exports = { saveToDatabase, updateWorkoutResource }
