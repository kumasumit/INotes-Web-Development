const express = require('express')
const router = express.Router()
//all routes with /api/auth/something will route through auth.js file inside routes
//all routes with /api/notes/something will route through notes.js file inside routes
router.use('/api/auth', require('./auth'));
router.use('/api/notes', require('./notes'));
module.exports = router