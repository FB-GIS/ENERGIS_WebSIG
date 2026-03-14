import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteOneWindModel, displayWindModel } from "../../../api/windModel";
import { confirmAlert } from 'react-confirm-alert';
import GoBackButton from '../../../components/GoBackButton';


const WindModels = (props) => {
    const [windModel, setWindModel] = useState([]); //windModel: Array containing all wind models retrieved from the API
    const [searchTerm, setSearchTerm] = useState(""); //searchTerm: Text entered by the user to filter the list
    const navigate = useNavigate();

    //Function to delete a model with confirmation
    const onClickDeleteWindModel = async (id) => {
        
    //Open a confirmation box
     confirmAlert({
          title: "Confirmer la suppression",
          message: "Voulez vous vraiment supprimer ce modèle d'éolienne ? ",
          buttons: [
            {
              label: "Yes", //If "Yes": delete the model with the API
              onClick: async () => {
        
        try {
            const deleted = await deleteOneWindModel(id); //We call the API to delete the model
            if (deleted.status === 200) {
                // Update developers list after delete
                const res = await displayWindModel();
                if (res.status === 200) {
                    setWindModel(res.windmodels);  // Update the model state
                    navigate('/windModels'); //Redirection to the /windModels page
                }
            }
        } catch (err) {
            console.log(err);
              }
            }
          },
          {
            label: 'Non', //If "No"
            onClick: () => {} //  The box is closed
          }
        ]
      });
    };
    
    
    
    useEffect(() => {
        displayWindModel() //We call the API to display all the models
            .then((res) => {
                if (res.status === 200) {
                    setWindModel(res.windmodels);  //Store the result in a state
                }
            })
            .catch(err => console.log(err));
    }, []);
    
    //Filter wind models list based on what the user types in the search box
    const searchWindModel = windModel.filter((w) => 
        w.model?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <section className="table-wind-models">
            <GoBackButton />
            <h2>Administration</h2>
            <h3>Modèle d'éolienne</h3>
            
            <div className="searchBar">
                <input 
                    type="text"
                    placeholder="Recherchez par modèle"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            
            <Link to={`/addWindModel`}>Ajouter un modèle d'éolienne</Link>
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {searchWindModel.length > 0 ? searchWindModel.map((w) => (
                        <tr key={w.id}>
                            <td>{w.model}</td>
                            <td>
                                <Link to={`/editWindModel/${w.id}`}>Modifier</Link> {/* Link to edit page */}
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onClickDeleteWindModel(w.id);  // Call the delete function
                                    }}
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="4">Aucun développeur de projets trouvé</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    );
};

export default WindModels;
