const withAuth = require ('../middleware/withAuth')
const withAuthAdmin = require ('../middleware/withAuthAdmin')

module.exports = (app, db) => {

    const ProjectAreaModel = require("../models/ProjectAreaModel")(db)
    const projectAreaController = require("../controllers/projectAreaController")(ProjectAreaModel)
    
    app.get('/api/projectareas/all', withAuthAdmin, projectAreaController.getAllProjectAreas)
    // http://fredericbaron.ide.3wa.io:9500/api/projectareas/all
    
    app.get('/api/projectareas', withAuth, projectAreaController.getProjectAreasByUser)
    // http://fredericbaron.ide.3wa.io:9500/api/projectareas
    
    app.get('/api/projectarea/one/:id',  withAuth, projectAreaController.getProjectAreaById)
    // http://fredericbaron.ide.3wa.io:9500/api/projectarea/one/7

    app.post('/api/projectarea/save', withAuth, projectAreaController.addProjectArea)
    // http://fredericbaron.ide.3wa.io:9500/api/projectarea/save
    
    app.delete('/api/projectarea/delete/:id', withAuth, projectAreaController.deleteProjectArea)
    // http://fredericbaron.ide.3wa.io:9500/api/projectarea/delete/5
    
    app.put('/api/projectarea/update/:id', withAuth, projectAreaController.updateProjectArea)
    // http://fredericbaron.ide.3wa.io:9500/api/projectarea/update/4
    
}
