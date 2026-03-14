const withAuth = require ('../middleware/withAuth')
const withAuthAdmin = require ('../middleware/withAuthAdmin')


module.exports = (app, db) => {

    const UserModel = require("../models/UserModel")(db)
    const userController = require("../controllers/userController")(UserModel)
   

    app.get('/api/users', withAuthAdmin, userController.getAllUsers)
    // http://fredericbaron.ide.3wa.io:9500/api/users

    app.post('/api/user/save', userController.saveUser)
    // http://fredericbaron.ide.3wa.io:9500/api/user/save
    
    app.post('/api/user/login', userController.loginUser)
    // http://fredericbaron.ide.3wa.io:9500/api/user/login

    app.get('/api/user/one/:id', withAuth, userController.getUserById)
    // http://fredericbaron.ide.3wa.io:9500/api/user/one/1

    app.delete('/api/user/delete/:id', withAuthAdmin, userController.deleteUser)
    // http://fredericbaron.ide.3wa.io:9500/api/user/delete/1
    
    app.put('/api/user/update/:id', withAuth, userController.updateUser)
    // http://fredericbaron.ide.3wa.io:9500/api/user/update/1

}