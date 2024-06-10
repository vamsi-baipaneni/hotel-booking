const jwt = require('jsonwebtoken');

const validateToken = (req, res, next)=>{
    const token = req.cookies['authtoken']

    if(!token){
        return res.status(401).json({message: "Token Not Recieved"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userId = decoded.userId;
        next();
    }
    catch(error){
        return res.status(401).json({message: error});
    }
};

module.exports = validateToken;