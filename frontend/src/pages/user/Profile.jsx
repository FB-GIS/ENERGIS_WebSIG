import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, connectUser } from "../../redux/userSlice";
import { updateUser, checkMyToken } from "../../api/user";
import { validateInputField } from "../../helpers/Form-validator"
import GoBackButton from '../../components/GoBackButton';

const Profile = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [firstTryPassword, setFirstTryPassword] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [zipcode, setZipcode] = useState(0);
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState(0);
    const [msg, setMsg] = useState(null);
    const [error, setError] = useState(null)

    //References used to move focus to an invalid field after validation.
    const firstnameRef = useRef()
    const lastnameRef = useRef()
    const emailRef = useRef()
    const firstTryPasswordRef = useRef()
    const passwordRef = useRef()
    const addressRef = useRef();
    const zipcodeRef = useRef();
    const cityRef = useRef();
    const phoneRef = useRef();

    const onSubmitForm = (e) => {
        e.preventDefault();
        setError(null)

        //Validate all the fields with custom functions
        let errorFirstname = validateInputField("Prénom", "firstname", firstname)
        if (errorFirstname !== true) {
            setError(errorFirstname)
            firstnameRef.current.focus()
            return
        }

        let errorLastname = validateInputField("Nom", "name", lastname)
        if (errorLastname !== true) {
            setError(errorLastname)
            lastnameRef.current.focus()
            return
        }

        let errorEmail = validateInputField("Email", "email", email)
        if (errorEmail !== true) {
            setError(errorEmail)
            emailRef.current.focus()
            return
        }

        let errorAddress = validateInputField("Adresse", "address", address)
        if (errorAddress !== true) {
            setError(errorAddress)
            addressRef.current.focus()
            return
        }


        let errorZipcode = validateInputField("Code postal", "zipcode", zipcode)
        if (errorZipcode !== true) {
            setError(errorZipcode)
            zipcodeRef.current.focus()
            return
        }


        let errorCity = validateInputField("Ville", "city", city)
        if (errorCity !== true) {
            setError(errorCity)
            cityRef.current.focus()
            return
        }


        let errorPhone = validateInputField("Téléphone", "phone", phone)
        if (errorPhone !== true) {
            setError(errorPhone)
            phoneRef.current.focus()
            return
        }
        

        if (password.trim() !== "") {
            let errorPsw = validateInputField("Mot de passe", "password", password);
            if (errorPsw !== true) {
                setError(errorPsw);
                passwordRef.current.focus()
                return;
            }
        }


        if (password !== firstTryPassword) {
            setError('Les mots de passe ne correspondent pas!');
            firstTryPasswordRef.current.focus()
            return
        }


        //all non-numeric characters are removed (spaces, dashes, parentheses, etc.), leaving only pure digits
        const digitsPhone = phone.replace(/\D+/g, "");

        //Construction of a data object that contains all the information needed to update the user profile
        const datas = {
            firstname,
            lastname,
            email,
            address,
            zipcode,
            city,
            phone: digitsPhone,
            password: password.trim() !== "" ? password : undefined, //If the user entered a password (after removing spaces with .trim()), then we send it, otherwise, we put nothing (undefined)
            role_id: role
        };



        updateUser(datas, user.infos.id) //Call the ajax API to update the profile of the logged user
            .then((res) => {
                if (res.status !== 200) {
                    setMsg("Erreur lors de la modification !");
                }
                else {
                    //Fetching the new token and updating Redux
                    checkMyToken()
                        .then((res) => {
                            const token = window.localStorage.getItem("websig-token"); //The authentication token is retrieved from localStorage
                            //We prepare a complete user object (with token) and store it in Redux via connectUser()
                            let newUser = res.user;
                            newUser.token = token;
                            dispatch(connectUser(newUser));
                            setMsg("Profil modifié avec succès !");
                        })
                        .catch((err) => console.log(err));
                }
            })
            .catch((err) => console.log(err));
    };

    //Pre-fill the form
    useEffect(() => {
        setFirstname(user.infos.firstname);
        setLastname(user.infos.lastname);
        setEmail(user.infos.email);
        setAddress(user.infos.address);
        setZipcode(user.infos.zipcode);
        setCity(user.infos.city);
        setPhone(user.infos.phone);
        setRole(user.infos.role === "admin" ? 1 : 2);
    }, [user]);

    return (
        <section className="gis-form">
        <GoBackButton />
        <h2>Mon profil</h2>
        {msg && <p className="form-msg">{msg}</p>}
        {error !== null && <p className="error-msg">{error}</p>}
        <form 
              onSubmit={onSubmitForm}
        >
            <label htmlFor="firstname">Prénom</label>
            <input
                type="text" 
                placeholder="Prénom" 
                id="firstname"
                name="firstname"
                value={firstname}
                ref = {firstnameRef}
                onChange={(e) => 
                    setFirstname(e.target.value)} 
            />
            
            <label htmlFor="lastname">Nom</label>
            <input 
                type="text" 
                placeholder="Nom"
                id="lastname"
                name="lastname"
                value={lastname}
                ref = {lastnameRef}
                onChange={(e) => 
                    setLastname(e.target.value)} 
            />
            
            <label htmlFor="email">Email</label>
            <input
                type="email" 
                placeholder="Email"
                id="email"
                name="email"
                value={email}
                ref = {emailRef}
                onChange={(e) => 
                    setEmail(e.target.value)} 
            />
            
            <label htmlFor="address">Adresse</label>
            <input
                type="text" 
                placeholder="Adresse"
                id="address"
                name="address"
                value={address}
                ref = {addressRef}
                onChange={(e) => 
                    setAddress(e.target.value)} 
            />
            
            <label htmlFor="zipcode">Code postal</label>
            <input
                type="number" 
                placeholder="Code postal"
                id="zipcode"
                name="zipcode"
                value={zipcode}
                ref = {zipcodeRef}
                onChange={(e) => 
                    setZipcode(e.target.value)} 
            />
            
            <label htmlFor="city">Ville</label>
            <input
                type="text" 
                placeholder="Ville"
                id="city"
                name="city"
                value={city}
                ref = {cityRef}
                onChange={(e) => 
                    setCity(e.target.value)} 
            />
            
            <label htmlFor="phone">Téléphone</label>
            <input
                type="text" 
                placeholder="Téléphone"
                id="phone"
                name="phone"
                value={phone} 
                ref = {phoneRef}
                onChange={(e) => 
                    setPhone(e.target.value)} 
            />
            
            <p>Optionnel: Modification du mot de passe (si souhaité)</p>
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              placeholder="Mot de passe"
              id="password"
              name="password"
              value={firstTryPassword}
              ref = {firstTryPasswordRef}
              onChange={(e) => 
                setFirstTryPassword(e.target.value)}
            />
            
            <label htmlFor="password">Confirmez le mot de passe</label>
            <input
              type="password"
              placeholder="Mot de passe"
              id="password"
              name="password"
              value={password}
              ref = {passwordRef}
              onChange={(e) => 
                setPassword(e.target.value)}
            />
        <button className="button">Enregistrer</button>
      </form>
    </section>
    );
};

export default Profile;
