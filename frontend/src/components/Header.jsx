import { Link, useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEarthEurope, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from "react-redux"
import { selectUser, logoutUser } from "../redux/userSlice"



const Header = () => {
    
    const [menuOpen, setMenuOpen] =  useState(false); //determine whether the burger menu is open (true or false)
    const location = useLocation(); //contains the current URL (React Router object)
    const isHome = location.pathname == "/"; //boolean that is true if the user is on page / (welcome page)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    
    //function that allow to manage the opening/closing of the burger menu
    const toggleMenu = () => {
        setMenuOpen(open => !open) //Inverts the current value of menuOpen
    }

    const logout = async(e) => {
        e.preventDefault();
        window.localStorage.removeItem("websig-token"); //Delete the session token in localStorage
        dispatch(logoutUser()); ////Dispatch a Redux action (userSlice) to reset the user state (logoutUser).
        navigate('/')
    }
    

    return (
        <header className={isHome ? "header header-home" : "header"}>
          <div className="top-bar">
            <div className="logo">
              <Link to="/"><p>Ener<span>GIS</span></p></Link>
            </div>    
        
            <div className="burger-menu" onClick={toggleMenu}>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        
        
          <nav className={menuOpen ? "open" : ""}>
            { user.isLogged === false ? (
              <div className="list1">
                <Link to="/">Accueil</Link>
                <Link to="/geomatique">La géomatique</Link>
                <Link to="/sigenr">SIG & EnR</Link>
                <Link to="/websig">WebSIG</Link>
                <Link to="/login">Connexion</Link>
                <Link to="/contact">Contact</Link>
              </div>
            ) : (
              <div className="list2">
                <Link to="/webmap"><FontAwesomeIcon icon={ faEarthEurope } />Carte</Link>
                {user.infos.role === "admin" ? 
                  <Link to="/admin"><FontAwesomeIcon icon={ faUser } />Admin</Link>
                :
                  <Link to="/user"><FontAwesomeIcon icon={ faUser } />{ user.infos.lastname.toUpperCase() }</Link>
                }
                <Link to="#" onClick={ logout }><FontAwesomeIcon icon={ faRightFromBracket } />Déconnexion</Link>
              </div>
            )}
          </nav>
        </header>
    )
}

export default Header
