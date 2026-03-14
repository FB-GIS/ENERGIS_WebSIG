import { Link } from "react-router-dom"
import GoBackButton from '../../components/GoBackButton';

const Admin = (props) => {
    return (
        <main className="dashboard-main">
            <GoBackButton />
            <section className="dashboard">
                <h1>Dashboard Administrateur</h1>
                <div>
                    <Link to="/users">Utilisateurs</Link>
                </div>
                
                <div>
                    <Link to="/geodatas">Données géographiques et attributaires</Link>
                </div>
            </section>
        </main>
    )
}

export default Admin
