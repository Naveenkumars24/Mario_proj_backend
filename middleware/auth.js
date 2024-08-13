const jwt = require('jsonwebtoken');

const auth  = (req,res,next) => {
    if(!req.header('Authorization')){
        return res.status(401).json({error : "No Token , authorization denied"});
    }
    const token = req.header('Authorization').split(" ")[1];

    if(!token)
    {
        return res.status(401).json({error : "No token , authorization denied"});
    }
    try{
        const decoded = jwt.verify(token,"my-secret-code");
        req.user  = decoded;
        next(); 
    }
    catch(err){
        res.status(400).json({error : "Invalid token"});
    }
};

module.exports = auth;