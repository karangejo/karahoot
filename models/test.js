const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  index: {
    type: String,
    required: true
  },
  prompt: {
    type: String,
    required: true
  },
  Q1: {
    type: String,
    required: true
  },
  Q2: {
    type: String,
    required: true
  },
  Q3: {
    type: String,
    required: true
  },
  Q4: {
    type: String,
    required: true
  },
  answer: {
    type: Number,
    required: true
  }
})

const testSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  numberOfQuestions: {
    type: String,
    required: true
  },
  questions: {
    type: [questionSchema],
    required: true
  }
})

//const myDB = mongoose.connection.useDb('myDB');

//const testInfo = myDB.model('test', testSchema);

//export default testInfo;


module.exports = mongoose.model('test', testSchema)
