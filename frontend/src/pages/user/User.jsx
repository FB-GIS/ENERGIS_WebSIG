import { Link } from "react-router-dom"
import GoBackButton from '../../components/GoBackButton';

const User = (props) => {
    return (
    <main className="dashboard-main">
    <GoBackButton />
        <section className="dashboard">
            <h1>Dashboard Utilisateur</h1>
            <div>
                <Link to="/profile">Profil</Link>
            </div>
            
            <div>
                <Link to="/userProjectAreas">Zones d'étude</Link>
            </div>
        </section>
    </main>
    )
}

export default User
