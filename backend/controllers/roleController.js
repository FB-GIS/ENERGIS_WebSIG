module.exports = (RoleModel) => {

    const getAllRoles = async(req, res) => {
        try {
            //Selection of all roles
            const roles = await RoleModel.getAllRoles()

            if (roles.code) {
                // If the function returns a code as result then we send a json indicating an error
                res.json({ status: 500, msg: "Une erreur est survenue !" })
            }
            else {
                res.json({ status: 200, roles: roles })
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Une erreur est survenue !" })
        }
    }


    const getRoleById = async(req, res) => {
        try {
            // Selection of a role by its ID
            const role = await RoleModel.getRoleById(req.params.id)

            if (role.code) {
                // If the function returns a code as result then we send a json indicating an error
                res.json({ status: 500, msg: "Une erreur est survenue !" })
            }
            else {
                res.json({ status: 200, role: role })
            }

        }
        catch (err) {
            res.json({ status: 500, msg: "Une erreur est survenue !" })
        }
    }



    const deleteRoleById = async(req, res) => {
        try {
            //We call the function that returns the role existing in the database by its ID
            //We want to make sure that the route id parameter matches a role in the database
            const existingRole = await RoleModel.getRoleById(req.params.id)
            if (existingRole.code) {
                // If the function returns a code as result then we send a json indicating an error
                res.json({ status: 500, msg: "Une erreur est survenue !" })
            }
            else {
                // If existingRole do not send a value in return then we send a json indicating that the role is not existing is the database
                if (existingRole.length === 0) {
                    res.json({ status: 500, msg: "Erreur: Rôle introuvable !" })
                }
                else {
                    //We call the function that delete the role in the database
                    const deleteRole = await RoleModel.deleteRoleById(req.params.id)
                    if (deleteRole.code) {
                        // If the function returns a code as result then we send a json indicating an error
                        res.json({ status: 500, msg: "Une erreur est survenue !" })
                    }
                    else {
                        res.json({ status: 200, msg: "Le rôle a bien été supprimé !" })
                    }
                }
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Une erreur est survenue !" })
        }
    }


    const addRole = async(req, res) => {
        try {
            //We call the function that returns the role existing in the database by its name
            //We want to make sure that the entered value does not already exist in the database
            const existingRole = await RoleModel.getRoleByType(req.body.type)
            if (existingRole.code) {
                // If the function returns a code as result then we send a json indicating an error
                res.json({ status: 500, msg: "Une erreur est survenue !" })
            }
            else {
                if (existingRole.length > 0) {
                    // If existingRole send a value in return then we send a json indicating that the developer is already existing is the database
                    res.json({ status: 500, msg: "Erreur: Rôle déjà répertorié !" })
                }
                else {
                    //We call the function that add the role in the database
                    const new_role = await RoleModel.addRole(req)
                    if (new_role.code) {
                        // If the function returns a code as result then we send a json indicating an error
                        res.json({ status: 500, msg: "Une erreur est survenue !" })
                    }
                    else {
                        res.json({ status: 200, msg: "Le rôle a bien été ajouté" })
                    }
                }
            }
        }
        catch (err) {

            res.json({ status: 500, msg: "Une erreur est survenue !" })
        }
    }


    const updateRoleById = async(req, res) => {
        try {
            //We call the function that returns the role existing in the database by its ID
            //We want to make sure that the route id parameter matches a role in the database
            const existingRole = await RoleModel.getRoleById(req.params.id)
            if (existingRole.code) {
                // If the function returns a code as result then we send a json indicating an error
                res.json({ status: 500, msg: "Une erreur est survenue !" })
            }
            else {
                if (existingRole.length === 0) {
                    // If existingRole do not send a value in return then we send a json indicating that the role is not existing is the database
                    res.json({ status: 500, msg: "Erreur: Rôle introuvable !" })
                }
                else {
                    //We call the function that update the role in the database
                    const new_role = await RoleModel.updateRoleById(req, req.params.id)
                    if (new_role.code) {
                        // If the function returns a code as result then we send a json indicating an error
                        res.json({ status: 500, msg: "Une erreur est survenue !" })
                    }
                    else {
                        res.json({ status: 200, msg: "Le rôle a bien été modifié !" })
                    }
                }
            }
        }
        catch (err) {

            res.json({ status: 500, msg: "Une erreur est survenue !" })
        }
    }

    return {
        getAllRoles,
        getRoleById,
        deleteRoleById,
        addRole,
        updateRoleById

    }

}
