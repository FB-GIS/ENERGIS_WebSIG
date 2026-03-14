import img1 from '../assets/images/maps/carte1.jpg'
import img2 from '../assets/images/maps/carte2.jpg'
import img3 from '../assets/images/maps/carte3.jpg'
import img4 from '../assets/images/maps/carte4.jpg'
import img5 from '../assets/images/maps/carte5.jpg'

import {useState, useEffect} from "react"

const SIGENR = (props) =>{
    
    const slides = [
                	{ image: img1, legend: 'Etat de l\'éolien en France en 2017' },
                	{ image: img2, legend: 'Zone d\'influence visuelle d\'un radar militaire'},
                	{ image: img3, legend: 'Containtes techniques'   },
                	{ image: img4, legend: 'Contraintes environnementales'},
                	{ image: img5, legend: 'Contraintes patrimoniales'}
                   ]
                   
    const [index, setIndex] = useState(0)
    

    const handleKeyUp = (e) => {
            if (e.keyCode === 37) {
                setIndex((index) => (index === 0 ? slides.length - 1 : index - 1));
            } else if (e.keyCode === 39) {
                setIndex((index) => (index < slides.length - 1 ? index + 1 : 0));
            } else if (e.keyCode === 32) {
                playPause();
            }        
    }
    
    useEffect(()=>{
        window.addEventListener('keyup', handleKeyUp)
    }, [])
    
    
    return (
    <>
        <section className="banner-gis-enr">
          <h1>SIG & Energies renouvelables</h1>
        </section>
        
        <main className="container">
           <section className="intro-gis-enr">
                <p>Il est couramment admis que 80% des données ont une composante géographique.</p>
                <p>Pourtant, combien de décision sont prises sans en tenir compte ?</p>
                <p>Le développement des énergies renouvelables est intrinsèquement de nature spatiale. Les analyses établies à partir de technologies SIG vous permettront d'étudier finement le potentiel énergétique d'un territoire et d'adapter vos stratégies commerciales en fonction de ses spécificités.</p>
           </section>
           
           <section className="description-gis-enr">
               <article>
                    <h2><span className="green-dot-list">•</span>Photovoltaïque</h2>
                    <img src="/images/sig_enr/solar.jpg" alt="Panneau photovoltaique" className="img-article" />
                    <p>Identification de terrains recherchés pour l’implantation de centrales photovoltaiques au sol : sites anthropisés, friches industrielles, délaissés routiers/autoroutiers, CET, carrières, décharges... </p>
                    <p>Simulations de Zones d’influences visuelles (ZIV) de centrales PV en phase de prospection.</p>
                    <p>Analyses multicritères pour la prospection de terrains propices
                        à l’agrivoltaïsme : localisation de zones d’élevages, croisement de données liées aux enjeux
                        environnementaux et patrimoniaux, identification de zones naturelles et friches agricoles... 
                    </p>
               </article>
               
               <article>
                    <h2><span className="green-dot-list">•</span>Eolien</h2>
                    <img src="/images/sig_enr/wind.jpg" alt="Parc éolien" className="img-article" />
                    <p>Réalisation d'études de pré-faisabilité par croisement de données spatialisées relatives aux contraintes présentes sur le territoire (raccordement, aéronautique, biodiversité, patrimoine, concurrence...).</p>
                    <p>Analyses paysagères: Zones d'influences visuelles (ZIV) permettant d'évaluer le degré de visibilité d'un parc éolien dans son environnement.</p>
                    <p>Suivi de la concurrence au niveau national.</p>
                    <p>Mise en oeuvre de stratégies de prospection: évaluation du potentiel éolien sous contraintes aéronautiques, développement de petit éolien au sein de zones industrielles, projet d'extension de parcs éoliens existants...etc.</p>
                    <p>Réalisation de cartographies pour les demandes d'autorisation environnementale, déclarations préalables à l'installation de mâts de mesure...</p>
               </article>
           </section>
           
           <section className="cartography">
                <h2><span className="green-dot-list">•</span>Exemples de cartographies</h2>
                <div>
                    <button
                        onClick={()=>{
                            if(index === 0){
                                setIndex(slides.length-1)
                            } else {
                                setIndex(index-1)
                            }
                        }}
                    >
                        Précédent
                    </button>
        
                    <button
                        onClick={()=>{
                            if(index === (slides.length-1)){
                                setIndex(0)
                            } else {
                                setIndex(index+1)
                            }
                        }}
                    >
                        Suivant
                    </button>
                </div>
                
                
                <figure>
                  <img src={slides[index].image} alt= {slides[index].legend} />
                  <figcaption>{slides[index].legend}</figcaption>
                </figure>
           </section>
      </main>
        
    </>  
        )
}

export default SIGENR