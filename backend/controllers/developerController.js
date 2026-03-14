module.exports = (DeveloperModel) => {

    const getAllDeveloper = async(req, res) => {
        try {
            //We call the function that returns all the developers in the database
            const developers = await DeveloperModel.getAllDeveloper()
            if (developers.code) {
                 // If the function returns a code as result then we send a json indicating an error
                res.json({ status: 500, msg: "Une erreur est survenue!" })
            }
            else {
                res.json({ status: 200, developers: developers })
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Une erreur est survenue!!" })
        }
    }

    const getDeveloperById = async(req, res) => {
        try {
            //We call the function that returns the developer existing in the database by its ID
            const developer = await DeveloperModel.getDeveloperById(req.params.id)
            if (developer.code) {
                 // If the function returns a code as result then we send a json indicating an error
                res.json({ status: 500, msg: "Une erreur est survenue!" })
            }
            else {
                res.json({ status: 200, developer: developer })
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Une erreur est survenue!!" })
        }
    }

    const addDeveloper = async(req, res) => {
        try {
            //We call the function that returns the developer existing in the database by its name
            //We want to make sure that the entered value does not already exist in the database
            const existingType = await DeveloperModel.getDeveloperByName(req.body.name)
            console.log(req.body.name)
            if (existingType.code) {
                 // If the function returns a code as result then we send a json indicating an error
                res.json({ status: 500, msg: "Une erreur est survenue !" })
            }
            else {
                if (existingType.length > 0) {
                    // If existingType send a value in return then we send a json indicating that the developer is already existing is the database
                    res.json({ status: 500, msg: "Erreur: Développeur déjà répertorié !" })
                }
                else {
                    //We call the function that add a new developer in the database
                    const msg = await DeveloperModel.addDeveloper(req.body.name)
                    if (msg.code) {
                         // If msg sends a code as result then we send a json indicating an error
                        res.json({ status: 500, msg: "Une erreur est survenue !" })
                    }
                    else {
                        res.json({ status: 200, msg: "Le développeur a bien été ajouté" })
                    }
                }
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Une erreur est survenue!!" })
        }
    }



    const updateDeveloper = async(req, res) => {
        try {
            //We call the function that returns the developer existing in the database by its ID
            //We want to make sure that the route id parameter matches a developer in the database
            const developer = await DeveloperModel.getDeveloperById(req.params.id)
            if (developer.code) {
                // If the function sends a code as result then we send a json indicating an error
                res.json({ status: 500, msg: "Oups, une erreur est survenue!" })
            }
            else {
                if (developer.length === 0) {
                    // If developer do not send a value in return then we send a json indicating that the developer is not existing is the database
                    res.json({ status: 500, msg: "Erreur: Le développeur n'existe pas !" })
                }
                else {
                    //We call the function that returns the developer existing in the database by its name
                    //We want to make sure that the entered value does not already exist in the database
                    const existingDev = await DeveloperModel.getDeveloperByName(req.body.name)
                    if (existingDev.code) {
                        // If the function sends a code as result then we send a json indicating an error
                        res.json({ status: 500, msg: "Une erreur est survenue !" })
                    }
                    else {
                        if (existingDev.length > 0) {
                            // If existingDev send a value in return then we send a json indicating that the developer is already existing is the database
                            res.json({ status: 500, msg: "Erreur: Développeur déjà répertorié !" })
                        }
                        else {
                            //We call the function that update the developer in the database
                            const new_dev = await DeveloperModel.updateDeveloper(req.body.name, req.params.id)
                            if (new_dev.code) {
                                // If the function sends a code as result then we send a json indicating an error
                                res.json({ status: 500, msg: "Une erreur est survenue !" })
                            }
                            else {
                                res.json({ status: 200, msg: "Le développeur a bien été modifié" })
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



    const deleteDeveloper = async(req, res) => {
        try {
            //We call the function that returns the developer existing in the database by its ID
            //We want to make sure that the route id parameter matches a developer in the database
            const existingType = await DeveloperModel.getDeveloperById(req.params.id)
            if (existingType.code) {
                // If the function sends a code as result then we send a json indicating an error
                res.json({ status: 500, msg: "Une erreur est survenue !" })
            }
            else {
                if (existingType.length === 0) {
                    // If existingType do not send a value in return then we send a json indicating that the developer is not existing is the database
                    res.json({ status: 500, msg: "Erreur: Le développeur n'existe pas !" })
                }
                else {
                    //We call the function that delete the developer in the database
                    const msg = await DeveloperModel.deleteDeveloper(req.params.id)
                    if (msg.code) {
                        // If the function returns a code as result then we send a json indicating an error
                        res.json({ status: 500, msg: "Une erreur est survenue !" })
                    }
                    else {
                        res.json({ status: 200, msg: "Le développeur a bien été supprimé" })
                    }
                }
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Une erreur est survenue!!" })
        }
    }


    return {
        getAllDeveloper,
        getDeveloperById,
        addDeveloper,
        updateDeveloper,
        deleteDeveloper
    }

}
