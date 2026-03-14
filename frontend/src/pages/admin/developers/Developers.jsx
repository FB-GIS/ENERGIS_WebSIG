import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteOneDeveloper, displayDevelopers } from "../../../api/developer";
import { confirmAlert } from 'react-confirm-alert';
import GoBackButton from '../../../components/GoBackButton';


const Developers = (props) => {
    const [developer, setDeveloper] = useState([]);  //developer: Array containing all developers retrieved from the API
    const [searchTerm, setSearchTerm] = useState(""); //searchTerm: Text entered by the user to filter the list
    const navigate = useNavigate();

    //Function to delete a user with confirmation
    const onClickDeleteDeveloper = async (id) => {
        
    //Open a confirmation box
     confirmAlert({
          title: "Confirmer la suppression",
          message: "Voulez vous vraiment supprimer ce développeur de projet ? ",
          buttons: [
            {
              label: "Yes", //If "Yes": delete the developer with the API
              onClick: async () => {
        
        try {
            const deleted = await deleteOneDeveloper(id); //We call the API to delete the developer
            if (deleted.status === 200) {
                // Update developers list after delete
                const res = await displayDevelopers();
                if (res.status === 200) {
                    setDeveloper(res.developers);  // Update the developer state
                    navigate('/developers'); //Redirection to the /developers page
                }
            }
        } catch (err) {
            console.log(err);
              }
            }
          },
          {
            label: 'Non', //If "No"
            onClick: () => {} // The box is closed
          }
        ]
      });
    };
  
    
    useEffect(() => {
        displayDevelopers() //We call the API to display all the developers
            .then((res) => {
                if (res.status === 200) {
                    setDeveloper(res.developers);  //Store the result in a state
                }
            })
            .catch(err => console.log(err));
    }, []);
    
    //Filter developers list based on what the user types in the search box
    const searchDeveloper = developer.filter((d) => 
        d.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  

    return (
        <section className="table-developers">
        <GoBackButton />
            <h2>Administration</h2>
            <h3>Développeurs de projets</h3>
            
            <div className="searchBar">
                <input 
                    type="text"
                    placeholder="Recherchez par nom"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            
            <Link to={`/addDeveloper`}>Ajouter un développeur</Link>
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {searchDeveloper.length > 0 ? searchDeveloper.map((d) => (
                        <tr key={d.id}>
                            <td>{d.name}</td>
                            <td>
                                <Link to={`/editDeveloper/${d.id}`}>Modifier</Link> {/* Link to edit page  */}
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onClickDeleteDeveloper(d.id);  // Call the delete function
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

export default Developers;
