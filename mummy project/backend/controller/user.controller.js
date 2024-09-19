
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const { blacklist } = require("../blacklist/blacklist");
const { UserModel } = require("../model/user.route");
require('dotenv').config()



const register = async (req, res) => {
    const { name, email, password, phoneNumber,role } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (user) {
            res.status(200).json({ "Message": `User with email id ${email} is already register` });
            return;
        }
       else if(!user){
        bcrypt.hash(password, 5, async function (err, hash) {
            if (err) {
                res.status(200).json({ "Error": err });
            }
            else if (hash) {
                const newuser = new UserModel({
                    name,
                    email,
                    password: hash,
                    phoneNumber,
                    role
                });
                await newuser.save();
                res.status(200).json({ "Message": `New user with email id ${email} register successfull` })
            }
            else {
                res.status(200).json({ "Message": `Invalid Credentials` })
            }
        });
       }
        else {
            res.status(200).json({ "Message": `Invalid Credentials` }) 
        }

    } catch (error) {
        res.status(500).json({ "Error": error.message })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            res.status(200).json({ "Message": `User with email id ${email} is not  register` })
        }
          else if(user){
            bcrypt.compare(password, user.password, function (err, result) {
                if (err) {
                    res.status(200).json({ "Error": err });
                }
                else if (result) {
                    const token = jwt.sign({ user: user }, process.env.secreate_key);
                    //    localStorage.setItem("name",user.name)
                    res.status(200).json({ "Message": `Login successfull`, user, token })
                }
                else {
                    res.status(200).json({ "Message": `Password is not correct` })
                }
            });
          }
          else{
            res.status(200).json({Message:"Invalid credentials"})
          }
      
    } catch (error) {
        res.status(500).json({ "Error": error.message })
    }

}

const logout = async (req, res) => {
    const token = req.headers.authorization
    try {
        blacklist.push(token);
        res.status(200).json({ "Message": "User logout successfull" })

    } catch (error) {
        res.status(500).json({ "Error": error.message })
    }
}


module.exports = {
    register,
    login,
    logout

}