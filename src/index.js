const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('<h1>Hola mundo from node</h1>');
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
