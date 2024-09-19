const jwt = require("jsonwebtoken");

const verifytoken = (req, res)=>{
    const { token } = req.body;
  
        if (!token) {
          return res.json({ isValid: false });
        }
      
        jwt.verify(token, process.env.secreate_key, (err, decoded) => {
          if (err) {
            return res.json({ isValid: false });
          }
          return res.json({ isValid: true });
        });
}

module.exports ={
    verifytoken
}
