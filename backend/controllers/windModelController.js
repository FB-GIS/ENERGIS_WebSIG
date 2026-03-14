module.exports = (WindModelModel) => {

    const getAllWindModels = async(req, res) => {
        try {
            //Selection of all wind models
            const windmodels = await WindModelModel.getAllWind()
            if (windmodels.code) {
                // If the function sends a code as result then we send a json indicating an error
                res.json({ status: 500, msg: "Une erreur est survenue!" })
            }
            else {
                res.json({ status: 200, windmodels: windmodels })
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Une erreur est survenue!" })
        }
    }


    const getWindById = async(req, res) => {
        try {
            // Selection of a wind model by its ID
            const windmodel = await WindModelModel.getWindById(req.params.id)
            if (windmodel.code) {
                // If the function sends a code as result then we send a json indicating an error
                res.json({ status: 500, msg: "Une erreur est survenue!" })
            }
            else {
                res.json({ status: 200, windmodel: windmodel })
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Une erreur est survenue!" })
        }
    }


    const addWind = async(req, res) => {
        try {
            //We call the function that returns the wind model existing in the database by its name
            //We want to make sure that the entered value does not already exist in the database
            const existingWind = await WindModelModel.getWindByModel(req.body.model)
            console.log(req.body.name)
            if (existingWind.code) {
                // If the function sends a code as result then we send a json indicating an error
                res.json({ status: 500, msg: "Une erreur est survenue !" })
            }
            else {
                if (existingWind.length > 0) {
                    // If existingWind send a value in return then we send a json indicating that the model is already existing is the database
                    res.json({ status: 500, msg: "Erreur: Type d'éolienne déjà répertorié !" })
                }
                else {
                    //We call the function that add a new model in the database
                    const windmodel = await WindModelModel.addWind(req.body.model)
                    if (windmodel.code) {
                        // If the function sends a code as result then we send a json indicating an error
                        res.json({ status: 500, msg: "Une erreur est survenue!" })
                    }
                    else {
                        res.json({ status: 200, msg: "Le modèle d'éolienne a bien été ajouté !" })
                    }
                }
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Une erreur est survenue!" })
        }
    }


    const updateWind = async(req, res) => {
        try {
            //We call the function that returns the wind model existing in the database by its ID
            //We want to make sure that the route id parameter matches a model in the database
            const existingWindModel = await WindModelModel.getWindById(req.params.id)
            if (existingWindModel.code) {
                // If the function sends a code as result then we send a json indicating an error
                res.json({ status: 500, msg: "Une erreur est survenue !" })
            }
            else {
                if (existingWindModel.length === 0) {
                    // If type do not send a value in return then we send a json indicating that the model is not existing is the database
                    res.json({ status: 500, msg: "Erreur: modèle introuvable !" })
                }
                else {
                    //We call the function that returns the model existing in the database by its name
                    //We want to make sure that the entered value does not already exist in the database
                    const existingDev = await WindModelModel.getWindByModel(req.body.model)
                    if (existingDev.code) {
                        // If the function sends a code as result then we send a json indicating an error
                        res.json({ status: 500, msg: "Une erreur est survenue !" })
                    }
                    else {
                        if (existingDev.length > 0) {
                            // If existingDev send a value in return then we send a json indicating that the model is already existing is the database
                            res.json({ status: 500, msg: "Erreur: Statut de projet déjà répertorié !" })
                        }
                        else {
                            //We call the function that update the model in the database
                            const windmodel = await WindModelModel.updateWind(req.body.model, req.params.id)
                            if (windmodel.code) {
                                // If the function sends a code as result then we send a json indicating an error
                                res.json({ status: 500, msg: "Une erreur est survenue!" })
                            }
                            else {
                                res.json({ status: 200, msg: "Le modèle d'éolienne a bien été modifié !" })
                            }
                        }
                    }
                }
            }

        }
        catch (err) {
            res.json({ status: 500, msg: "Une erreur est survenue!" })
        }
    }


    const deleteWind = async(req, res) => {
        try {
            //We call the function that returns the wind model existing in the database by its ID
            //We want to make sure that the route id parameter matches a model in the database
            const existingWindModel = await WindModelModel.getWindById(req.params.id)
            if (existingWindModel.code) {
                // If the function sends a code as result then we send a json indicating an error
                res.json({ status: 500, msg: "Une erreur est survenue !" })
            }
            else {
                if (existingWindModel.length === 0) {
                    // If existingWindModel do not send a value in return then we send a json indicating that the model is not existing is the database
                    res.json({ status: 500, msg: "Erreur: modèle introuvable !" })
                }
                else {
                     //We call the function that delete the model in the database
                    const windmodel = await WindModelModel.deleteWind(req.params.id)
                    if (windmodel.code) {
                        // If the function sends a code as result then we send a json indicating an error
                        res.json({ status: 500, msg: "Une erreur est survenue!" })
                    }
                    else {
                        res.json({ status: 200, msg: "Le modèle d'éolienne a bien été supprimé !" })
                    }
                }
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Une erreur est survenue!" })
        }
    }

    return {
        getAllWindModels,
        getWindById,
        addWind,
        updateWind,
        deleteWind
    }
}
