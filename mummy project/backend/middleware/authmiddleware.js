const jwt = require("jsonwebtoken");
const { blacklist } = require("../blacklist/blacklist");

const authmiddleware = async (req, res, next) => {
    const token = req.headers.authorization
    try {
        if (!token) {
            res.status(200).json({ "Message": "Please login first" })
        }
        else if(blacklist.includes(token)){
            res.status(200).json({ "Message": "Please login first" })
        }
        else {
            jwt.verify(token, process.env.secreate_key, function (err, decoded) {
                if(err){
                   res.status(200).json({err}) 
                   
                }
                else if(decoded){
                    console.log(decoded.user);
                    req.role = decoded.user.role
                    req.body.creatorname = decoded.user.name
                    req.body.creatorid = decoded.user._id
                    req.body.phoneNumber = decoded.user.phoneNumber
                     
                    next()
                }
            });
        }

    } catch (error) {
        res.status(500).json({error}) 
    }
}

module.exports = {
    authmiddleware
}