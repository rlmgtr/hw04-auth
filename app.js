const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const uriDb = process.env.DB_URI;

app.use(express.json());
app.use(cors());
app.use(passport.initialize());

const contactsRouter = require('./routes/api/contacts.routes');
const usersRouter = require('./routes/api/users.current.routes');
const registerRouter = require('./routes/api/register.routes');
const loginRouter = require('./routes/api/login.routes');
const logoutRouter = require('./routes/api/logout.routes');

app.use('/api/contacts', contactsRouter);
app.use('/users', usersRouter);
app.use('/users', registerRouter);
app.use('/users', loginRouter);
app.use('/users', logoutRouter);


app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Not found',
    data: 'Not found',
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(400).json({
    status: 'fail',
    code: 400,
    message: err.message,
    data: 'Bad request',
  });
});

mongoose
  .connect(uriDb)
  .then(() => {
    console.log('Database connection successful');
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch(err => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
  

module.exports = app;
