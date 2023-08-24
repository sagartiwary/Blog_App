
const jwt = require('jsonwebtoken')
const auth = (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];
    try {
        if (token) {
            let decoded = jwt.verify(token, "sagar");
            if (decoded) {
                req.body.userID = decoded.userID
                req.body.username = decoded.username;
                next()
            } else {
                res.status(200).json({ msg: "You are not allowed" })
            }
        } else {
            res.status(400).json({ msg: "Wrong Credentials." })
        }
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
};
module.exports = {
    auth
}