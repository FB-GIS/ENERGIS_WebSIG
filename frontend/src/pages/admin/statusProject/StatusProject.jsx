import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteOneStatus, displayStatus } from "../../../api/statusProject";
import { confirmAlert } from 'react-confirm-alert';
import GoBackButton from '../../../components/GoBackButton';


const StatusProject = (props) => {
    const [statusProject, setStatusProject] = useState([]); //statusProject: Array containing all status retrieved from the API
    const navigate = useNavigate();


    //Function to delete a status with confirmation
    const onClickDeleteStatus = async (id) => {
        
    //Open a confirmation box
     confirmAlert({
          title: "Confirmer la suppression",
          message: "Voulez vous vraiment supprimer ce statut ? ",
          buttons: [
            {
              label: "Yes", //If "Yes": delete the status with the API
              onClick: async () => {
        
        try {
            const deleted = await deleteOneStatus(id); //We call the API to delete the status
            if (deleted.status === 200) {
                // Update developers list after delete
                const res = await displayStatus();
                if (res.status === 200) {
                    setStatusProject(res.statusProject);  // Update the status state
                    navigate('/statusProject'); //Redirection to the /statusProject page
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
        displayStatus() //We call the API to display all the statuses
            .then((res) => {
                if (res.status === 200) {
                    setStatusProject(res.statusProject); //Store the result in a state
                }
            })
            .catch(err => console.log(err));
    }, []);
    

    return (
        <section className="table-status-projects">
            <GoBackButton />
            <h2>Administration</h2>
            <h3>Statuts de projets</h3>
            <Link to={`/addStatusProject`}>Ajouter un statut</Link>
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {statusProject.length > 0 ? statusProject.map((s) => (
                        <tr key={s.id}>
                            <td>{s.status}</td>
                            <td>
                                <Link to={`/editStatusProject/${s.id}`}>Modifier</Link> {/* Link to edit page  */}
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onClickDeleteStatus(s.id);  // Call the delete function
                                    }}
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="4">Aucun statut de projet trouvé</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    );
};

export default StatusProject;
