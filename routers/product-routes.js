const express = require('express');
const router = express.Router();

const { authCheck,  } = require('../routers/middleware/auth_check')
const { adminCheck } = require('../routers/middleware/auth_admin')

const productBuilder = require('../controllers/product-controller')

//===================CRUD Router==================//
//Endpoint: http://localhost:9000/v1/product/create
//Method:   POST
//Access:   private
router.post("/product/create",authCheck,adminCheck,productBuilder.create_product)
//Endpoint: http://localhost:9000/v1/product/list
//Method:   GET
//Access:   private
router.get("/product/list/:count",authCheck,adminCheck,productBuilder.list_product)
//Endpoint: http://localhost:9000/v1/product/remove/:id
//Method:   delete
//Access:   private
router.delete("/product/remove/:id",authCheck,adminCheck,productBuilder.remove_product)

module.exports = router