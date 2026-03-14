import { useEffect, useState } from "react";
import { GeoJSON, useMap } from "react-leaflet";
import { displayProjectsByEnergy } from "../api/project";
import L from "leaflet";
import solarIconUrl from "../assets/images/icon/marker-yellow.svg";

export function SolarProject() {
  const map = useMap();
  const [project, setProject] = useState(null);

  //Create an Icon model for solar projects
  const solarIcon = new L.Icon({
    iconUrl: solarIconUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
  });

  useEffect(() => {
    const handleZoom = () => {
      const zoom = map.getZoom();

      //projects will be displayed from a certain zoom level
      if (zoom >= 8) {
        //We call backend API which display all the projects by energy type, here solar energy
        displayProjectsByEnergy("solar").then((res) => {
          if (res.status === 200) {
            const projectList = res.projects;

            const features = projectList.map((project) => {
              let geometry;
              try {
                // Transform JSON text returned by the API into JS object to display it on the map
                geometry = JSON.parse(project.geom);
              } catch (err) {
                console.error(err);
              }

              //We create a GeoJSON Feature object per project, with properties for the information and geometry for the shape
              return {
                type: "Feature",
                properties: {
                  id: project.id,
                  name: project.name,
                  energy: project.energy,
                  developer_name: project.developer_name,
                  status: project.status,
                  solar_type: project.solar_type,
                  wind_model: project.wind_model,
                },
                geometry: geometry,
              };
            });

            //We group the features into a FeatureCollection (standard GeoJSON format)
            const geoJson = {
              type: "FeatureCollection",
              features: features,
            };

            setProject(geoJson); //We store all the projects in the project state
          }
        });
      } else {
        setProject(null); // trop éloigné, on efface les projets affichés
      }
    };

    map.on("zoomend", handleZoom);

    return () => {
      map.off("zoomend", handleZoom);
    };
  }, [map]);

  //function that allow to display popups containing information about each zone
  //The variable called layer is automatically provided by the Leaflet library (and therefore by React-Leaflet when you use <GeoJSON />).
  //feature : GeoJSON object ; layer: the Leaflet object that visually represents this geometry on the map (= L.Marker).
  const onEachFeature = (feature, layer) => {
    const props = feature.properties;
    //We build an HTML popup with the area information.
    const content = `
        <strong>${props.name}</strong><br />
        Énergie : ${props.energy}<br />
        Développeur : ${props.developer_name}<br />
        Statut : ${props.status}<br />
        Type solaire : ${props.solar_type || "N/A"}
      `;
    layer.bindPopup(content); //We add the popup to the geometry
  };

  /*If project is defined, the GeoJSON component is displayed:
data = geometries

onEachFeature = function to add popups
*/

  return project ? (
    <GeoJSON
      key={"projects-solar"}
      data={project}
      onEachFeature={onEachFeature}
      pointToLayer={(feature, latlng) => {
        return L.marker(latlng, { icon: solarIcon });
      }}
    />
  ) : null;
}

export function WindProject() {
  const map = useMap();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const handleZoom = () => {
      const zoom = map.getZoom();

      //projects will be displayed from a certain zoom level
      if (zoom >= 8) {
        //We call backend API which display all the projects by energy tpe, here wind energy
        displayProjectsByEnergy("wind").then((res) => {
          if (res.status === 200) {
            const projectList = res.projects;

            const features = projectList.map((project) => {
              let geometry;
              try {
                // Transform JSON text returned by the API into JS object to display it on the map
                geometry = JSON.parse(project.geom);
              } catch (err) {
                console.error(err);
              }

              //We create a GeoJSON Feature object per project, with properties for the information and geometry for the shape
              return {
                type: "Feature",
                properties: {
                  id: project.id,
                  name: project.name,
                  energy: project.energy,
                  developer_name: project.developer_name,
                  status: project.status,
                  solar_type: project.solar_type,
                  wind_model: project.wind_model,
                },
                geometry: geometry,
              };
            });

            //We group the features into a FeatureCollection (standard GeoJSON format)
            const geoJson = {
              type: "FeatureCollection",
              features: features,
            };

            setProject(geoJson); //We store all the projects in the project state
          }
        });
      } else {
        setProject(null); // trop éloigné, on efface les projets affichés
      }
    };

    map.on("zoomend", handleZoom);

    return () => {
      map.off("zoomend", handleZoom);
    };
  }, [map]);

  //function that allow to display popups containing information about each zone
  //The variable called layer is automatically provided by the Leaflet library (and therefore by React-Leaflet when you use <GeoJSON />).
  //feature : GeoJSON object ; layer: the Leaflet object that visually represents this geometry on the map (= L.Marker).
  const onEachFeature = (feature, layer) => {
    const props = feature.properties;
    //We build an HTML popup with the area information.
    const content = `
        <strong>${props.name}</strong><br />
        Énergie : ${props.energy}<br />
        Développeur : ${props.developer_name}<br />
        Statut : ${props.status}<br />
        Modèle turbine: ${props.wind_model}
      `;
    layer.bindPopup(content); //We add the popup to the geometry
  };

  /*If project is defined, the GeoJSON component is displayed:
data = geometries

onEachFeature = function to add popups
*/
  return project ? (
    <GeoJSON
      key={"projects-wind"}
      data={project}
      onEachFeature={onEachFeature}
    />
  ) : null;
}
