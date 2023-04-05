const express = require('express');
const router = express.Router();
const auth = require("./middleware/auth");

const { authCheck,  } = require('../routers/middleware/auth_check')
const { adminCheck } = require('../routers/middleware/auth_admin')

const usersBuilder = require('../controllers/user-controller')


//=================== Authen Router==================//

//Endpoint: http://localhost:9000/v1/users/register
//Method:   POST
//Access:   public
router.post("/users/register",usersBuilder.register);

//Endpoint: http://localhost:9000/v1/users/login
//Method:   POST
//Access:   public
router.post("/users/login",usersBuilder.login);

//Endpoint: http://localhost:9000/v1/current-user
//Method:   POST
//Access:   private
router.post("/current-user",authCheck,usersBuilder.currentUser);

//Endpoint: http://localhost:9000/v1/current-admin
//Method:   POST
//Access:   private
router.post("/current-admin",authCheck,adminCheck,usersBuilder.currentAdmin);


//===================CRUD Router==================//

//Endpoint: http://localhost:9000/v1/users/list
//Method:   GET
//Access:   private
router.get("/users/list",authCheck,usersBuilder.list_users)

//Endpoint: http://localhost:9000/v1/users/read/:id
//Method:   GET
//Access:   private
router.get("/users/read/:id",authCheck,adminCheck,usersBuilder.read_users)

//Endpoint: http://localhost:9000/v1/users/update/:id
//Method:   PUT
//Access:   private
router.put("/users/resetPassword/:id",authCheck,adminCheck,usersBuilder.update_users)

//Endpoint: http://localhost:9000/v1/users/delete/:id
//Method:   DELETE
//Access:   private
router.delete("/users/remove/:id",authCheck,adminCheck,usersBuilder.delete_users)

//====================================== Table Edit ===================================================//

//Endpoint: http://localhost:9000/v1/users/change-status
//Method:   POST
//Access:   private

router.post("/users/change-status",authCheck,adminCheck,usersBuilder.change_status_users)

//Endpoint: http://localhost:9000/v1/users/change-roles
//Method:   POST
//Access:   private

router.post("/users/change-roles",authCheck,adminCheck,usersBuilder.change_roles_users)


//Endpoint: http://localhost:9000/v1/users/pages/:page/:limit
//          http://192.168.150.227:9000/v1/users/pages/2/5     
//Method:   GET 
//Access:   private

router.get("/users/pages/:page/:limit",authCheck,adminCheck,usersBuilder.pagination_page_users)


module.exports = router