const bcrypt = require("bcryptjs");
const saltRounds = 10
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
dotenv.config()

module.exports = (UserModel) => {
    // users selection controller
    const getAllUsers = async(req, res) => {
        try {
            const users = await UserModel.getAllUsers()

            if (users.code) {
                res.json({ status: 500, msg: "Oups, une erreur est survenue!" })
            }
            else {
                res.json({ status: 200, users: users })
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Oups, une erreur est survenue!" })
        }
    }
    
    //user selection controller
    const getUserById = async(req, res) => {
        try {
            const user = await UserModel.getUserById(req.params.id)

            if (user.code) {
                res.json({ status: 500, msg: "Oups, une erreur est survenue!" })
            }
            else {
                res.json({ status: 200, user: user })
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Oups, une erreur est survenue!" })
        }
    }

    //user registration controller
    const saveUser = async(req, res) => {
        try {
            const check = await UserModel.getUserByEmail(req.body.email);
            if (check.code) {
                res.json({ status: 500, msg: "Oups une erreur est survenue !" })
            }
            else {
                //check if the user exists; it must absolutely not exist
                if (check.length > 0) {
                    res.json({ status: 401, msg: "Cet email existe déjà !" })
                }
                else {
                    const hash = await bcrypt.hash(req.body.password, saltRounds)

                    const user = await UserModel.saveUser(req, hash);
                    if (user.code) {
                        res.json({ status: 500, msg: "Une difficulté est intervenue lors de la tentative d'ajout !" })
                    }
                    else {
                        res.json({ status: 200, msg: "Utilisateur a bien été ajouté avec succès !" })
                    }
                }
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Oups, une erreur est survenue !" })
        }
    }


    //user login controller
    const loginUser = async(req, res) => {
        try {
            //check if a user in the database has an account for this email
            const check = await UserModel.getUserByEmail(req.body.email)
            if (check.code) {
                res.json({ status: 500, msg: "Oups une erreur est survenue !" })
            }
            else {
                //if no user exists for this email
                if (check.length === 0) {
                    res.json({ status: 404, msg: "Utilisateur inconnu !" })
                }
                else {
                    //otherwise there is a user in the database for this email, so we compare the passwords
                    const result = await bcrypt.compare(req.body.password, check[0].password)
                    if (result) {
                        //The two passwords match, we can connect
                        //we create the payload (content that we will put into the token)
                        const payload = { id: check[0].id, role: check[0].type }
                        //we create our token with the signature (secret)
                        const token = jwt.sign(payload, process.env.SECRET)
                        
                        const recupUser = {
                            id: check[0].id,
                            firstname: check[0].firstname,
                            lastname: check[0].lastname,
                            email: check[0].email,
                            address: check[0].address,
                            zipcode: check[0].zipcode,
                            city: check[0].city,
                            phone: check[0].phone,
                            role: check[0].type
                        }
                        // send the token (for storage) and the user object (for the session connection with redux)
                        res.json({ status: 200, msg: "Connexion autorisée", token: token, user: recupUser })
                    }
                    else {
                        res.json({ status: 401, msg: "Erreur d'identification !" })
                    }
                }
            }
        }
        catch (err) {
            console.log(err)
            res.json({ status: 500, msg: "Oups, une erreur est survenue !" })
        }
    }


    //update user controller
    const updateUser = async(req, res) => {
        try {
            let password  = req.body.password;
        
            if (password) {
                //we encrypt the password entered by the user
                password = await bcrypt.hash(req.body.password, saltRounds)
            }
            // we update the user in the database
            const user = await UserModel.updateUser(req, req.params.id, password)
            if (user.code) {
                res.json({ status: 500, msg: "Une erreur est survenue!" })
            }
            else {
                // Profile has been modified, we send updated informations to the frontend (update redux)
                const newUser = await UserModel.getUserById(req.params.id)
                if (newUser.code) {
                    res.json({ status: 500, msg: "Une erreur est survenue!" })
                }
                else {
                    if (newUser.length === 0) {
                        res.json({ status: 404, msg: "Utilisateur introuvable!" })
                    }
                    else {
                        const myUser = {
                            id: newUser[0].id,
                            firstName: newUser[0].firstname,
                            lastName: newUser[0].lastname,
                            email: newUser[0].email,
                            address: newUser[0].address,
                            zip: newUser[0].zip,
                            city: newUser[0].city,
                            phone: newUser[0].phone,
                            role: newUser[0].type
                        };
                        res.json({ status: 200, newUser: myUser })
                    }

                }
            }
        }
        catch (err) {
            console.log(err)
            res.json({ status: 500, msg: "Une erreur est survenue!" })
        }
    }


    //delete user controller
    const deleteUser = async(req, res) => {
        try {
            // Check if the user exists in the database
            const user = await UserModel.getUserById(req.params.id)
            if (user.code) {
                res.json({ status: 500, msg: "Une erreur est survenue!" })
            }
            else {
                if (user.length === 0) {
                    res.json({ status: 500, msg: "Erreur: utillisateur introuvable !" })
                }
                else {
                    // Delete user
                    const deleteUser = await UserModel.deleteUser(req.params.id)

                    if (deleteUser.code) {
                        res.json({ status: 500, msg: "Une erreur est survenue!" })
                    }
                    else {
                        res.json({ status: 200, msg: "L'utilisateur a bien été supprimé !" })
                    }
                }
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Une erreur est survenue!" })
        }
    }


    return {
        getAllUsers,
        getUserById,
        saveUser,
        loginUser,
        updateUser,
        deleteUser
    }
}
