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

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

const testsRouter = require('./routes/tests')
app.use('/tests', testsRouter)

app.listen(3000, () => console.log('Server Started'))
