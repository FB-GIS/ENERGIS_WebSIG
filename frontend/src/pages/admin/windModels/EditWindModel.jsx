import { useState, useEffect } from "react"
import { Navigate } from 'react-router-dom'
import { useParams } from "react-router-dom";
import { displayOneWindModel, updateOneWindModel } from '../../../api/windModel'
import { validateInputField } from "../../../helpers/Form-validator"
import GoBackButton from '../../../components/GoBackButton';


const EditWindModel = () => {

    const { id } = useParams(); //Retrieves the developer id from the URL
    const [model, setModel] = useState("")
    const [error, setError] = useState(null)
    const [redirect, setRedirect] = useState(false)

    //wind model information update request function
    const updateModel = (datas) => {
        updateOneWindModel(datas, id)
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

    const saveModel = () => {
        //Creation of data object with model entered  by user in the form
        const datas = {
            model: model,
        }
        updateModel(datas) //We call the function to update the current developer in the database
    }

    const onSubmitForm = (e) => {
        e.preventDefault()

        let errorName = validateInputField("Modèle", "wind_model", model) //Validate the model field with a custom function
        if (errorName !== true) {
            setError(errorName) //If validation fails, displays an error
            return
        }

        saveModel() //Otherwise, run saveModel() function to send the data
    }

    useEffect(() => {
        displayOneWindModel(id)
            .then((res) => {
                console.log(res)
                setModel(res.windmodel[0].model) //Pre-fill the model field
            })
            .catch(err => console.log(err))
    }, [])


    if (redirect) {
        return <Navigate to="/windModels"/>
    }


    return (

        <section className="gis-form">
        <GoBackButton />
        <h2>Modifier un modèle d'éolienne</h2>
        {error !== null && <p className="error-msg">{error}</p>}
        <form
            onSubmit={onSubmitForm}
        >
            <label htmlFor="model">Modèle d'éolienne*</label>
            <input
                type="text"
                placeholder="Modèle"
                id="model"
                name="model"
                value={model}
                onChange={(e)=>{
                    setModel(e.currentTarget.value)
                }}
            />

            <button className="button">Enregistrer</button>
        </form>
    </section>

    )
}

export default EditWindModel
