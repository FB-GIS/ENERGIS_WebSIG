import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteOneProjectArea, displayProjectAreas } from "../../api/projectArea";
import { confirmAlert } from 'react-confirm-alert';
import GoBackButton from '../../components/GoBackButton';


const UserProjectAreas = (props) => {
    const [projectAreas, setprojectAreas] = useState([]);  // State pour stocker la liste des utilisateurs
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    // Function called when clicking "Delete" to delete a user's project area
    const onClickDeleteProjectArea = async (id) => {
    // Confirmation Box
     confirmAlert({
          title: "Confirmer la suppression",
          message: "Voulez vous vraiment supprimer cette zone de projet ? ",
          buttons: [
            {
              label: "Yes",
              onClick: async () => {
        
        try {
            const deleted = await deleteOneProjectArea(id); //API call to delete a user's project area
            if (deleted.status === 200) {
                // Update project area after the delete
                const res = await displayProjectAreas();
                if (res.status === 200) {
                    setprojectAreas(res.project_areas);  // Update the user's project areas list
                    navigate('/userProjectAreas'); //Redirection to the user's project areas list
                }
            }
        } catch (err) {
            console.log(err);
              }
            }
          },
          {
            label: 'Non',
            onClick: () => {} // Do nothing if click on "No"
          }
        ]
      });
    };

    // load user's project areas when the component loads
    useEffect(() => {
        displayProjectAreas()
            .then((res) => {
                if (res.status === 200) {
                    setprojectAreas(res.project_areas);  // Updated state with project areas returned from API
                    console.log(res.project_areas)
                }
            })
            .catch(err => console.log(err));
    }, []);
    
    // Filtering projects according to search
    const searchProjectArea = projectAreas.filter((pa) => {
        return (
        
        ( pa.area?.toString().includes(searchTerm.toLowerCase()) ) ||
        ( pa.comment?.toLowerCase().includes(searchTerm.toLowerCase()) ) ||
        ( pa.author?.toLowerCase().includes(searchTerm.toLowerCase()) ) 
        )
    })

    return (
        <section className="table-user-project-areas">
            <GoBackButton />
            <h2>Administration</h2>
            <h3>Zones d'étude</h3>
            
            <div className="searchBar">
                <input 
                    type="text"
                    placeholder="Recherchez par superficie, commentaire ou auteur"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            
            
            <table>
                <thead>
                    <tr>
                        <th>Superficie (en m2)</th>
                        <th>Commentaire</th>
                        <th>Auteur</th>
                        <th>Coordonnées</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {searchProjectArea.length > 0 ? searchProjectArea.map((pa) => (
                        <tr key={pa.id}>
                            <td>{pa.area}</td>
                            <td>{pa.comment}</td>
                            <td>{pa.author}</td>
                            <td>{pa.geom.substring(0, 25)}</td>
                            <td>
                                <Link to={`/editProjectArea/${pa.id}`}>Modifier</Link> {/* Link to edit page */}
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onClickDeleteProjectArea(pa.id);  // Call the delete function
                                    }}
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="4">Aucune zone de projet trouvée</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    );
};

export default UserProjectAreas;
