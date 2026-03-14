import { useState, useEffect } from "react"
import { Navigate } from 'react-router-dom'
import { useParams } from "react-router-dom";
import { displayOneStatus, updateOneStatus } from '../../../api/statusProject'
import { validateInputField } from "../../../helpers/Form-validator"
import GoBackButton from '../../../components/GoBackButton';


const EditStatusProject = () => {

    const { id } = useParams(); //Retrieves the status id from the URL
    const [status, setStatus] = useState("")
    const [error, setError] = useState(null)
    const [redirect, setRedirect] = useState(false)

    //status information update request function
    const updateStatus = (datas) => {
        updateOneStatus(datas, id)
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

    const saveStatus = () => {
        //Creation of data object with status entered  by user in the form
        const datas = {
            status: status,
        }
        updateStatus(datas) //We call the function to update the current status in the database
    }

    const onSubmitForm = (e) => {
        e.preventDefault()

        let errorName = validateInputField("Nom", "status_project", status) //Validate the status field with a custom function
        if (errorName !== true) {
            setError(errorName) //If validation fails, displays an error
            return
        }

        saveStatus() //Otherwise, run saveStatus() function to send the data
    }

    useEffect(() => {
        displayOneStatus(id)
            .then((res) => {
                console.log(res)
                setStatus(res.statusProject[0].status)
            })
            .catch(err => console.log(err))
    }, [])


    if (redirect) {
        return <Navigate to="/statusProject"/>
    }


    return (

        <section className="gis-form">
        <GoBackButton />
        <h2>Modifier un statut de projet</h2>
        {error !== null && <p className="error-msg">{error}</p>}
        <form
            onSubmit={onSubmitForm}
        >
            <label htmlFor="status">Statut du projet*</label>
            <input
                type="text"
                placeholder="Statut du projet"
                id="status"
                name="status"
                value={status}
                onChange={(e)=>{
                    setStatus(e.currentTarget.value)
                }}
            />

            <button className="button">Enregistrer</button>
        </form>
    </section>

    )
}

export default EditStatusProject
