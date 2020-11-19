const express = require('express')
const user = require('../controllers/UserController')
const router = express.Router()

const { authMiddleware } = require('../controllers/UserController')

router.post('/register', user.register)

router.post('/login', user.login)

router.get('/', user.getUsers)

router.post('/', user.createUser)

router.get('/:id', user.GetUserById)

router.put('/:id', user.UpdateUser)

router.delete('/:id', user.DeleteUser)

router.get('/profile', authMiddleware, function (req, res) {
  res.json({ 'access': true })
})

module.exports = router