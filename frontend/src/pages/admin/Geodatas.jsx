import { Link } from "react-router-dom"
import GoBackButton from '../../components/GoBackButton';

const Geodatas = (props) => {
    return (
        <main className="dashboard-main">
        <GoBackButton />
            <section className="dashboard">
                <h1>Données géographiques</h1>
                <div>
                    <Link to="/projects">Projets</Link>
                </div>
                
                <div>
                    <Link to="/projectAreas">Zones d'étude</Link>
                </div>
                
                <h2>Données attributaires</h2>
                <div>
                    <Link to="/developers">Développeurs</Link>
                </div>
                
                <div>
                    <Link to="/typeSolar">Types de projets solaires</Link>
                </div>
        
                <div>
                    <Link to="/statusProject">Statuts des projets</Link>
                </div>
                
                <div>
                    <Link to="/windModels">Modèles d'éoliennes</Link>
                </div>
            </section>
        </main>
    )

}

export default Geodatas
