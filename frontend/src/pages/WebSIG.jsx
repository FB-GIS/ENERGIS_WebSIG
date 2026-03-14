import { Link } from "react-router-dom"

const WebSIG = (props) =>{
    return (
        <>
        <div className="banner-webgis">
          <h1>Application WebSIG</h1>
        </div>
        
        <main className="container">
            
            <p>Accédez à notre solution de cartographie interactive <br /> dédiée au développement des énergies renouvelables <br />  en France métropolitaine</p>
        
            <section className="description-webgis">
                <article>
                    <h2>Un accès simplifié à l'information géographique</h2>
                    <ul>
                        <li><span className="green-dot-list">•</span>Visualisez l’ensemble des données de notre catalogue en quelques clics</li>
                        <li><span className="green-dot-list">•</span>Superposez plusieurs couches de données pour vos analyses</li>
                        <li><span className="green-dot-list">•</span>Trouvez un lieu ou des coordonnées géographiques en un clic</li>
                        <li><span className="green-dot-list">•</span>Créez et exportez vos propres données et cartographies</li>
                        <li><span className="green-dot-list">•</span>Accédez à des outils de dessin et de mesure</li>
                        <li><span className="green-dot-list">•</span>Géolocalisez votre position dans l'aplication grâce au GPS</li>
                    </ul>
                </article>
                
                <article>
                    <h2>Des données géolocalisées à l'échelle nationale</h2>
                    <ul className="enr-bullets">
                        <li className="wind">Servitudes aéronautiques (Radars, RTBA, SETBA, VOLTAC...etc.)</li>
                        <li className="wind">Données sur l'état de l'éolien</li>
                        <li className="wind">Zones propices à l'éolien</li>
                        <li className="wind">Contraintes techniques (faisceaux hertziens, routes, centrales nucléaires...)</li>
                        <li className="wind solar">Enjeux de biodiversité</li>
                        <li className="wind solar">Enjeux paysagers ett patrimoniaux</li>
                        <li className="wind solar">Réseaux électriques (postes sources, lignes HTA/HTB...)</li>
                        <li className="solar">Urbanisme</li>
                        <li className="solar">Foncier des personnes morales</li>
                        <li className="solar">Base de données PV</li>
                        <li className="solar">Sites Cas 3 (friches industrielles, carrières, mines, délaissés, décharges...)</li>
                        <li className="solar">Friches agricoles</li>
                        <li className="solar">Zones naturelles et sites d'élevages</li>
                    </ul>
                </article>
            </section>
            
            <section className="connexion">
                <div>
                    <Link to="/login">Connectez vous</Link>
                </div>
                
                <p>Vous ne disposez par encore de compte chez nous ?</p>
                
                <div>
                    <Link to="/register">Enregistrez vous</Link>
                </div>
            </section>
        
        
        </main>
        </>
        )

}

export default WebSIG