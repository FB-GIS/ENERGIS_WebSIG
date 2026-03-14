module.exports = (StatusProjectModel) => {

    const getAllStatus = async(req, res) => {
        try {
            //Selection of all status
            const statusProject = await StatusProjectModel.getAllStatus()
            if (statusProject.code) {
                // If the function sends a code as result then we send a json indicating an error
                res.json({ status: 500, msg: "Une erreur est survenue!" })
            }
            else {
                res.json({ status: 200, statusProject: statusProject })
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Une erreur est survenue!!" })
        }
    }

    const getStatusById = async(req, res) => {
        try {
              // Selection of a status by its ID
            const statusProject = await StatusProjectModel.getStatusById(req.params.id)
            if (statusProject.code) {
                // If the function sends a code as result then we send a json indicating an error
                res.json({ status: 500, msg: "Une erreur est survenue!" })
            }
            else {
                res.json({ status: 200, statusProject: statusProject })
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Une erreur est survenue!!" })
        }
    }

    const addStatus = async(req, res) => {
        try {
            const existingType = await StatusProjectModel.getStatusByStatus(req.body.status)
            console.log(req.body.name)
            if (existingType.code) {
                // If the function sends a code as result then we send a json indicating an error
                res.json({ status: 500, msg: "Une erreur est survenue !" })
            }
            else {
                if (existingType.length > 0) {
                    res.json({ status: 500, msg: "Erreur: Statut de projet déjà répertorié !" })
                }
                else {
                    const msg = await StatusProjectModel.addStatus(req.body.status)
                    if (msg.code) {
                        // If the function sends a code as result then we send a json indicating an error
                        res.json({ status: 500, msg: "Une erreur est survenue !" })
                    }
                    else {
                        res.json({ status: 200, msg: "Le statut du projet a bien été ajouté" })
                    }
                }
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Une erreur est survenue!!" })
        }
    }



    const updateStatus = async(req, res) => {
        try {
            //We call the function that returns the status existing in the database by its ID
            //We want to make sure that the route id parameter matches a status in the database
            const status = await StatusProjectModel.getStatusById(req.params.id)
            if (status.code) {
                // If the function sends a code as result then we send a json indicating an error
                res.json({ status: 500, msg: "Oups, une erreur est survenue!" })
            }
            else {
                if (status.length === 0) {
                    // If status do not send a value in return then we send a json indicating that the status is not existing is the database
                    res.json({ status: 500, msg: "Erreur: Le statut n'existe pas !" })
                }
                else {
                    //We call the function that returns the status existing in the database by its name
                    //We want to make sure that the entered value does not already exist in the database
                    const existingStatus = await StatusProjectModel.getStatusByStatus(req.body.status)
                    if (existingStatus.code) {
                        // If the function sends a code as result then we send a json indicating an error
                        res.json({ status: 500, msg: "Une erreur est survenue !" })
                    }
                    else {
                        if (existingStatus.length > 0) {
                             // If existingStatus send a value in return then we send a json indicating that the status is already existing is the database
                            res.json({ status: 500, msg: "Erreur: Statut de projet déjà répertorié !" })
                        }
                        else {
                             //We call the function that update the status in the database
                            const new_status = await StatusProjectModel.updateStatus(req.body.status, req.params.id)
                            if (new_status.code) {
                                // If the function sends a code as result then we send a json indicating an error
                                res.json({ status: 500, msg: "Une erreur est survenue !" })
                            }
                            else {
                                res.json({ status: 200, msg: "Le statut du projet a bien été modifié" })
                            }
                        }
                    }
                }
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Une erreur est survenue!!" })
        }
    }



    const deleteStatus = async(req, res) => {
        try {
            //We call the function that returns the status existing in the database by its ID
            //We want to make sure that the route id parameter matches a status in the database
            const existingStatus = await StatusProjectModel.getStatusById(req.params.id)
            if (existingStatus.code) {
                // If the function sends a code as result then we send a json indicating an error
                res.json({ status: 500, msg: "Une erreur est survenue !" })
            }
            else {
                if (existingStatus.length === 0) {
                    // If existingStatus do not send a value in return then we send a json indicating that the staatus is not existing is the database
                    res.json({ status: 500, msg: "Erreur: Le statut de projet n'existe pas !" })
                }
                else {
                    //We call the function that delete the status in the database
                    const msg = await StatusProjectModel.deleteStatus(req.params.id)
                    if (msg.code) {
                        // If the function sends a code as result then we send a json indicating an error
                        res.json({ status: 500, msg: "Une erreur est survenue !" })
                    }
                    else {
                        res.json({ status: 200, msg: "Le statut du projet a bien été supprimé" })
                    }
                }
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Une erreur est survenue!!" })
        }
    }


    return {
        getAllStatus,
        getStatusById,
        addStatus,
        updateStatus,
        deleteStatus
    }

}
