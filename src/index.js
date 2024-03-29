const express = require('express')

const app = express()
const PORT = process.env.PORT || 3001

const v1WorkoutRouter = require('./v1/routes/workoutRoutes')

app.use(express.json())
app.use('/api/v1/workouts', v1WorkoutRouter)

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`))
