import { useState, useEffect } from "react"
import { Navigate } from 'react-router-dom'
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux'
import { selectUser } from "../../redux/userSlice"
import { validateInputField } from "../../helpers/Form-validator"
import { displayOneProjectArea, updateOneProjectArea } from '../../api/projectArea'
import GoBackButton from '../../components/GoBackButton';


const EditProjectArea = () => {

    const userRole = useSelector(selectUser).infos.role //Retrieve the role of the user logged ('admin' or 'user')

    const { id } = useParams(); //Retrieve the project id from the URL
    const [area, setArea] = useState(null)
    const [comment, setComment] = useState("")
    const [geom, setGeom] = useState(null)
    const [redirect, setRedirect] = useState(false)
    const [error, setError] = useState(null)

    //project area information update request function
    const updateProjectArea = (datas) => {
        updateOneProjectArea(datas, id)
            .then((res) => {
                //If successful
                if (res.status === 200) {
                    setRedirect(true) // We trigger the redirection
                }
            })
            .catch(err => console.log(err))
    }

    const saveProjectArea = () => {
        //Creation of data object with area and comment entered  by user in the form
        const datas = {
            area: area,
            comment: comment,
            geojson: JSON.parse(geom)
        }
        console.log(datas)
        updateProjectArea(datas) //We call the function to update the current project area in the database
    }



    const onSubmitForm = (e) => {
        e.preventDefault()
        setError(null)

        //Validate all the fields with custom functions
        let errorArea = validateInputField("Superficie", "area", area)
        if (errorArea !== true) {
            setError(errorArea)
            return
        }

        let errorComment = validateInputField("Commentaire", "comment", comment)
        if (errorComment !== true) {
            setError(errorComment)
            return
        }


        if (area === "" || comment === "") {
            setError("Tous les champs ne sont pas encore remplis!")
        }
        else {
            saveProjectArea()
        }
    }

    useEffect(() => {
        displayOneProjectArea(id) //Loads project area data from its id 
            .then((res) => {
                setArea(res.project_areas[0].area) //Pre-fill the area field
                setComment(res.project_areas[0].comment) //Pre-fill the comment field
                setGeom(res.project_areas[0].geom) //Pre-fill the geometry field
            })
            .catch(err => console.log(err))
    }, [])


    //If the update is confirmed, we redirect to the correct page according to the user's role
    if (redirect) {
        if (userRole === "admin") {
            return <Navigate to="/projectAreas"/>
        }
        else {
            return <Navigate to="/userProjectAreas"/>
        }
    }


    return (<section className="gis-form">
        <GoBackButton />
        <h2>Modifier un projet</h2>
        {error !== null && <p className="error-msg">{error}</p>}
        <form
            onSubmit={onSubmitForm}
        >
            <label htmlFor="area">Superficie (en m2)*</label>
            <input
                type="text"
                placeholder="Superficie"
                id="area"
                name="area"
                value={area}
                onChange={(e)=>{
                    setArea(e.currentTarget.value)
                }}
            />
            <label htmlFor="comment">Commentaire*</label>
            <input
                type="text"
                placeholder="Commentaire"
                id="comment"
                name="comment"
                value={comment}
                onChange={(e)=>{
                    setComment(e.currentTarget.value)
                }}
            />
            <label htmlFor="geometry">Géométrie</label>
            <input
                type="text"
                id="geometry"
                name="geometry"
                value={geom}
                placeholder="Géométrie"
            />
            <button className="button">Enregistrer</button>
        </form>
    </section>)
}

export default EditProjectArea
