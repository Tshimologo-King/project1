const jwt = require("jsonwebtoken");
require("dotenv").config()

module.exports = function(req, res, next) {
    const token = req.header(x-auth-token);
    if(!token){
        return res.status(401).json({msg: "Access Denied"});
    }
    try{
        const decoded = jwt.verify(token, process.env.jwtSecret);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({msg: "Token is invalid"});
    }
}