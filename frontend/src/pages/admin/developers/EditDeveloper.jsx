import { useState, useEffect } from "react"
import { Navigate } from 'react-router-dom'
import { useParams } from "react-router-dom";
import { displayOneDeveloper, updateOneDeveloper } from '../../../api/developer'
import { validateInputField } from "../../../helpers/Form-validator"
import GoBackButton from '../../../components/GoBackButton';


const EditDeveloper = () => {

    const { id } = useParams(); //Retrieves the developer id from the URL
    const [name, setName] = useState("")
    const [error, setError] = useState(null)
    const [redirect, setRedirect] = useState(false)

    //developer information update request function
    const updateDeveloper = (datas) => {
        updateOneDeveloper(datas, id)
            .then((res) => {
                console.log(res)
                //If successful
                if (res.status === 200) {
                    setRedirect(true) // We trigger the redirection
                }
                else {
                    setError('La valeur saisie existe déjà dans la base de données!')
                }
            })
            .catch(err => console.log(err))
    }

    const saveDeveloper = () => {
        //Creation of data object with name entered  by user in the form
        const datas = {
            name: name,
        }
        updateDeveloper(datas) //We call the function to update the current developer in the database
    }

    const onSubmitForm = (e) => {
        e.preventDefault()

        let errorName = validateInputField("Nom", "developer", name) //Validate the name field with a custom function
        if (errorName !== true) {
            setError(errorName) //If validation fails, displays an error
            return
        }

        saveDeveloper() //Otherwise, run saveDeveloper() function to send the data
    }

    useEffect(() => {
        displayOneDeveloper(id)
            .then((res) => {
                console.log(res)
                setName(res.developer[0].name) //Pre-fill the name field
            })
            .catch(err => console.log(err))
    }, [])


    if (redirect) {
        return <Navigate to="/developers"/>
    }


    return (

        <section className="gis-form">
        <GoBackButton />
        <h2>Modifier un développeur de projet</h2>
        {error !== null && <p className="error-msg">{error}</p>}
        <form
            onSubmit={onSubmitForm}
        >
            <label htmlFor="name">Nom du développeur*</label>
            <input
                type="text"
                placeholder="Nom du développeur"
                id="name"
                name="name"
                value={name}
                onChange={(e)=>{
                    setName(e.currentTarget.value)
                }}
            />

            <button className="button">Enregistrer</button>
        </form>
    </section>

    )
}

export default EditDeveloper
