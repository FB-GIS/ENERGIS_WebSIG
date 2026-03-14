module.exports = (TypeSolarModel) => {

    const getAllSolar = async(req, res) => {
        try {
            //Selection of all type of solar project
            const type = await TypeSolarModel.getAllSolar()
            if (type.code) {
                // If the function sends a code as result then we send a json indicating an error
                res.json({ status: 500, msg: "Une erreur est survenue!" })
            }
            else {
                res.json({ status: 200, type: type })
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Une erreur est survenue!!" })
        }
    }

    const getSolarById = async(req, res) => {
        try {
              // Selection of a type by its ID
            const type = await TypeSolarModel.getSolarById(req.params.id)
            if (type.code) {
                // If the function sends a code as result then we send a json indicating an error
                res.json({ status: 500, msg: "Une erreur est survenue!" })
            }
            else {
                res.json({ status: 200, type: type })
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Une erreur est survenue!!" })
        }
    }

    const addSolar = async(req, res) => {
        try {
            //We call the function that returns the type of solar project existing in the database by its name
            //We want to make sure that the entered value does not already exist in the database
            const existingType = await TypeSolarModel.getSolarByType(req.body.type_project)
            console.log(req.body.name)
            if (existingType.code) {
                // If the function sends a code as result then we send a json indicating an error
                res.json({ status: 500, msg: "Une erreur est survenue !" })
            }
            else {
                if (existingType.length > 0) {
                    // If existingType send a value in return then we send a json indicating that the type of solar project is already existing is the database
                    res.json({ status: 500, msg: "Erreur: Type de radar déjà répertorié !" })
                }
                else {
                    //We call the function that add a new type in the database
                    const type = await TypeSolarModel.addSolar(req.body.type_project)
                    if (type.code) {
                        // If the function sends a code as result then we send a json indicating an error
                        res.json({ status: 500, msg: "Une erreur est survenue !" })
                    }
                    else {
                        res.json({ status: 200, msg: "Le type de projet solaire a bien été ajouté" })
                    }
                }
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Une erreur est survenue!!" })
        }
    }



    const updateSolar = async(req, res) => {
        try {
            //We call the function that returns the type of solar project existing in the database by its ID
            //We want to make sure that the route id parameter matches a type of project in the database
            const type = await TypeSolarModel.getSolarById(req.params.id)
            if (type.code) {
                // If the function sends a code as result then we send a json indicating an error
                res.json({ status: 500, msg: "Oups, une erreur est survenue!" })
            }
            else {
                if (type.length === 0) {
                    // If type do not send a value in return then we send a json indicating that the type of solar project is not existing is the database
                    res.json({ status: 500, msg: "Erreur: Le type de projet solaire n'existe pas !" })
                }
                else {
                    //We call the function that returns the type of solar project existing in the database by its name
                    //We want to make sure that the entered value does not already exist in the database
                    const existingType = await TypeSolarModel.getSolarByType(req.body.type_project)
                    if (existingType.code) {
                        // If the function sends a code as result then we send a json indicating an error
                        res.json({ status: 500, msg: "Une erreur est survenue !" })
                    }
                    else {
                        if (existingType.length > 0) {
                            // If existingType send a value in return then we send a json indicating that the type of solar project is already existing is the database
                            res.json({ status: 500, msg: "Erreur: Type de projet déjà répertorié !" })
                        }
                        else {
                            //We call the function that update the type of solar project in the database
                            const new_type = await TypeSolarModel.updateSolar(req.body.type_project, req.params.id)
                            if (new_type.code) {
                                // If the function sends a code as result then we send a json indicating an error
                                res.json({ status: 500, msg: "Une erreur est survenue !" })
                            }
                            else {
                                res.json({ status: 200, msg: "Le type de projet solaire a bien été mis à jour" })
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


    const deleteSolar = async(req, res) => {
        try {
            //We call the function that returns the type of solar project existing in the database by its ID
            //We want to make sure that the route id parameter matches a type of solar project in the database
            const existingType = await TypeSolarModel.getSolarById(req.params.id)
            if (existingType.code) {
                // If the function sends a code as result then we send a json indicating an error
                res.json({ status: 500, msg: "Une erreur est survenue !" })
            }
            else {
                if (existingType.length === 0) {
                    // If existingType do not send a value in return then we send a json indicating that the type of solar project is not existing is the database
                    res.json({ status: 500, msg: "Erreur: Type de projet n'existe pas !" })
                }
                else {
                     //We call the function that delete the type of solar project in the database
                    const type = await TypeSolarModel.deleteSolar(req.params.id)
                    if (type.code) {
                        // If the function sends a code as result then we send a json indicating an error
                        res.json({ status: 500, msg: "Une erreur est survenue !" })
                    }
                    else {
                        res.json({ status: 200, msg: "Le type de projet solaire a bien été supprimé" })
                    }
                }
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Une erreur est survenue!!" })
        }
    }


    return {
        getAllSolar,
        getSolarById,
        addSolar,
        updateSolar,
        deleteSolar
    }

}
