require('dotenv').config();
const express = require('express');
const passport = require('passport');
require('./src/configs/passportConfig')(passport);

const { testDbConnection, User } = require('./src/configs/dbConfig');
const { authRoute, userRoute, predictionRoute } = require('./src/routes');
const { errorHandler, undefinedEndpointHandler } = require('./src/middlewares');

const port = process.env.PORT || 3000;
const app = express();
const prefix = '/api/v1';

testDbConnection();
app.use(express.json());
app.use(passport.initialize());

app.get('/', async (req, res) => {
  try {
    res.send('<h1>Main API is running</h1>');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching users');
  }
});

app.use(`${prefix}/auth`, authRoute);
app.use(`${prefix}/profile`, userRoute);
app.use(`${prefix}/predict`, predictionRoute);

app.use(errorHandler);
app.use(undefinedEndpointHandler);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
