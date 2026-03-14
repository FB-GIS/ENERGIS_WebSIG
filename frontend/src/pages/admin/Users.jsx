import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser, displayUsers } from "../../api/user";
import { confirmAlert } from 'react-confirm-alert';
import GoBackButton from '../../components/GoBackButton';


const Users = (props) => {
    const [users, setUsers] = useState([]);  // State for storing users list
    const [searchTerm, setSearchTerm] = useState(""); //searchTerm: Text entered by the user to filter the list
    const navigate = useNavigate();

    //Function to delete a user with confirmation
    const onClickDeleteUser = async (id) => {
        
    //Open a confirmation box
     confirmAlert({
          title: "Confirmer la suppression",
          message: "Voulez vous vraiment supprimer cet utilisateur ? ",
          buttons: [
            {
              label: "Yes", //If "Yes": delete the user with the API
              onClick: async () => {
        
        try {
            const deleted = await deleteUser(id); //We call the API to delete the user
            if (deleted.status === 200) {
                 // Update users list after delete
                const res = await displayUsers();
                if (res.status === 200) {
                    setUsers(res.users);  // Update the users state
                    navigate('/users'); //Redirection to the /users page
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
        displayUsers() //We call the API to display all the users
            .then((res) => {
                if (res.status === 200) {
                    setUsers(res.users);  //Store the result in a state
                }
            })
            .catch(err => console.log(err));
    }, []);
    
    
    //Filter users list based on what the user types in the search box
    const searchUser = users.filter((u) => {
        console.log(u.lastname)
        return (
        ( u.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ) ||
        ( u.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ) ||
        ( u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ) ||
        ( u.type?.toLowerCase().includes(searchTerm.toLowerCase()) ) 
        )
    })

    return (
        <section className="table-users">
            <GoBackButton />
            <h2>Administration</h2>
            <h3>Utilisateurs</h3>
            
            <div className="searchBar">
                <input 
                    type="text"
                    placeholder="Recherchez par prénom, nom, email ou role"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Email</th>
                        <th>Rôle</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {searchUser.length > 0 ? searchUser.map((u) => (
                        <tr key={u.id}>
                            <td>{u.firstname}</td>
                            <td>{u.lastname}</td>
                            <td>{u.email}</td>
                            <td>{u.type}</td>
                            <td>
                                <Link to={`/displayUser/${u.id}`}>Afficher</Link> {/* Link to edit page  */}
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onClickDeleteUser(u.id);  // Call the delete function
                                    }}
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="4">Aucun utilisateur trouvé</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    );
};

export default Users;
