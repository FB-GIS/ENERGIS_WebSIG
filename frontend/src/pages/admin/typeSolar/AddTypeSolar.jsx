import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { validateInputField } from "../../../helpers/Form-validator"
import { addOneTypeSolar, displayTypeSolar } from '../../../api/typeSolar'
import GoBackButton from '../../../components/GoBackButton';


const AddTypeSolar = (props) => {

    const navigate = useNavigate()
    const [type, setType] = useState("")
    const [error, setError] = useState(null)


    //solar project type registration request function
    const addType = (datas) => {
        addOneTypeSolar(datas)
            .then((res) => {
                console.log(res)
                //if the type is properly registered
                if (res.status === 200) {
                    navigate('/typeSolar') // If registration is successful, you will automatically return to the page displaying all types

                }
                else {
                    setError('La valeur saisie existe déjà dans la base de données!')
                }
            })
            .catch(err => console.log(err))
    }

    const saveType = () => {
        //Creation of data object with type entered by user in the form
        const datas = {
            type_project: type,
        }
        addType(datas) //We call the function to save the new type in the database
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

    return <section className="gis-form">
        <GoBackButton />
        <h2>Ajouter un type de projet solaire</h2>
        {error !== null && <p className="error-msg">{error}</p>}
        <form
            onSubmit={onSubmitForm}
        >
            <label htmlFor="type">Type de projet</label>
            <input
                type="text"
                placeholder="type"
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
}

export default AddTypeSolar
