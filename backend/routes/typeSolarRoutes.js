const withAuth = require('../middleware/withAuth')
const withAuthAdmin = require ('../middleware/withAuthAdmin')

module.exports = (app, db) => {

    const TypeSolarModel = require("../models/TypeSolarModel")(db)
    const typeSolarController = require("../controllers/typeSolarController")(TypeSolarModel)

    app.get('/api/typessolar/all', withAuth, typeSolarController.getAllSolar)
    // http://fredericbaron.ide.3wa.io:9500/api/typessolar/all

    app.get('/api/typesolar/one/:id', withAuth, typeSolarController.getSolarById)
    // http://fredericbaron.ide.3wa.io:9500/api/typesolar/one/1
    
    app.post('/api/typesolar/save', withAuthAdmin, typeSolarController.addSolar)
    // http://fredericbaron.ide.3wa.io:9500/api/typesolar/save
    
    app.put('/api/typesolar/update/:id', withAuthAdmin, typeSolarController.updateSolar)
    // http://fredericbaron.ide.3wa.io:9500/api/typesolar/update/12
    
    app.delete('/api/typesolar/delete/:id', withAuthAdmin, typeSolarController.deleteSolar)
    // http://fredericbaron.ide.3wa.io:9500/api/typesolar/delete/12

}
