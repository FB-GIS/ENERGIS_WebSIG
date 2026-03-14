import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteOneProject, displayProjects } from "../../../api/project";
import { confirmAlert } from 'react-confirm-alert';
import GoBackButton from '../../../components/GoBackButton';


const Projects = (props) => {
    const [project, setProject] = useState([]);  // State for storing projects list
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    // Function called when clicking "Delete" to delete a project
    const onClickDeleteProject= async (id) => {
    // Confirmation Box
     confirmAlert({
          title: "Confirmer la suppression",
          message: "Voulez vous vraiment supprimer ce projet ? ",
          buttons: [
            {
              label: "Yes",
              onClick: async () => {
        
        try {
            const deleted = await deleteOneProject(id); //API call to delete a project
            if (deleted.status === 200) {
                // Update projects after the delete
                const res = await displayProjects();
                if (res.status === 200) {
                    setProject(res.projects);  
                    navigate('/projects'); //Redirection to the projects list
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

    // load projects when the component loads
    useEffect(() => {
        displayProjects()
            .then((res) => {
                if (res.status === 200) {
                    setProject(res.projects);  // Updated state with projects returned from API
                }
            })
            .catch(err => console.log(err));
    }, []);
    
    
    // Filtering projects according to search
    const searchProject = project.filter((p) => {
        return (
        ( p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ) ||
        ( p.city?.toLowerCase().includes(searchTerm.toLowerCase()) ) ||
        ( p.energy?.toLowerCase().includes(searchTerm.toLowerCase()) ) 
        )
    })



    return (
        <section className="table-projects">
            <GoBackButton />
            <h2>Administration</h2>
            <h3>Projets</h3>
            
            <div className="searchBar">
                <input 
                    type="text"
                    placeholder="Recherchez par nom, ville ou énergie"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            
            
            <Link to={`/addProject`}>Ajouter un projet</Link>
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Ville</th>
                        <th>Energie</th>
                        <th>Coordonnées</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {searchProject.length > 0 ? searchProject.map((p) => (
                        <tr key={p.id}>
                            <td>{p.name ? p.name.substring(0, 25) : "NULL"}</td>
                            <td>{p.city ? p.city : "NULL"}</td>
                            <td>{p.energy}</td>
                            <td>{p.geom ? p.geom.substring(0, 25) : "NULL"}</td>
                            <td>
                                <Link to={`/editProject/${p.id}`}>Modifier</Link> {/* Link to edit page  */}
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onClickDeleteProject(p.id);  // Call the delete function
                                    }}
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="4">Aucun projet trouvé</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    );
};

export default Projects;
