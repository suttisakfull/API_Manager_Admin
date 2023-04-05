const express = require('express');
const router = express.Router();


const { authCheck,  } = require('../routers/middleware/auth_check')
const { adminCheck } = require('../routers/middleware/auth_admin')

const deviceBuilder = require('../controllers/device-controller')

//===================CRUD Router==================//
router.post("/device/create",deviceBuilder.create_device)

router.get("/device/list",deviceBuilder.list_device)

router.get("/device/read/:id",deviceBuilder.read_device)

router.put("/device/update/:id",deviceBuilder.update_device)

router.delete("/device/remove/:id",deviceBuilder.remove_device)

router.post('/device/search/filters',deviceBuilder.searchFilters)

module.exports = router