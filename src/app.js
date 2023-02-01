const express = require('express');

const app = express();

app.get('/', (req, res) => res.status(200).json({ message: 'Welcome!'}));

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server up and running. Listening on port ${PORT}.`);
});