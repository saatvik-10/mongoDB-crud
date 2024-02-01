require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOption = require('./config/corsOption');
const { logger, logEvents } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbCon');
const PORT = process.env.port || 3500;

// Connect to MongoDB
connectDB();

// custom middleware logger
//app.use(logger);

/* Handle options credentials check-before CORS
and fetch cookies credentials requirement*/
app.use(credentials);

// CORS- Cross Origin Resource Sharing
app.use(cors(corsOption));

/*built-in miiddleware to handle urlencoded data
in other words, form data:
'content-type: application/x-www-form-urlencoded'*/
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// serve static files (FOR CSS AND SHIT)
app.use('/', express.static(path.join(__dirname, '/Public')));
app.use('/subdir', express.static(path.join(__dirname, '/Public')));

// routes
app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));

//Route Handlers
app.get(
  '/hello(.html)?',
  (req, res, next) => {
    console.log('Attempted to load html');
    next();
  },
  (req, res) => {
    res.send('Hello World');
  }
);

//Chaining Route Handlers
const one = (req, res, next) => {
  console.log('one');
  next();
};

const two = (req, res, next) => {
  console.log('two');
  next();
};

const three = (req, res) => {
  console.log('three');
  res.send('Finished');
};

app.get('/chain(.html)?', [one, two, three]);

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: '404 Not Found' });
  } else {
    res.type('text').send('404 Not Found');
  }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server Running on PORT ${PORT}`));
});
