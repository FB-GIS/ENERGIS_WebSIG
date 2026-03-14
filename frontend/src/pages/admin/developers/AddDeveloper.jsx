import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { validateInputField } from "../../../helpers/Form-validator"
import { addOneDeveloper, displayDevelopers } from '../../../api/developer'
import GoBackButton from '../../../components/GoBackButton';


const AddDeveloper = (props) => {

    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [error, setError] = useState(null)


    //project developer registration request function
    const addDeveloper = (datas) => {
        addOneDeveloper(datas)
            .then((res) => {
                console.log(res)
                //if the developer is properly registered
                if (res.status === 200) {
                    navigate('/developers') // If registration is successful, you will automatically return to the page displaying all developers
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
        addDeveloper(datas) //We call the function to save the new developer in the database
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

    return <section className="gis-form">
        <GoBackButton />
        <h2>Ajouter un développeur de projet</h2>
        {error !== null && <p className="error-msg">{error}</p>}
        <form
            onSubmit={onSubmitForm}
        >
            <label htmlFor="name">Nom du développeur</label>
            <input
                type="text"
                placeholder="Nom"
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
}

export default AddDeveloper
