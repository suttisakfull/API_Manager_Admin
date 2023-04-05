const express = require('express');
const router = express.Router();

const { authCheck,  } = require('../routers/middleware/auth_check')
const { adminCheck } = require('../routers/middleware/auth_admin')

const categoryBuilder = require('../controllers/category-controller')

//===================CRUD Router==================//
//Endpoint: http://localhost:9000/v1/category/create
//Method:   POST
//Access:   private
router.post("/category/create",authCheck,adminCheck,categoryBuilder.create_category);

//Endpoint: http://localhost:9000/v1/category/pages/:page/:limit
//          http://192.168.150.227:9000/v1/users/pages/2/5     
//Method:   GET 
//Access:   private

router.get("/category/pages/:page/:limit",authCheck,adminCheck,categoryBuilder.pagination_page_category)

router.get("/category/list",authCheck,adminCheck,categoryBuilder.list_category);

router.get("/category/read/:id", categoryBuilder.read_category);
//Endpoint: http://localhost:9000/v1//category/update/:id
//Method:   PUT
//Access:   private
router.put("/category/update/:id",authCheck,adminCheck,categoryBuilder.update_category);
//Endpoint: http://localhost:9000/v1/category/delete/:id
//Method:   DELETE
//Access:   private
router.delete("/category/remove/:id",authCheck,adminCheck,categoryBuilder.remove_category);

module.exports = router