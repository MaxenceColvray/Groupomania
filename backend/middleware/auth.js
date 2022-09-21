const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId,
           userIdAdmin: "63289cbf2524c26f2e72351e"
       };
    
       
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};