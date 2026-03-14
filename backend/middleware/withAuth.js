const jwt       = require('jsonwebtoken')
const dotenv = require("dotenv")
dotenv.config()

const withAuth = (req, res, next) => {
    //we retrieve our token in the header of the AJAX HTTP request
    const token = req.headers['x-access-token']
    //if it does not find this token in the headers of the ajax request
    if(token === undefined){
        //an error is returned (the user will not be able to access the protected route controller or will not be able to be reconnected)
        res.json({status: 404, msg: "Error, token not found."})
    } else {
        //otherwise if there is a token, we check if its correct using the verify function of the jsonwebtoken library
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if(err){
                //if there is an error the token is not valid
                res.json({status: 401, msg: "Error, your token is invalid"})
            } else {
                //the token is valid and the payload is decrypted (decoded argument)
                req.id = decoded.id
                //we exit the function we authorize access to the controller (callback) of the route
                next()
            }
        })
    }
}

module.exports = withAuth