import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faLinkedin, faGithub, faXTwitter }  from '@fortawesome/free-brands-svg-icons'


const Footer = () => {

    return (
        <footer className="footer">
            <div>
                <Link to="/"><p>Ener<span>GIS</span></p></Link>
            </div>
            <div className="social-icons">
                <Link to="https://github.com"><FontAwesomeIcon icon={ faGithub } /></Link>
                <Link to="https://linkedin.com"><FontAwesomeIcon icon={ faLinkedin } /></Link>
                <Link to="https://facebook.com"><FontAwesomeIcon icon={ faFacebook } /></Link>
                <Link to="https://twitter.com"><FontAwesomeIcon icon={ faXTwitter } /></Link>
            </div>
         </footer>
    )
}

export default Footer
