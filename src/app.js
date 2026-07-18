const express = require('express');
const cors = require('cors');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const playerRoutes = require('./routes/player.routes');
const tournamentRoutes = require('./routes/tournament.routes');
const registrationRoutes = require('./routes/registration.routes');
const scoreRoutes = require('./routes/score.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Tournament API is running' });
});

app.use('/players', playerRoutes);
app.use('/tournaments', tournamentRoutes);
app.use('/tournaments', registrationRoutes);
app.use('/tournaments', scoreRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;