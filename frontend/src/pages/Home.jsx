import { Link } from "react-router-dom"

const Home = (props) => {
    return (
    <>
        <div className="banner-home">
          <h1>
            La géomatique<br />
            au service des<br />
            <span className="dynamic-text">énergies renouvelables</span>
          </h1>
        </div>
        
        <main className="container">
        
            <section className="introduction">
                <h2><span>EnerGIS</span><br /> expert en géomatique</h2>
                <p>EnerGIS est un bureau d'étude spécialisé dans le traitement de l'information géographique.</p>
                <p>A partir de technologies SIG, nous vous offrons la capacité de cibler les meilleurs sites pour vos implantations de centrales photovoltaïques ou éoliennes.</p>
            </section>
            
            <section className="prestation"> 
            
            
                <h2>Prestations</h2>
                
                <div>
                    <article>
                        <figure>
                            <img src="/images/home/gis.jpg" alt="Image orthophoto avec bati 3D" className="img-article" />
                            <figcaption>
                                Système d'information géographique
                            </figcaption>
                        </figure>
                        <p>Discipline au croisement de la géographie et de l'informatique, la géomatique permet de collecter, traiter, analyser et diffuser des données à caractère spatial.</p>
                        <Link to="/Geomatique" className="button">En savoir plus</Link>
                    </article>
                    
                    <article>
                        <figure>
                            <img src="/images/home/solar_panel.jpg" alt="Panneaux phovoltaïques" className="img-article" />
                            <figcaption>
                                SIG <br /> & <br /> énergies renouvelables
                            </figcaption>
                        </figure>
                        <p>Le SIG s'applique à l'ensemble du cycle de vie d'un projet photovoltaïque ou éolien, de la phase de prospection à l'obtention de permis de construire</p>
                        <Link to="/sigenr" className="button">En savoir plus</Link>
                    </article>
                    
                    <article>
                        <figure>
                            <img src="/images/home/webmapping.jpg" alt="Réseaux sur la surface de la Terre" className="img-article"/>
                            <figcaption>
                                Webmapping
                            </figcaption>
                        </figure>
                        <p>Visualisez l'ensemble des données nécessaires pour l'implantation de vos centrales grâce à une interface web clé-en-main.</p>
                        <Link to="/websig" className="button">En savoir plus</Link>
                    </article>
                </div>
            </section> 

        </main>
    </>
    )
    
}

export default Home