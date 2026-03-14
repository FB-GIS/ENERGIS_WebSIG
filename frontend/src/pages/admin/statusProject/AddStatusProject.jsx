import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { validateInputField } from "../../../helpers/Form-validator"
import { addOneStatus, displayStatus } from '../../../api/statusProject'
import GoBackButton from '../../../components/GoBackButton';


const AddStatusProject = (props) => {

    const navigate = useNavigate()
    const [status, setStatus] = useState("")
    const [error, setError] = useState(null)


    //status project registration request function
    const addStatus = (datas) => {
        addOneStatus(datas)
            .then((res) => {
                console.log(res)
                //if the status is properly registered
                if (res.status === 200) {

                    navigate('/statusProject') // If registration is successful, you will automatically return to the page displaying all status
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
        addStatus(datas) //We call the function to save the new status in the database
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

    return <section className="gis-form">
        <GoBackButton />
        <h2>Ajouter un statut de projet</h2>
        {error !== null && <p className="error-msg">{error}</p>}
        <form
            onSubmit={onSubmitForm}
        >
            <label htmlFor="status">Nom du statut</label>
            <input
                type="text"
                placeholder="Nom"
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
}

export default AddStatusProject
