import {useState} from "react"
import {loginUser} from "../../api/user"
import {useNavigate} from "react-router-dom"
import { Link } from "react-router-dom"
import {useDispatch} from "react-redux"
import {connectUser} from "../../redux/userSlice"

const Login = () => {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    //creation of states necessary for receiving login form data
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    
    //form submission function
    const onSubmitForm = (e) => {
        e.preventDefault()
        setError(null)
        
        //We prepare an object with the email and password entered by the user to send it to the API
        const data = {
            email,
            password
        }
        
        loginUser(data)
        .then((res)=>{
            if(res.status === 200){
                //store token in redux storage (this will allow to automatically reconnect the session)
                window.localStorage.setItem("websig-token", res.token)
                //We prepare a complete user object (with token) and store it in Redux via connectUser()
                let newUser = res.user
                newUser.token = res.token
                dispatch(connectUser(newUser))
                navigate("/webmap") //The user is redirected to the WebGIS map
            } else {
                setError(res.msg)
            }
        })
        .catch(err=>console.log(err))
    }
    
    return (
    <section className="login">
        
        <form 
            onSubmit={onSubmitForm}
        >
            <p>Connexion</p>

            <input
                type="email"
                placeholder="Email"
                onChange={(e)=>{
                    setEmail(e.currentTarget.value)
                }}
            />

            <input
                type="password"
                placeholder="mot de passe"
                onChange={(e)=>{
                    setPassword(e.currentTarget.value)
                }}
            />
            <button>Connexion</button>
                    
            <Link to="/register">Vous n'êtes pas encore enregistré ? </Link>

        </form>
        
        {error !== null && <p className="error-msg">{error}</p>}
        
    </section>
    )
}

export default Login