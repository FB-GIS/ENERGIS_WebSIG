const Geomatique = (props) =>{
    return (
 
    <>
        <div className="banner-geomatics">
          <h1>Qu'est-ce que la géomatique ?</h1>
        </div>
        
        <main className="container">
            <iframe width="560" 
            		height="315" 
            		src="https://www.youtube.com/embed/il6RsMP8uyw?si=jfaeDpMJSRPjt5jy"
					srcdoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube.com/embed/il6RsMP8uyw?si=jfaeDpMJSRPjt5jy?autoplay=1><img src=https://img.youtube.com/vi/il6RsMP8uyw/hqdefault.jpg alt='La géomatique, une discipline au coeur de nos vies'><span>▶</span></a>"
            		title="YouTube video player" 
            		frameBorder="0" 
            		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            		referrerPolicy="strict-origin-when-cross-origin" 
            		allowFullScreen>
            </iframe>
            <blockquote lang="fr">
            	<cite>Ecole Nationale des Sciences Géographiques, Youtube (2022)</cite>
            </blockquote>

			<blockquote lang="fr">
				<p>"&nbsp;Discipline ayant pour objet la gestion des <b>données à référence spatiale</b> et qui fait appel aux <b>sciences et technologies reliées à leur acquisition, leur stockage, leur traitement et leur diffusion</b>&nbsp;"</p>
				<cite>(Marcel Bergeron, 1992, Vocabulaire de la Géomatique)</cite>
			</blockquote>
			
			<section className="description-geomatics">
			    <article>
			        <h2><span className="green-dot-list">•</span>Acquisition de données spatialisées</h2>
			        <img src="/images/geomatique/lidar.jpg" alt="Données Lidar forêt" className="img-article" />
			        <p>Nous pouvons distinguer 3 types de données spatiales: </p>
			        <ul>
			            <li><b>Les données vectorielles: </b>
			            Issues de mesures effectuées sur le terrain (relevés topographiques, GPS, drone...etc.), soit par numérisation d'informations existantes (plans cadastraux, réseaux). Une donnée vectorielle est constitué de formes géométriques (points/lignes/polygones) auxquelles sont associées des informations appelées "attributs".
			            </li>
			            <li><b>Les données raster: </b>
			                Créées à partir d'images satellite ou de photographies aériennes. Elles subissent ensuite différentes corrections par photogrammétries afin d'obtenir  une orthophotographie qui pourra être superposée à une cartographie 2D sous logiciel SIG.
			            </li>
			            <li><b>Les données 3D: </b>
			                Elles permettent de modéliser des objets réels en trois dimensions, tels que des bâtiments, des montagnes, des routes...etc. Les surfaces 3D sont générées à partir de données brutes telles que des images satellites, des photographies aériennes, des nuages de points ou des données topographiques, et ce, par le biais de différentes méthodes: photogrammétrie, LIDAR, modélisation par interpolation...
			            </li>
			        </ul>
			        <div>
			            <p>Il existe différentes méthodes permettant de collecter ces types de données:</p>
    			        <ul>
    			            <li>Télédétection</li>
    			            <li>Relevés topographiques</li>
    			            <li>Géoréférencement de documents</li>
    			            <li>Acquisition GPS</li>
    			            <li>LIDAR</li>
    			            <li>Photogrammétrie</li>
    			            <li>...</li>
    			        </ul>
			        </div>
			    </article>
			    
			    
			    <article>
			        <h2><span className="green-dot-list">•</span>Stockage de données</h2>
			        <img src="/images/geomatique/serveurs.jpg" alt="Serveurs dans un data center" className="img-article"/>
			        <p>Une base de données spatiale est une base de données traditionnelle, composée de tables, dont chaque enregistrement contient un champ géométrique.</p>
			        <p>Chaque enregistrement représente un objet vectoriel géoréférencé (dont les coordonnées sont exprimées dans un système de coordonnées géographiques), représenté par des points, des lignes ou des polygones, auxquels on peut rattacher des attributs</p>
			        <p>Leur caractère vectoriel permet également de les associer, de les fusionner, de les découper, de les intersecter...etc. Ces opérations peuvent être effectuées par le biais de requêtes spatiale, en SQL, grâce à des fonctions géographiques (contenance, intersection).</p>
			        <p>La plupart des SIG professionnels peuvent être associés à des bases de données géographiques telles qu'Oracle Spatial, MySQL, ArcSDE ou PostGIS. Cette dernière est gratuite et dispose d'un grand nombre de fonctions dédiées à l'analyse de données géospatiales. </p>
			    </article>
			    
			    <article>
			        <h2><span className="green-dot-list">•</span>Traitement de données géolocalisées</h2>
			        <img src="/images/geomatique/qgis.jpg" alt="Interface logiciel QGIS" className="img-article" />
			        <p>Le traitement des données spatiales s'effectue au sein de logiciels spécialisés nommés SIG (systèmes d'information géographique, en anglais GIS)</p>
			        <p>Ces outils offrent la possibilité de superposer des données afin de réaliser des cartorgaphies, d'effectuer des calculs statistiques ou encore des analyses spatiales. Le croisement des données permet de dégager des structures et dynamiques spatiales au sein de différents jeux de données.</p>
			        <p>Ces logiciels SIG peuvent également interrroger des bases de données spatiales pour localiser des éléments particuliers tels qu'un poste de raccordement électrique, en connaître ses caractéristiques (puissance installée, en cours de raccordement...etc.) ou trouver l'itinéraire le plus court pour s'y raccorder depuis un parc éolien.</p>
			    </article>
			    
			    <article>
			        <h2><span className="green-dot-list">•</span>Diffusion des données géographiques</h2>
			        <img src="/images/geomatique/graphics.jpg" alt="Graphiques" className="img-article" />
			        <p>La diffusion des données en géomatique est un enjeu clé pour le partage et l'accessibilité de l'information géographique.</p>
			        <p>Les rendus générés par les outils SIG peuvent prendre plusieurs formes: des cartes thématiques ou topographiques en passant par les spatiocartes (données superposées à une image obtenue par télédétection) ou les cartes web.</p>
			        <p>Grâce à l'avancée des technologies web; les données spatiales peuvent être diffusées via des plateformes WebSIG, des API, ou encore des services normalisés comme le WMS (Web Map Service).</p>
			        <p>Ces services offrent l'avantage de visualiser et de manipuler des données sans avoir à les stocker localement, facilitant ainsi leur partage. Il existe aujourd'hui différentes solutions de webmapping: des applications simples comme les visionneuses cartographiques, jusqu'aux plus complexes à l'image des infrastructures de données spatiales (IDS).</p>
			    </article>
			</section>

        </main>       
    </>  
        )
}

export default Geomatique