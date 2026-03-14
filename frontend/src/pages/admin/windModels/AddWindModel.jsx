import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { validateInputField } from "../../../helpers/Form-validator"
import { addOneWindModel, displayWindModel } from '../../../api/windModel'
import GoBackButton from '../../../components/GoBackButton';


const AddWindModel = (props) => {

    const navigate = useNavigate()
    const [model, setModel] = useState("")
    const [error, setError] = useState(null)


    //wind model registration request function
    const addModel = (datas) => {
        addOneWindModel(datas)
            .then((res) => {
                console.log(res)
                //if the model is properly registered
                if (res.status === 200) {
                    navigate('/windModels') // If registration is successful, you will automatically return to the page displaying all models

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
        addModel(datas) //We call the function to save the new model in the database
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

    return <section className="gis-form">
        <GoBackButton />
        <h2>Ajouter un modèle d'éolienne</h2>
        {error !== null && <p className="error-msg">{error}</p>}
        <form
            onSubmit={onSubmitForm}
        >
            <label htmlFor="model">Modèle</label>
            <input
                type="text"
                placeholder="modèle"
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
}

export default AddWindModel
