const withAuthAdmin = require ('../middleware/withAuthAdmin')

module.exports = (app, db) => {
    
    const RoleModel = require("../models/RoleModel")(db)
    const roleController = require("../controllers/roleController")(RoleModel)
    
    app.get('/api/roles', withAuthAdmin, roleController.getAllRoles)
    // http://fredericbaron.ide.3wa.io:9500/api/roles
    
    app.post('/api/role/save', withAuthAdmin, roleController.addRole)
    // http://fredericbaron.ide.3wa.io:9500/api/role/save
    
    app.get('/api/role/one/:id', withAuthAdmin, roleController.getRoleById)
    // http://fredericbaron.ide.3wa.io:9500/api/role/one/1
    
    app.delete('/api/role/delete/:id', withAuthAdmin, roleController.deleteRoleById)
    // http://fredericbaron.ide.3wa.io:9500/api/role/delete/1

    app.put('/api/role/update/:id', withAuthAdmin, roleController.updateRoleById)
    // http://fredericbaron.ide.3wa.io:9500/api/role/update/3
}