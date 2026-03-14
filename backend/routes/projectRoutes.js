const withAuth = require ('../middleware/withAuth')
const withAuthAdmin = require ('../middleware/withAuthAdmin')

module.exports = (app, db) => {

    const ProjectModel = require("../models/ProjectModel")(db)
    const TypeSolarModel = require("../models/TypeSolarModel")(db)
    const StatusProjectModel = require("../models/StatusProjectModel")(db)
    const DeveloperModel = require("../models/DeveloperModel")(db)
    const WindModelModel = require("../models/WindModelModel")(db)
    
    const projectController = require("../controllers/projectController")(ProjectModel, TypeSolarModel, StatusProjectModel, DeveloperModel, WindModelModel)
    

    app.get('/api/projects', withAuth, projectController.getAllProjects)
    // http://fredericbaron.ide.3wa.io:9500/api/projects/
    
    app.get('/api/projects/all/:energy', withAuth, projectController.getAllProjectsByEnergy)
    // http://fredericbaron.ide.3wa.io:9500/api/projects/all/solar
    
    app.post('/api/project/save', withAuthAdmin, projectController.addProject)
    // http://fredericbaron.ide.3wa.io:9500/api/project/save

    app.get('/api/project/one/:id', withAuth, projectController.getProjectById)
    // http://fredericbaron.ide.3wa.io:9500/api/project/one/1
    
    app.put('/api/project/update/:id', withAuthAdmin, projectController.updateProject)
    // http://fredericbaron.ide.3wa.io:9500/api/project/update/2759
    
    app.delete('/api/project/delete/:id', withAuthAdmin, projectController.deleteProject)
    // http://fredericbaron.ide.3wa.io:9500/api/project/delete/2759

}
