const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
const v1Routes = require('./v1/routes')

app.use('./api/v1', v1Routes)

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`))
