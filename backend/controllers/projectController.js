module.exports = (ProjectModel, TypeSolarModel, StatusProjectModel, DeveloperModel, WindModelModel) => {

     const getAllProjects = async(req, res) => {
          try {
               //We call the function that returns all the projects in the database
               const projects = await ProjectModel.getAllProjects()
               if (projects.code) {
                    // If the function returns a code as result then we send a json indicating an error
                    res.json({ status: 500, msg: "Une erreur est survenue !" });
               }
               else {

                    res.json({ status: 200, projects: projects })
               }
          }
          catch (err) {
               res.json({ status: 500, msg: "Une erreur est survenue !" });
          }
     }

     const getAllProjectsByEnergy = async(req, res) => {

          const allowedEnergies = ['solar', 'wind'];

          if (!allowedEnergies.includes(req.params.energy)) {
               return res.json({ status: 400, msg: "Le type d'énergie n'est pas valide." });
          }
          
          try {
               //We call the function that returns all the projects in the database
               const projects = await ProjectModel.getAllProjectsByEnergy(req.params.energy)
               if (projects.code) {
                    // If the function returns a code as result then we send a json indicating an error
                    res.json({ status: 500, msg: "Une erreur est survenue !" });
               }
               else {
                    res.json({ status: 200, projects: projects })
               }
          }
          catch (err) {
               res.json({ status: 500, msg: "Une erreur est survenue !" });
          }
     }

     const getProjectById = async(req, res) => {
          try {
               //We call the function that returns the project existing in the database by its ID
               const project = await ProjectModel.getProjectById(req.params.id)
               if (project.code) {
                    // If the function returns a code as result then we send a json indicating an error
                    res.json({ status: 500, msg: "Une erreur est survenue !" });
               }
               else {
                    res.json({ status: 200, project: project })
               }
          }
          catch (err) {
               res.json({ status: 500, msg: "Une erreur est survenue !" });
          }
     }


     const addProject = async(req, res) => {
          //This function aims to add a new wind/solar project to the database
          //As the Project table is linked to several other tables in the database, we need to manage the insertion of foreign keys.
          //Since the user will directly enter the values corresponding to the foreign keys (text values not integers), we must manage their insertion into the foreign key fields.

          //The function allows you to return the ID corresponding to the value entered by the user
          //If the value does not exist in the database, it will be created in database and its identifier will be returned (corresponding to the foreign key entered when creating a new project).
          try {
               // Try to retrieve the solar type from the database using the provided label
               const type = await TypeSolarModel.getSolarByType(req.body.type_solar_id);
               let typeId;
               if (type.code) {
                    // If the function returns a code as result then we send a json indicating an error
                    res.json({ status: 500, msg: "Une erreur est survenue !" });
               }
               else {
                    // If the type already exists, extract its ID
                    if (type.length > 0) {
                         typeId = type[0].id;
                    }
                    else {
                         // If it doesn't exist, insert the new type into the database
                         const insertType = await TypeSolarModel.addSolar(req.body.type_solar_id);
                         if (insertType.code) {
                              // If the function returns a code as result then we send a json indicating an error
                              res.json({ status: 500, msg: "Une erreur est survenue !" });
                         }
                         else {
                              // If the insertion was successful, get the newly inserted type ID
                              typeId = insertType.insertId;
                         }
                    }
               }

               //The function allows you to return the ID corresponding to the value entered by the user
               //If the value does not exist in the database, it will be created in database and its identifier will be returned (corresponding to the foreign key entered when creating a new project).
               // Try to retrieve the status of the project from the database using the provided label
               const status = await StatusProjectModel.getStatusByStatus(req.body.status_project_id);
               let statusId;
               if (status.code) {
                    // If the function returns a code as result then we send a json indicating an error
                    res.json({ status: 500, msg: "Une erreur est survenue !" });
               }
               else {
                    // If the status already exists, extract its ID
                    if (status.length > 0) {
                         statusId = status[0].id;
                    }
                    else {
                         // If it doesn't exist, insert the new type into the database
                         const insertStatus = await StatusProjectModel.addStatus(req.body.status_project_id);
                         if (insertStatus.code) {
                              // If the function returns a code as result then we send a json indicating an error
                              res.json({ status: 500, msg: "Une erreur est survenue !" });
                         }
                         else {
                              // If the insertion was successful, get the newly inserted type ID
                              statusId = insertStatus.insertId;
                         }
                    }
               }

               //The function allows you to return the ID corresponding to the value entered by the user
               //If the value does not exist in the database, it will be created in database and its identifier will be returned (corresponding to the foreign key entered when creating a new project).
               // Try to retrieve the developer of the project from the database using the provided label
               const dev = await DeveloperModel.getDeveloperByName(req.body.developer_id);
               let developerId;
               if (dev.code) {
                    // If the function returns a code as result then we send a json indicating an error
                    res.json({ status: 500, msg: "Une erreur est survenue !" });
               }
               else {
                    // If the developer already exists, extract its ID
                    if (dev.length > 0) {
                         developerId = dev[0].id;
                    }
                    else {
                         // If it doesn't exist, insert the new type into the database
                         const insertDev = await DeveloperModel.addDeveloper(req.body.developer_id);
                         if (insertDev.code) {
                              // If the function returns a code as result then we send a json indicating an error
                              res.json({ status: 500, msg: "Une erreur est survenue !" });
                         }
                         else {
                              // If the insertion was successful, get the newly inserted type ID
                              developerId = insertDev.insertId;
                         }
                    }
               }

               //The function allows you to return the ID corresponding to the value entered by the user
               //If the value does not exist in the database, it will be created in database and its identifier will be returned (corresponding to the foreign key entered when creating a new project).
               // Try to retrieve the wind model of the wind project from the database using the provided label
               const wind = await WindModelModel.getWindByModel(req.body.wind_model_id);
               let windId;
               if (wind.code) {
                    res.json({ status: 500, msg: "Une erreur  est survenue !" });
               }
               else {
                    // If the wind model already exists, extract its ID
                    if (wind.length > 0) {
                         windId = wind[0].id;
                    }
                    else {
                         // If it doesn't exist, insert the new type into the database
                         const insertWind = await WindModelModel.addWind(req.body.wind_model_id);
                         if (insertWind.code) {
                              // If the function returns a code as result then we send a json indicating an error
                              res.json({ status: 500, msg: "Une erreur est survenue !" });
                         }
                         else {
                              // If the insertion was successful, get the newly inserted type ID
                              windId = insertWind.insertId;
                         }
                    }
               }

               //Creation of the new project. An object composed of the informations entered by the user is passed as a parameter of the function
               const project = await ProjectModel.addProject({
                    name: req.body.name,
                    city: req.body.city,
                    energy: req.body.energy,
                    type_solar_id: typeId,
                    status_project_id: statusId,
                    developer_id: developerId,
                    wind_model_id: windId,
                    geojson: req.body.geojson
               })
               if (project.code) {
                    // If the function returns a code as result then we send a json indicating an error
                    res.json({ status: 500, msg: "Une erreur est survenue !" });
               }
               else {
                    return res.json({ status: 200, project: project });
               }

          }
          catch (err) {
               res.json({ status: 500, msg: "Une erreur est survenue" })
          }
     }


     //This function aims to update an existing wind/solar project in the database
     //As the Project table is linked to several other tables in the database, we need to manage the insertion of foreign keys.
     //Since the user will directly enter the values corresponding to the foreign keys (text values not integers), we must manage their insertion into the foreign key fields.

     //The function allows you to return the ID corresponding to the value entered by the user
     //If the value does not exist in the database, it will be created in database and its identifier will be returned (corresponding to the foreign key entered when creating a new project).
     // Try to retrieve the type of solar project from the database using the provided label
     const updateProject = async(req, res) => {
          try {
               const type = await TypeSolarModel.getSolarByType(req.body.type_solar_id);
               let typeId;
               if (type.code) {
                    // If the function returns a code as result then we send a json indicating an error
                    res.json({ status: 500, msg: "Une erreur est survenue !" });
               }
               else {
                    // If the type already exists, extract its ID
                    if (type.length > 0) {
                         typeId = type[0].id;
                    }
                    else {
                         // If it doesn't exist, insert the new type into the database
                         const insertType = await TypeSolarModel.addSolar(req.body.type_solar_id);
                         if (insertType.code) {
                              // If the function returns a code as result then we send a json indicating an error
                              res.json({ status: 500, msg: "Une erreur est survenue !" });
                         }
                         else {
                              // If the insertion was successful, get the newly inserted type ID
                              typeId = insertType.insertId;
                         }
                    }
               }
               //The function allows you to return the ID corresponding to the value entered by the user
               //If the value does not exist in the database, it will be created in database and its identifier will be returned (corresponding to the foreign key entered when creating a new project).
               // Try to retrieve the status of the project from the database using the provided label
               const status = await StatusProjectModel.getStatusByStatus(req.body.status_project_id);
               let statusId;
               if (status.code) {
                    // If the function returns a code as result then we send a json indicating an error
                    res.json({ status: 500, msg: "Une erreur est survenue !" });
               }
               else {
                    // If the status already exists, extract its ID
                    if (status.length > 0) {
                         statusId = status[0].id;
                    }
                    else {
                         // If it doesn't exist, insert the new status into the database
                         const insertStatus = await StatusProjectModel.addStatus(req.body.status_project_id);
                         if (insertStatus.code) {
                              // If the function returns a code as result then we send a json indicating an error
                              res.json({ status: 500, msg: "Une erreur est survenue !" });
                         }
                         else {
                              // If the insertion was successful, get the newly inserted type ID
                              statusId = insertStatus.insertId;
                         }
                    }
               }

               //The function allows you to return the ID corresponding to the value entered by the user
               //If the value does not exist in the database, it will be created in database and its identifier will be returned (corresponding to the foreign key entered when creating a new project).
               // Try to retrieve the developer of the project from the database using the provided label
               const dev = await DeveloperModel.getDeveloperByName(req.body.developer_id);
               let developerId;
               if (dev.code) {
                    // If the function returns a code as result then we send a json indicating an error
                    res.json({ status: 500, msg: "Une erreur est survenue !" });
               }
               else {
                    // If the developer already exists, extract its ID
                    if (dev.length > 0) {
                         developerId = dev[0].id;
                    }
                    else {
                         // If it doesn't exist, insert the new developer into the database
                         const insertDev = await DeveloperModel.addDeveloper(req.body.developer_id);
                         if (insertDev.code) {
                              // If the function returns a code as result then we send a json indicating an error
                              res.json({ status: 500, msg: "Une erreur est survenue !" });
                         }
                         else {
                              // If the insertion was successful, get the newly inserted type ID
                              developerId = insertDev.insertId;
                         }
                    }
               }


               //The function allows you to return the ID corresponding to the value entered by the user
               //If the value does not exist in the database, it will be created in database and its identifier will be returned (corresponding to the foreign key entered when creating a new project).
               // Try to retrieve the wind model of the project from the database using the provided label
               const wind = await WindModelModel.getWindByModel(req.body.wind_model_id);
               let windId;
               if (wind.code) {
                    // If the function returns a code as result then we send a json indicating an error
                    res.json({ status: 500, msg: "Une erreur  est survenue !" });
               }
               else {
                    // If the wind model already exists, extract its ID
                    if (wind.length > 0) {
                         windId = wind[0].id;
                    }
                    else {
                         // If it doesn't exist, insert the new wind model into the database
                         const insertWind = await WindModelModel.addWind(req.body.wind_model_id);
                         if (insertWind.code) {
                              // If the function returns a code as result then we send a json indicating an error
                              res.json({ status: 500, msg: "Une erreur est survenue !" });
                         }
                         else {
                              // If the insertion was successful, get the newly inserted type ID
                              windId = insertWind.insertId;
                         }
                    }
               }

               // We check that the updated project exists in the database
               const existingProject = await ProjectModel.getProjectById(req.params.id)
               if (existingProject.code) {
                    // If the function returns a code as result then we send a json indicating an error
                    res.json({ status: 500, msg: "Une erreur est survenue !" })
               }
               else {
                    if (existingProject.length === 0) {
                         // If existingProject do not send a value in return then we send a json indicating that the project is not existing is the database
                         res.json({ status: 500, msg: "Erreur: projet introuvable !" })
                    }
                    else {
                         //Update of the project. An object composed of the informations entered by the user is passed as a parameter of the function
                         const project = await ProjectModel.updateProject({
                              name: req.body.name,
                              city: req.body.city,
                              energy: req.body.energy,
                              type_solar_id: typeId,
                              status_project_id: statusId,
                              developer_id: developerId,
                              wind_model_id: windId,
                              geojson: req.body.geojson
                         }, req.params.id)
                         if (project.code) {
                              console.log(project.code)
                              // If the function returns a code as result then we send a json indicating an error
                              res.json({ status: 500, msg: "Une erreur est survenue !" });
                         }
                         else {
                              return res.json({ status: 200, msg: "Le projet a bien été modifié" });
                         }
                    }
               }
          }
          catch (err) {
               res.json({ status: 500, msg: "Une erreur  est survenue" })
          }
     }



     const deleteProject = async(req, res) => {
          try {
               //We call the function that returns the project existing in the database by its ID
               //We want to make sure that the route id parameter matches a project in the database
               const project = await ProjectModel.getProjectById(req.params.id)
               if (project.code) {
                    // If the function returns a code as result then we send a json indicating an error
                    res.json({ status: 500, msg: "Le projet n'existe pas !" })
               }
               else {
                    const deleteProject = await ProjectModel.deleteProject(req.params.id)

                    if (deleteProject.code) {
                         // If the function returns a code as result then we send a json indicating an error
                         res.json({ status: 500, msg: "Une erreur est survenue!" })
                    }
                    else {
                         res.json({ status: 200, msg: "Le projet a bien été supprimé !" })
                    }
               }
          }
          catch (err) {
               res.json({ status: 500, msg: "Une erreur est survenue!" })
          }
     }



     return {
          getAllProjects,
          getAllProjectsByEnergy,
          getProjectById,
          addProject,
          updateProject,
          deleteProject
     }

}
