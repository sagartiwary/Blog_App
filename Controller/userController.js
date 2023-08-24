const { UserModel } = require("../Model/userSchema");
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")


// step-1 created a registration route
const userRegistered = async (req, res) => {
    const { Username, Avatar, Email, Password } = req.body;
    try {
        const existedUser = await UserModel.findOne({ Email });
        if (existedUser) {
            res.status(200).json({ msg: "User Already Existed,Please login in" })
        } else {
            bcrypt.hash(Password, 5, async (err, hash) => {
                if (err) {
                    res.status(400).json({ msg: err.message })
                } else {
                    let newUser = new UserModel({ Username, Avatar, Email, Password:hash })
                    await newUser.save();
                    res.status(200).json({ msg: "New User added successfully",newUser })
                }
            })
        }
    } catch (error) {
        res.status(200).json({ msg: error.message })
    }
}


// login here

const userLogin = async (req, res) => {
    const { Email, Password } = req.body;
    try {
        const existedUser = await UserModel.findOne({ Email });
        if (existedUser) {
            bcrypt.compare(Password, existedUser.Password, async (err, result) => {
                if (result) {
                    let token = jwt.sign({ username: existedUser.Username,userID:existedUser._id }, "sagar", {
                        expiresIn: "7d"
                    });
                    res.status(200).json({ msg: "Login Successful...", token })
                } else if (err) {
                    res.status(400).json({ msg: err.message })
                }
            })
        } else {
            res.status(200).json({ msg: "User does not exist" })
        }
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

module.exports = {
    userRegistered,userLogin
}