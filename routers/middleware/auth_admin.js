
const User_Model = require('../../models/user-Model');
const jwt = require("jsonwebtoken");


exports.adminCheck= async (req, res, next) =>{
  const { username } = req.user;
  console.log(":", username)
  const adminUser = await User_Model.findOne({username}).exec();
  console.log("::", adminUser)
  if(adminUser.roles !== 'ADMIN'){
    return res.status(403).send('Admin Access Denied')

  }else{
    return next();
  }
}
