import { useState, useEffect, useRef } from "react"
import { Navigate } from 'react-router-dom'
import { useParams } from "react-router-dom";
import { validateInputField } from "../../../helpers/Form-validator"
import { displayOneProject, updateOneProject } from '../../../api/project'
import { displayStatus } from '../../../api/statusProject'
import { displayTypeSolar } from '../../../api/typeSolar'
import GoBackButton from '../../../components/GoBackButton';


const EditProject = () => {

    const { id } = useParams(); //Retrieve the project id from the URL
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
    const [redirect, setRedirect] = useState(false)

    //References used to move focus to an invalid field after validation.
    const nameRef = useRef()
    const cityRef = useRef()
    const developerRef = useRef()
    const windModelRef = useRef()
    const xCoordRef = useRef()
    const yCoordRef = useRef();


    useEffect(() => {
        //When the component loads, we query the API to fill the <select> fields form
        displayStatus()
            .then((res) => {
                if (res.status === 200) {
                    setStatusOption(res.statusProject)
                }
            })
            .catch(err => console.error("Erreur chargement status:", err))

        displayTypeSolar()
            .then((res) => {
                if (res.status === 200) {
                    setTypeSolarOption(res.type)
                }
            })
            .catch(err => console.error("Erreur chargement type de projet solaire:", err))
    }, [])



    //Update project function
    const updateProject = (datas) => {
        updateOneProject(datas, id)
            .then((res) => {
                console.log(res)
                //if the project is properly updated
                if (res.status === 200) {
                    setRedirect(true) // We trigger the redirection
                }
            })
            .catch(err => console.log(err))
    }

    const saveProject = () => {

        //Create a GeoJSON object for saving geometry from the new coordinates
        const geojson = {
            type: "Point",
            coordinates: [parseFloat(xCoord), parseFloat(yCoord)]
        }
        //Creation of a data object for updating the project from the information provided by the user
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
        updateProject(datas) //We call the API to update the new project in the database
    }



    const onSubmitForm = (e) => {
        e.preventDefault()
        setError(null)

        //Validate all the fields with custom functions
        let errorName = validateInputField("Nom", "project name", name)
        if (errorName !== true) {
            setError(errorName)
            nameRef.current.focus()
            return
        }


        let errorCity = validateInputField("Ville", "project city", city)
        if (errorCity !== true) {
            setError(errorCity)
            cityRef.current.focus()
            return
        }

        if (developer !== "") {
            let errorDeveloper = validateInputField("Développeur", "developer", developer)
            if (errorDeveloper !== true) {
                setError(errorDeveloper)
                developerRef.current.focus()
                return
            }
        }

        if (windModel !== "") {
            let errorWindModel = validateInputField("Type d'éolienne", "wind_model", windModel)
            if (errorWindModel !== true) {
                setError(errorWindModel)
                windModelRef.current.focus()
                return
            }
        }


        let errorX = validateInputField("Longitude", "xcoord", xCoord)
        if (errorX !== true) {
            setError(errorX)
            xCoordRef.current.focus()
            return
        }

        let errorY = validateInputField("Latitude", "ycoord", yCoord)
        if (errorY !== true) {
            setError(errorY)
            yCoordRef.current.focus()
            return
        }

        //If there is no information given by the user in one of these fields we send an error message
        if (name === "" || city === "" || energy === "" || status === "" || xCoord === "" || yCoord === "") {
            setError("Tous les champs ne sont pas encore remplis! Veuillez renseigner les champs: Nom, Ville, Energie, Statut, Longitude, Latitude")
        }
        else {
            saveProject()
        }
    }

    useEffect(() => {
        displayOneProject(id) //Loads project data from its id (URL parameter), and pre-fill the form
            .then((res) => {
                console.log(res)
                setName(res.project[0].name)
                setCity(res.project[0].city)
                setEnergy(res.project[0].energy)
                setType(res.project[0].solar_type)
                setStatus(res.project[0].status)
                setDeveloper(res.project[0].developer_name)
                setWindModel(res.project[0].wind_model)

                const geom = JSON.parse(res.project[0].geom);

                if (geom && geom.type === "Point" && Array.isArray(geom.coordinates)) {
                    setXCoord(geom.coordinates[0].toString());
                    setYCoord(geom.coordinates[1].toString());
                }
            })
            .catch(err => console.log(err))
    }, [])

    if (redirect) {
        return <Navigate to="/projects"/>
    }
    return (

        <section className="gis-form">
        <GoBackButton />
        <h2>Modifier un projet</h2>
        {error !== null && <p className="error-msg">{error}</p>}
        <form
            onSubmit={onSubmitForm}
        >
            <label htmlFor="name">Nom du projet*</label>
            <input
                type="text"
                placeholder="Nom du projet"
                id="name"
                name="name"
                value={name}
                ref = {nameRef}
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
                ref = {cityRef}
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
                id="developer"
                name="developer"
                value={developer}
                ref = {developerRef}
                placeholder="Développeur"
                onChange={(e)=>{
                    setDeveloper(e.currentTarget.value)
                }}
            />
            <label htmlFor="windmodel">Type d'éolienne</label>
            <input
                type="text"
                id="windmodel"
                name="windmodel"
                value={windModel}
                ref = {windModelRef}
                placeholder="Type d'éolienne"
                onChange={(e)=>{
                    setWindModel(e.currentTarget.value)
                }}
            />
            <label htmlFor="longitude">Longitude*</label>
            <input
                type="text"
                id="longitude"
                name="longitude"
                value={xCoord}
                ref = {xCoordRef}
                placeholder="Longitude"
                onChange={(e)=>{
                    setXCoord(e.currentTarget.value)
                }}
            />
            <label htmlFor="latitude">Latitude*</label>
            <input
                type="text"
                id="latitude"
                name="latitude"
                value={yCoord}
                ref = {yCoordRef}
                placeholder="Latitude"
                onChange={(e)=>{
                    setYCoord(e.currentTarget.value)
                }}
            />
            <button className="button">Enregistrer</button>
        </form>
    </section>

    )
}

export default EditProject
