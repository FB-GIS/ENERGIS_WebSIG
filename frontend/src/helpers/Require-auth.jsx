import {useState,useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
//import redux actions to automatically reconnect the user
import {selectUser, connectUser} from "../redux/userSlice"
import {Navigate, useParams} from "react-router-dom"
import {checkMyToken} from "../api/user"


const RequireAuth = (props) => {
    // we retrieve the parameters of our routes
    const params = useParams()
    // we retrieve the user state in the store
    const user = useSelector(selectUser)

    //we are preparing the dispatch functionality for automatic reconnection
    const dispatch = useDispatch()
    //we retrieve the component that was passed as props from the router
    const Child = props.child
    //redirection management
    const [redirect, setRedirect] = useState(false)
    const [redirectAdmin, setRedirectAdmin] = useState(false)
    
    useEffect(()=>{
        //we will test if we are connected by the redux store information
        //if user is not connected
        if(user.isLogged === false){
            //we retrieve the token from storage
            const token = window.localStorage.getItem("websig-token")
            //if the storage responds null (not found) and the auth props is true (protected route)
            if(token === null && props.auth) {
                //access refused to the route
                setRedirect(true)
            } else {
                //if token is not null
                if(token !== null) {
                    //We call the ajax request which will check the token in the backend
                    checkMyToken()
                    .then((res)=>{
                        //If the response is not 200 (positive)
                        if(res.status !== 200) {
                            //if the route in not protected
                            if(props.auth){
                                //access refused to the route
                                setRedirect(true)
                            }
                        } else {
                            //We managed to retrieve the user's information to reconnect
                            //we store the response of the ajax request
                            let myUser = res.user
                            //we add the token in Redux store
                            myUser.token = token
                            //call of user login action in redux store
                            dispatch(connectUser(myUser))
                            //we check if the requested route is admin and its role is admin
                            if(myUser.role !== "admin" && props.admin){
                                //redirection
                                setRedirectAdmin(true)
                            }
                        }
                    })
                    .catch(err=>console.log(err))
                }
            }
        } else {
            //a user is logged in to the redux store
            //if user is not admin
            if(user.infos.role !== "admin"){
                //if the props admin is true (protected admin route)
                if(props.admin){
                    //redirection
                    setRedirectAdmin(true)
                }
            }
        }
        
    },[props])
    
    if(redirect){
        return <Navigate to="/login"/>
    }
    if(redirectAdmin){
        return <Navigate to="/"/>
    }
    return <Child {...props} params={params} />
}

export default RequireAuth