const express = require('express')
const router = express.Router()
const User = require('../models/user')

// example request http://localhost:3000/users/?email=myEmail
router.get('/', async (req, res) => {
  try{
    const user = await User.find({email: req.query.email})
    res.status(200).json(user)
  }catch(err){
    res.status(500).json({ message: err.message })
  }
})

router.get('/id/', async (req, res) => {
  try{
    const user = await User.find({_id: req.query.id})
    res.status(200).json(user)
  }catch(err){
    res.status(500).json({ message: err.message })
  }
})

// Creating one
router.post('/', async (req, res) => {
  console.log(req)
  const user = new User({
    name: req.query.name,
    email: req.query.email
  })
  try {
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})
/*
// Updating One
router.patch('/:id', getSubscriber, async (req, res) => {
  if (req.body.name != null) {
    res.subscriber.name = req.body.name
  }
  if (req.body.subscribedToChannel != null) {
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel
  }
  try {
    const updatedSubscriber = await res.subscriber.save()
    res.json(updatedSubscriber)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove()
    res.json({ message: 'Deleted Subscriber' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getUser(req, res, next) {
  let user
  try {
    user = await User.find({email: req.query.email})
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.user = user
  next()
}
*/
module.exports = router
