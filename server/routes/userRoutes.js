const express = require('express')
const router = express.Router()
const {
  signup,
  signin,
  getMe
} = require('../controllers/userController')
const { authProtect } = require('../middleware/authMiddleware')

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/me', authProtect, getMe)

module.exports = router