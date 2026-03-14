import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { validateInputField } from "../../../helpers/Form-validator"
import { addOneProject, displayProjects } from '../../../api/project'
import { displayStatus } from '../../../api/statusProject'
import { displayTypeSolar } from '../../../api/typeSolar'
import GoBackButton from '../../../components/GoBackButton';


const AddProject = (props) => {

    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [city, setCity] = useState("")
    const [energy, setEnergy] = useState("")
    const [type, setType] = useState("")
    const [status, setStatus] = useState("")
    const [developer, setDeveloper] = useState("")
    const [windModel, setWindModel] = useState("")
    const [statusOption, setStatusOption] = useState([])
    const [typeSolarOption, setTypeSolarOption] = useState([])
    const [xCoord, setXCoord] = useState("")
    const [yCoord, setYCoord] = useState("")
    const [error, setError] = useState(null)


    useEffect(() => {

        displayStatus() //We call the API to retrieve the list of project statuses
            .then((res) => {
                if (res.status === 200) {
                    setStatusOption(res.statusProject) //Stores the result in a state (will be used later in a form drop-down menu)
                }
            })
            .catch(err => console.error("Erreur chargement status:", err))

        displayTypeSolar() //We call the API to retrieve the list of project types
            .then((res) => {
                if (res.status === 200) {
                    setTypeSolarOption(res.type) //Stores the result in a state (will be used later in a form drop-down menu)
                }
            })
            .catch(err => console.error("Erreur chargement type de projet solaire:", err))
    }, [])


    //project registration request function
    const addProject = (datas) => {
        addOneProject(datas)
            .then((res) => {
                console.log(res)
                //if the project is properly registered
                if (res.status === 200) {
                    navigate('/projects') //Redirection the projects list page
                }
            })
            .catch(err => console.log(err))
    }

    const saveProject = () => {

        //Create a GeoJSON object for saving geometry from the coordinates
        const geojson = {
            type: "Point",
            coordinates: [parseFloat(xCoord), parseFloat(yCoord)]
        }

        //Creation of a data object for saving the project from the information provided by the user
        const datas = {
            name: name,
            city: city,
            energy: energy,
            type_solar_id: type,
            status_project_id: status,
            developer_id: developer,
            wind_model_id: windModel,
            geojson: geojson
        }
        addProject(datas) //We call the API to save the new project in the database
    }

    const onSubmitForm = (e) => {
        e.preventDefault()
        setError(null)

        //Validate all the fields with custom functions

        let errorName = validateInputField("Nom", "project name", name)
        if (errorName !== true) {
            setError(errorName)
            return
        }


        let errorCity = validateInputField("Ville", "project city", city)
        if (errorCity !== true) {
            setError(errorCity)
            return
        }


        let errorX = validateInputField("Longitude", "xcoord", xCoord)
        if (errorX !== true) {
            setError(errorX)
            return
        }

        let errorY = validateInputField("Latitude", "ycoord", yCoord)
        if (errorY !== true) {
            setError(errorY)
            return
        }

        //If there is no information given by the user in one of these fields we send an error message
        if (name === "" || city === "" || energy === "" || status === "" || xCoord === "" || yCoord === "") {
            setError("Tous les champs ne sont pas encore remplis! Veuillez renseigner les champs: Energie, Ville, Energie, Statut, Longitude, Latitude")
        }
        else {
            saveProject()
        }
    }

    return <section className="gis-form">
        <GoBackButton />
        <h2>Ajouter un projet</h2>
        {error !== null && <p className="error-msg">{error}</p>}
        <form
            onSubmit={onSubmitForm}
        >
            <label htmlFor="name">Nom du projet*</label>
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
            
            <label htmlFor="city">Ville*</label>
            <input
                type="text"
                placeholder="Ville"
                id="city"
                name="city"
                value={city}
                onChange={(e)=>{
                    setCity(e.currentTarget.value)
                }}
            />
            <select
                value={energy}
                onChange={(e) => setEnergy(e.target.value)}
            >
                <option value="">-- Choisir le type d'énergie* --</option>
                <option value="WIND">Éolien</option>
                <option value="SOLAR">Solaire</option>
            </select>
            <select
                value={type}
                onChange={(e) => setType(e.target.value)}
            >
                <option value="">-- Choisir le type de projet solaire --</option>
                {typeSolarOption.map((t) => (
                    <option key={t.id} value={t.type_project}>{t.type_project}</option>
                ))}
            </select>
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                <option value="">-- Choisir le statut de projet*--</option>
                {statusOption.map((s) => (
                    <option key={s.id} value={s.status}>{s.status}</option>
                ))}
            </select>
            
            <label htmlFor="developer">Développeur</label>
            <input
                type="text"
                placeholder="Développeur"
                id="developer"
                name="developer"
                value={developer}
                onChange={(e)=>{
                    setDeveloper(e.currentTarget.value)
                }}
            />
            
            <label htmlFor="windmodel">Type d'éolienne</label>
            <input
                type="text"
                placeholder="Type d'éolienne"
                id="windmodel"
                name="windmodel"
                value={windModel}
                onChange={(e)=>{
                    setWindModel(e.currentTarget.value)
                }}
            />
            
            <label htmlFor="longitude">Longitude*</label>
            <input
                type="text"
                placeholder="Longitude"
                id="longitude"
                name="longitude"
                value={xCoord}
                onChange={(e)=>{
                    setXCoord(e.currentTarget.value)
                }}
            />
            
            <label htmlFor="latitude">Latitude*</label>
            <input
                type="text"
                placeholder="Latitude"
                id="latitude"
                name="latitude"
                value={yCoord}
                onChange={(e)=>{
                    setYCoord(e.currentTarget.value)
                }}
            />
            <button className="button">Enregistrer</button>
        </form>
    </section>
}

export default AddProject
