const jwt = require('jsonwebtoken')
const dotenv = require("dotenv")
dotenv.config()
//middleware that will authorize or not the automatic reconnection of a user or authorize or not access to node's protected routes
const withAuthAdmin = (req, res, next) => {
    //we retrieve our token in the header of the AJAX HTTP request
    const token = req.headers['x-access-token'] //Bearer-token
    //if it does not find this token in the headers of the ajax request
    if(token === undefined){
        //an error is returned (the user will not be able to access the protected route controller or will not be able to be reconnected)
        res.json({status: 404, msg: "Error, token not found..."})
    } else {
        //otherwise if there is a token, we check if its correct using the verify function of the jsonwebtoken library
        jwt.verify(token, process.env.SECRET, (err, decoded) =>{
            //if there is an error the token is not valid
            if(err){
                res.json({status: 401, msg: "Error, your token is invalid!"})
            } else {
                //Connection is only allowed if the user has the admin role
                if(decoded.role !== "admin" ){
                    res.json({status: 401, msg: "Error, you are not an admin!"})
                } else {
                    //the token is valid and the payload is decrypted (decoded argument)
                    req.id = decoded.id;
                    //we exit the function we authorize access to the controller (callback) of the route
                    next()
                }
            }
        })
    }
    
}

module.exports = withAuthAdmin