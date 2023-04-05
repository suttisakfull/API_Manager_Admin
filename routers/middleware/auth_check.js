const jwt = require("jsonwebtoken");

const config = process.env;

exports.authCheck =(req, res, next) =>{
  const token = req.headers['authtoken'];
  console.log("::",token)
  if(!token){
    return res.status(401)
           .send('No token , authorization denie')
  }
  try{
    const decoded = jwt.verify(token,config.TOKEN_KEY)
    req.user = decoded.user
    next();
  }catch(err){
    res.status(401)
         .send('Token is not valid auth')
  }
}






// const verifyToken = (req, res, next) => {
//   const token =
//     req.body.token ||
//     req.query.token ||
//     req.headers["x-access-token"] ||
//     req.headers["x-token"]||
//     req.headers['authtoken'];

//   if (!token) {
//     return res
//       .status(403)
//       .send({ result: false, data: "A token is required for authentication" });
//   }
//   try {
//     const decoded = jwt.verify(token, config.TOKEN_KEY);
//     req.user = decoded;
//     console.log("Decoded: ", req.user);
//     return next();
//   } catch (err) {
//     return res.status(401).send({ result: false, data: "Invalid Token" });
//   }
  
// };

// module.exports = verifyToken;
