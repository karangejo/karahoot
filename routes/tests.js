const express = require('express')
const router = express.Router()
const Test = require('../models/test')


// Getting all
router.get('/', async (req, res) => {
  try {
    const testsBelongingToOwner = await Test.find({owner: req.body.owner})
    res.json(testsBelongingToOwner)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', getTest, (req, res, next) => {
  res.json(res.test)
})

// Creating one
router.post('/', async function(req, res){
  console.log(req);
  const testToSave = new Test({
    title: req.body.title,
    owner: req.body.owner,
    numberOfQuestions: req.body.numberOfQuestions,
    questions: req.body.questions
  })
  try {
    const newTest = await testToSave.save()
    res.status(201).json(newTest)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
//router.patch('/:id', getSubscriber, async (req, res) => {
  //if (req.body.name != null) {
    //res.subscriber.name = req.body.name
//  }
//  if (req.body.subscribedToChannel != null) {
  //  res.subscriber.subscribedToChannel = req.body.subscribedToChannel
//  }
  //try {
  //  const updatedSubscriber = await res.subscriber.save()
  //  res.json(updatedSubscriber)
//  } catch (err) {
  //  res.status(400).json({ message: err.message })
  //}
//})

// Deleting One
router.delete('/:id', getTest, async (req, res) => {
  try {
    await res.test.remove()
    res.json({ message: 'Deleted Test' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getTest(req, res, next) {
  let test
  try {
    test = await Test.findById(req.params.id)
    if (test == null) {
      return res.status(404).json({ message: 'Cannot find test' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.test = test
  next()
}

module.exports = router
