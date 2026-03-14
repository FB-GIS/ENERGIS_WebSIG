const withAuth = require ('../middleware/withAuth')
const withAuthAdmin = require ('../middleware/withAuthAdmin')

module.exports = (app, db) => {

    const WindModelModel = require("../models/WindModelModel")(db)
    const windModelController = require("../controllers/windModelController")(WindModelModel)
    

    app.get('/api/windmodels', withAuth, windModelController.getAllWindModels)
    // http://fredericbaron.ide.3wa.io:9500/api/windmodels
    
    app.post('/api/windmodel/save', withAuthAdmin, windModelController.addWind)
    // http://fredericbaron.ide.3wa.io:9500/api/windmodel/save
    
    app.get('/api/windmodel/one/:id', withAuth, windModelController.getWindById)
    // http://fredericbaron.ide.3wa.io:9500/api/windmodel/one/2
    
    app.put('/api/windmodel/update/:id', withAuthAdmin, windModelController.updateWind)
    // http://fredericbaron.ide.3wa.io:9500/api/windmodel/update/156
    
    app.delete('/api/windmodel/delete/:id', withAuthAdmin, windModelController.deleteWind)
    // http://fredericbaron.ide.3wa.io:9500/api/windmodel/delete/157

}