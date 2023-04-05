const express = require('express');
const router = express.Router();

const { authCheck,  } = require('../routers/middleware/auth_check')
const { adminCheck } = require('../routers/middleware/auth_admin')

const cloudinaryBuilder = require('../controllers/cloudinary-controller')

router.post("/cloudinary/create",cloudinaryBuilder.create_cloudinary)
router.post("/cloudinary/remove",cloudinaryBuilder.remove_cloudinary)

module.exports = router