import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { addOneUser } from "../../api/user"
import { validateInputField } from "../../helpers/Form-validator"

const Register = () => {

    const navigate = useNavigate()
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [firstTryPassword, setFirstTryPassword] = useState("");
    const [password, setPassword] = useState("")
    const [address, setAddress] = useState("")
    const [zipcode, setZipcode] = useState("")
    const [city, setCity] = useState("")
    const [phone, setPhone] = useState("")
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
        e.preventDefault()
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
        
        let errorFirstPsw = validateInputField("Mot de passe", "password", firstTryPassword)
        if (errorFirstPsw !== true) {
            setError(errorFirstPsw)
            firstTryPasswordRef.current.focus()
            return
        }

        let errorPsw = validateInputField("Mot de passe", "password", password)
        if (errorPsw !== true) {
            setError(errorPsw)
            passwordRef.current.focus()
            return
        }
        
        if(password !== firstTryPassword) {
            setError('Les mots de passe ne correspondent pas!');
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
        
        //all non-numeric characters are removed (spaces, dashes, parentheses, etc.), leaving only pure digits
        const digitsPhone = phone.replace(/\D+/g, "");

        //Construction of a data object that contains all the information needed to create a new user in the database
        const datas = {
            firstname,
            lastname,
            email,
            password,
            address,
            zipcode,
            city,
            phone:digitsPhone
        }

        addOneUser(datas) //Call the ajax API to add a new user
            .then((res) => {
                if (res.status === 200) {
                    navigate('/login') //In case of success, redirection to the login page
                }
                else {
                    setError(res.msg)
                }
            })
            .catch(err => console.log(err))
    }

    return <section className="gis-form">
        <h2>S'enregistrer</h2>
        {error !== null && <p className="error-msg">{error}</p>}
        <form
            onSubmit={onSubmitForm}
        >   
            <label htmlFor="firstname">Prénom*</label>
            <input type="text"
                placeholder="Votre prénom"
                id = "firstname"
                name = "firstname"
                ref = {firstnameRef}
                onChange={(e) => {
                    setFirstname(e.currentTarget.value)
                }}
            />
            <label htmlFor="lastname">Nom*</label>
            <input type="text"
                placeholder="Votre nom"
                id = "lastname"
                name = "lastname"
                ref = {lastnameRef}
                onChange={(e) => {
                    setLastname(e.currentTarget.value)
                }}
            />
            <label htmlFor="email">Email*</label>
            <input type="email"
                placeholder="Votre email"
                id="email"
                name="email"
                ref = {emailRef}
                onChange={(e) => {
                    setEmail(e.currentTarget.value)
                }}
            />
            <label htmlFor="password">Mot de passe*</label>
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
            
            <label htmlFor="password">Confirmez le mot de passe*</label>
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
            <label htmlFor="address">Adresse*</label>
            <input type="text"
                placeholder="Votre adresse"
                id="address"
                name="address"
                ref = {addressRef}
                onChange={(e) => {
                    setAddress(e.currentTarget.value)
                }}
            />
            <label htmlFor="zipcode">Code postal*</label>
            <input type="text"
                placeholder="Votre code postal"
                id="zipcode"
                name="zipcode"
                ref = {zipcodeRef}
                onChange={(e) => {
                    setZipcode(e.currentTarget.value)
                }}
            />
            <label htmlFor="city">Ville*</label>
            <input type="text"
                placeholder="Votre ville"
                id="city"
                name="city"
                ref = {cityRef}
                onChange={(e) => {
                    setCity(e.currentTarget.value)
                }}
            />
            <label htmlFor="phone">Téléphone*</label>
            <input type="text"
                placeholder="Votre numéro de téléphone"
                id="phone"
                name="phone"
                ref = {phoneRef}
                onChange={(e) => {
                    setPhone(e.currentTarget.value)
                }}
            />
            <button className="button">Enregistrer</button>
        </form>
    </section>
}

export default Register
