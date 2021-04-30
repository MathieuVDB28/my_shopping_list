const jwt = require('jsonwebtoken');
const JWTConfig = require('../config/JWTConfig')

const isValidToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if(!token){
      res.sendStatus(400);
    }
    jwt.verify(token, JWTConfig.SECRET_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Unauthorized!"
        });
      }
      next();
    });
  }

exports.isValidToken = isValidToken;