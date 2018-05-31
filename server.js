const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 80;

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('*', express.static("."));

let server = app.listen(port, () => console.log('Node server listening on port ' + server.address().port));