import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { displayOneUser, updateUser } from "../../api/user";
import GoBackButton from '../../components/GoBackButton';

const DisplayUser = () => {
    const { id } = useParams(); //Retrieves the developer id from the URL
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState(""); // return text (success or error) after modification

    useEffect(() => {
        displayOneUser(id) //Call ajax API to retrieve information of the current user by its ID
            .then((res) => {
                if (res.status === 200) {
                    const userData = res.user[0];
                    // Converting the type field ('admin' or 'user') returned by the backend to the role_id (1 or 2) field expected by the API
                    const role_id = userData.type === "admin" ? 1 : 2;
                    setUser({ ...userData, role_id }); // We manually inject role_id and update the state
                }
            })
            .catch(err => console.log(err));
    }, []);

    // Update role_id in user when admin changes the value of <select> field form
    const handleRoleChange = (e) => {
        setUser({ ...user, role_id: parseInt(e.target.value) });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const userToSend = { ...user } //We make a copy of the user object
        delete userToSend.type; //Remove the unnecessary type field (because the backend doesn't need it) before sending

        updateUser(userToSend, id) //send new user data to the API
            .then((res) => {
                setMessage("Rôle mis à jour avec succès");
            })
            .catch((err) => {
                console.error(err);
                setMessage("Erreur lors de la mise à jour");
            });
    };


    return (
        <section className="gis-form">
            <GoBackButton />
            <h2>Administration</h2>
            <h3>Utilisateur</h3>

              
        {user ? ( 
                <form  onSubmit={handleSubmit}>
                  <label htmlFor="firstname">Prénom</label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={user.firstname}
                    disabled
                  />
            
                  <label htmlFor="lastname">Nom</label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={user.lastname}
                    disabled
                  />
            
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={user.email}
                    disabled
                  />
            
                  <label htmlFor="address">Adresse</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={user.address}
                    disabled
                  />
            
                  <label htmlFor="zipcode">Code postal</label>
                  <input
                    type="text"
                    id="zipcode"
                    name="zipcode"
                    value={user.zipcode}
                    disabled
                  />
            
                  <label htmlFor="city">Ville</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={user.city}
                    disabled
                  />
            
                  <label htmlFor="phone">Téléphone</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={user.phone}
                    disabled
                  />
            
                  <label htmlFor="role">Rôle (modifiable)</label>
                  <select
                    id="role"
                    name="role"
                    value={user.role_id}
                    onChange={handleRoleChange}
                  >
                    <option value={2}>Utilisateur</option>
                    <option value={1}>Administrateur</option>
                  </select>
            
                  <button type="submit" className="button">
                    Mettre à jour le rôle
                  </button>
                </form>
                ) : (
                    <p>Utilisateur introuvable...</p>
                )}       

            {message && <p>{message}</p>}
        </section>
    );
};

export default DisplayUser;
