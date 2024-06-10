const express = require('express');
const validateToken = require('../middleware/auth');

const router = express.Router();

router.get("/validate", validateToken,(req, res)=>{
    res.status(200).json({userId: req.userId });
})

router.post("/logout", (req, res)=>{
    res.cookie("authtoken","",{
        expires: new Date(0),
    })
    res.send();
})

module.exports = router;