// const JWT = require('jsonwebtoken');


// module.exports = async (req,res,next) => {
//     try {
//         const token = req.headers['authorization'].split(" ")[1];
//     JWT.verify(token,process.env.JWT_SECRET,(err ,decode) => {
//         if(err){
//             return res.status(200).send({
//                 message:'Auth Fialed',
//                 success:false,
//             });
//         } else{
//             req.body.userId = decode.id;
//             next();
//         }
//     });
// }catch (error){
//     console.log(error);
//     res.status(401).send({
//         message:'Auth Failed',
//         success:false,
//     });
// }
//     };


const JWT = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: "Authorization header missing",
      });
    }

    const token = authHeader.split(" ")[1];

    JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Auth Failed",
        });
      }

      // ✅ DO NOT use req.body for GET requests
      req.userId = decoded.id;

      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "Auth Failed",
    });
  }
};
