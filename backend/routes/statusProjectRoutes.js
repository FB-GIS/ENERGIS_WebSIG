const withAuth = require('../middleware/withAuth')
const withAuthAdmin = require ('../middleware/withAuthAdmin')

module.exports = (app, db) => {

    const StatusProjectModel = require("../models/StatusProjectModel")(db)
    const statusProjectController = require("../controllers/statusProjectController")(StatusProjectModel)

    app.get('/api/statusprojects/all', withAuth, statusProjectController.getAllStatus)
    // http://fredericbaron.ide.3wa.io:9500/api/statusprojects/all

    app.get('/api/statusproject/one/:id', withAuth, statusProjectController.getStatusById)
    // http://fredericbaron.ide.3wa.io:9500/api/statusproject/one/1
    
    app.post('/api/statusproject/save', withAuthAdmin, statusProjectController.addStatus)
    // http://fredericbaron.ide.3wa.io:9500/api/statusproject/save
    
    app.put('/api/statusproject/update/:id', withAuthAdmin, statusProjectController.updateStatus)
    // http://fredericbaron.ide.3wa.io:9500/api/statusproject/update/12
    
    app.delete('/api/statusproject/delete/:id', withAuthAdmin, statusProjectController.deleteStatus)
    // http://fredericbaron.ide.3wa.io:9500/api/statusproject/delete/12

}
