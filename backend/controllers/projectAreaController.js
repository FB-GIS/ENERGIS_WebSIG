module.exports = (ProjectAreaModel) => {
    
    const getAllProjectAreas = async(req, res) => {
        try {
            //We call the function that returns all the project areas in the database
            const project_areas = await ProjectAreaModel.getAllProjectAreas()
            if (project_areas.code) {
                // If the function retuns a code as result then we send a json indicating an error
                res.json({ status: 500, msg: "Une erreur est survenue!" })
            }
            else {
                res.json({ status: 200, project_areas: project_areas })
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Une erreur est survenue!" })
        }
    }


    const getProjectAreasByUser = async(req, res) => {
        try {
            //We call the function that returns all the project areas in the database
            // Only areas created by the logged user will be displayed (selection by the user ID declared in the middleware WithAuth (req.id))
            const project_areas = await ProjectAreaModel.getProjectArea(req)
            if (project_areas.code) {
                // If the function retuns a code as result then we send a json indicating an error
                res.json({ status: 500, msg: "Une erreur est survenue!" })
            }
            else {
                res.json({ status: 200, project_areas: project_areas })
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Une erreur est survenue!" })
        }
    }

    const getProjectAreaById = async(req, res) => {
        try {
            //We call the function that returns a project area in the database by its ID
            // Only area created by the logged user will be displayed (selection by the user ID declared in the middleware WithAuth (req.id))
            const project_areas = await ProjectAreaModel.getProjectAreaById(req)
            if (project_areas.code) {
                 // If the function sends a code as result then we send a json indicating an error
                res.json({ status: 500, msg: "Une erreur est survenue!" })
            }
            else {
                if (project_areas.length === 0) {
                    // If project_areas  do not send a value in return then we send a json indicating that the project area is not existing is the database
                    res.json({ status: 500, msg: "Erreur: Zone de projet introuvable !" })
                }
                else {
                    res.json({ status: 200, project_areas: project_areas })
                }
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Une erreur est survenue!" })
        }
    }


    const addProjectArea = async(req, res) => {
        try {
             //We call the function that add a new project area in the database
            const project_areas = await ProjectAreaModel.addProjectArea(req)

            if (project_areas.code) {
                // If the function returns a code as result then we send a json indicating an error
                console.error(project_areas.code)
                res.json({ status: 500, msg: "Une erreur est survenue!" })
            }
            else {
                res.json({ status: 200, msg: "La zone de projet a bien été ajoutée" })
            }
        }
        catch (err) {
            console.log(err)
            res.json({ status: 500, msg: "Une erreur est survenue!" })
        }
    }


    const deleteProjectArea = async(req, res) => {
        try {
            //We call the function that returns the project area existing in the database by its ID
            //We want to make sure that the route id parameter matches a project area in the database
            const existingProjectArea = await ProjectAreaModel.getProjectAreaById(req)
            if (existingProjectArea.code) {
                // If the function sends a code as result then we send a json indicating an error
                res.json({ status: 500, msg: "Une erreur est survenue !" })
            }
            else {
                if (existingProjectArea.length === 0) {
                    // If existingProjectArea do not send a value in return then we send a json indicating that the project area is not existing is the database
                    res.json({ status: 500, msg: "Erreur: Zone de projet introuvable !" })
                }
                else {
                     //We call the function that delete the project area in the database
                    const delete_area = await ProjectAreaModel.deleteProjectArea(req.params.id)

                    if (delete_area.code) {
                        // If the function sends a code as result then we send a json indicating an error
                        res.json({ status: 500, msg: "Une erreur est survenue!" })
                    }
                    else {
                        res.json({ status: 200, msg: "Zone de projet supprimée!" })
                    }
                }
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Une erreur est survenue!" })
        }
    }


    const updateProjectArea = async(req, res) => {
        try {
            //We call the function that returns the project area existing in the database by its ID
            //We want to make sure that the route id parameter matches a project area in the database
            // Only areas created by the logged user will be updated (selection by the user ID declared in the middleware WithAuth (req.id))
            const existingProjectArea = await ProjectAreaModel.getProjectAreaById(req)
            if (existingProjectArea.code) {
                // If the function sends a code as result then we send a json indicating an error
                res.json({ status: 500, msg: "Une erreur est survenue !" })
            }
            else {
                if (existingProjectArea.length === 0) {
                    // If existingProjectArea do not send a value in return then we send a json indicating that the project area is not existing is the database
                    res.json({ status: 500, msg: "Erreur: Zone de projet introuvable !" })
                }
                else {
                     //We call the function that update the developer in the database
                    const update_area = await ProjectAreaModel.updateProjectArea(req, req.params.id)

                    if (update_area.code) {
                        // If the function sends a code as result then we send a json indicating an error
                        res.json({ status: 500, msg: "Une erreur est survenue!" })
                    }
                    else {
                        res.json({ status: 200, msg: "Zone de projet mise à jour!" })
                    }
                }
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Une erreur est survenue!" })
        }
    }


    return {
        getAllProjectAreas,
        getProjectAreasByUser,
        getProjectAreaById,
        addProjectArea,
        deleteProjectArea,
        updateProjectArea
    }

}
