import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteOneTypeSolar, displayTypeSolar } from "../../../api/typeSolar";
import { confirmAlert } from 'react-confirm-alert';
import GoBackButton from '../../../components/GoBackButton';


const TypeSolar = (props) => {
    const [typeSolar, setTypeSolar] = useState([]); //typeSolar: Array containing all solar projects types retrieved from the API
    const navigate = useNavigate();


    //Function to delete a type with confirmation
    const onClickDeleteTypeSolar = async (id) => {
        
    //Open a confirmation box
     confirmAlert({
          title: "Confirmer la suppression",
          message: "Voulez vous vraiment supprimer ce type de projet ? ",
          buttons: [
            {
              label: "Yes", //If "Yes": delete the type with the API
              onClick: async () => {
        
        try {
            const deleted = await deleteOneTypeSolar(id); //We call the API to delete the type
            if (deleted.status === 200) {
                // Update developers list after delete
                const res = await displayTypeSolar();
                if (res.status === 200) {
                    setTypeSolar(res.type);  // Update the type state
                    navigate('/typeSolar'); //Redirection to the /typeSolar page
                }
            }
        } catch (err) {
            console.error(err);
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
        displayTypeSolar() //We call the API to display all the types
            .then((res) => {
                if (res.status === 200) {
                    setTypeSolar(res.type); //Store the result in a state
                }
            })
            .catch(err => console.log(err));
    }, []);
    


    return (
        <section className="table-type-solar">
            <GoBackButton />
            <h2>Administration</h2>
            <h3>Types de projets solaires</h3>
            <Link to={`/addTypeSolar`}>Ajouter un type de projet solaire</Link>
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {typeSolar.length > 0 ? typeSolar.map((t) => (
                        <tr key={t.id}>
                            <td>{t.type_project}</td>
                            <td>
                                <Link to={`/editTypeSolar/${t.id}`}>Modifier</Link> {/* Link to edit page */}
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onClickDeleteTypeSolar(t.id);  // Call the delete function
                                    }}
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="4">Aucun type de projets trouvé</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    );
};

export default TypeSolar;
