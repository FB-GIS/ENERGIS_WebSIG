const withAuth = require('../middleware/withAuth')
const withAuthAdmin = require ('../middleware/withAuthAdmin')

module.exports = (app, db) => {

    const DeveloperModel = require("../models/DeveloperModel")(db)
    const developerController = require("../controllers/developerController")(DeveloperModel)

    app.get('/api/developer/all', withAuth, developerController.getAllDeveloper)
    // http://fredericbaron.ide.3wa.io:9500/api/developer/all

    app.get('/api/developer/one/:id', withAuth, developerController.getDeveloperById)
    // http://fredericbaron.ide.3wa.io:9500/api/developer/one/1
    
    app.post('/api/developer/save', withAuthAdmin, developerController.addDeveloper)
    // http://fredericbaron.ide.3wa.io:9500/api/developer/save
    
    app.put('/api/developer/update/:id', withAuthAdmin, developerController.updateDeveloper)
    // http://fredericbaron.ide.3wa.io:9500/api/developer/update/12
    
    app.delete('/api/developer/delete/:id', withAuthAdmin, developerController.deleteDeveloper)
    // http://fredericbaron.ide.3wa.io:9500/api/developer/delete/12

}
