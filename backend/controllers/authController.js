module.exports = (UserModel) => {
    //controller allowing the management of reconnection by token 
    const checkToken = async (req, res) => {
        try {
            const user = await UserModel.getUserById(req.id)
            if(user.code){
                res.json({status: 500, msg: "Oups, une erreur est survenue!"})
            } else {
                const myUser = {
                    id: user[0].id,
                    firstname: user[0].firstname,
                    lastname: user[0].lastname,
                    email: user[0].email,
                    address: user[0].address,
                    zipcode: user[0].zipcode,
                    city: user[0].city,
                    phone: user[0].phone,
                    role: user[0].type
                }
                res.json({status: 200, user: myUser})
            }
        } catch(err) {
            res.json({status: 500, msg: "Oups, une erreur est survenue!"})
        }
    }
 
    return {
        checkToken
    }   
}