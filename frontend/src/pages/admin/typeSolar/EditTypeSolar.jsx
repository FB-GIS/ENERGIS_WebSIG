import { useState, useEffect } from "react"
import { Navigate } from 'react-router-dom'
import { useParams } from "react-router-dom";
import { displayOneTypeSolar, updateOneTypeSolar } from '../../../api/typeSolar'
import { validateInputField } from "../../../helpers/Form-validator"
import GoBackButton from '../../../components/GoBackButton';


const EditTypeSolar = () => {

    const { id } = useParams(); //Retrieves the developer id from the URL
    const [type, setType] = useState("")
    const [error, setError] = useState(null)
    const [redirect, setRedirect] = useState(false)

    //solar project type information update request function
    const updateType = (datas) => {
        updateOneTypeSolar(datas, id)
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

    const saveType = () => {
        //Creation of data object with type entered  by user in the form
        const datas = {
            type_project: type,
        }
        updateType(datas) //We call the function to update the current developer in the database
    }

    const onSubmitForm = (e) => {
        e.preventDefault()

        let errorName = validateInputField("Type", "type_project", type) //Validate the type field with a custom function
        if (errorName !== true) {
            setError(errorName) //If validation fails, displays an error
            return
        }

        saveType() //Otherwise, run saveType() function to send the data
    }

    useEffect(() => {
        displayOneTypeSolar(id)
            .then((res) => {
                console.log(res)
                setType(res.type[0].type_project) //Pre-fill the type field
            })
            .catch(err => console.log(err))
    }, [])


    if (redirect) {
        return <Navigate to="/typeSolar"/>
    }


    return (

        <section className="gis-form">
        <GoBackButton />
        <h2>Modifier un statut de projet</h2>
        {error !== null && <p className="error-msg">{error}</p>}
        <form
            onSubmit={onSubmitForm}
        >
            <label htmlFor="type">Type de projet solaire*</label>
            <input
                type="text"
                placeholder="Type de projet"
                id="type"
                name="type"
                value={type}
                onChange={(e)=>{
                    setType(e.currentTarget.value)
                }}
            />

            <button className="button">Enregistrer</button>
        </form>
    </section>

    )
}

export default EditTypeSolar
