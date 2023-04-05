const express = require('express');
const router = express.Router();

const { authCheck,  } = require('../routers/middleware/auth_check')
const { adminCheck } = require('../routers/middleware/auth_admin')

const branchBuilder = require("../controllers/branch-controller")

//===================CRUD Router==================//
//Endpoint: http://localhost:9000/v1/branch/create
//Method:   POST
//Access:   private
router.post("/branch/create",branchBuilder.create_branch)

//Endpoint: http://localhost:9000/v1/branch/list
//Method:   GET
//Access:   private
router.get("/branch/list",authCheck,adminCheck,branchBuilder.list_branch)

//Endpoint: http://localhost:9000/v1//branch/read/:id
//Method:   GET
//Access:   private
router.get("/branch/read/:id",branchBuilder.read_branch)

//Endpoint: http://localhost:9000/v1/branch//update/:id
//Method:   PUT
//Access:   private
router.put("/branch/update/:id",branchBuilder.update_branch);

//Endpoint: http://localhost:9000/v1/branch/delete/:id
//Method:   DELETE
//Access:   private
router.delete("/branch/remove/:id",branchBuilder.Remove_branch);

//Endpoint: http://localhost:9000/v1/branch/pages/:page/:limit
//          http://192.168.150.227:9000/v1/branch/pages/2/5     
//Method:   GET 
//Access:   private

router.get("/branch/pages/:page/:limit",authCheck,adminCheck,branchBuilder.pagination_page_branch)





module.exports = router