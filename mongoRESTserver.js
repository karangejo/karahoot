require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
//mongoose.connect('mongodb://localhost/default');

//const db = mongoose.connection;

//db.on('error', console.error.bind(console, 'connection error:'));
//db.once('open', () => {
  //console.log('connected');
//});
console.log(process.env.DATABASE_URL)
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

const testsRouter = require('./routes/tests')
app.use('/tests', testsRouter)

app.listen(3001, () => console.log('Server Started listening on port 3001'))
