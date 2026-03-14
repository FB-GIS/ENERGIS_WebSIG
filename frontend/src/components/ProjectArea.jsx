import { useEffect, useState } from "react";
import { GeoJSON } from "react-leaflet";
import { displayProjectAreas, displayAllProjectAreas } from '../api/projectArea';
import { useSelector } from "react-redux"
import { selectUser } from "../redux/userSlice"

export function ProjectArea({ refresh }) {
  const [projectArea, setProjectArea] = useState(null);
  const [dataVersion, setDataVersion] = useState(0);
  const user = useSelector(selectUser);


  const loadProjectAreas = async() => {

    //If user's information are not available in redux store we don't execute the function
    if (!user?.infos?.role) return;

    //If the connected user is admin we call the function that will return all the geometries but if he's a simple user, we call the function that will return only his geometries
    const fetchProjectAreas = user.infos.role === "admin" ? displayAllProjectAreas : displayProjectAreas;

    try {
      const res = await fetchProjectAreas()

      if (res.status === 200) {
        const projectAreasList = res.project_areas;

        const features = projectAreasList
          .map(project => {
            let geometry;
            try {
              // Transform JSON text returned by the API into JS object to display it on the map
              geometry = JSON.parse(project.geom);
            }
            catch (err) {
              console.error(err);
            }

            //We create a GeoJSON Feature object per project, with properties for the information and geometry for the shape
            return {
              type: "Feature",
              properties: {
                id: project.id,
                area: project.area,
                comment: project.comment,
                author: project.author
              },
              geometry: geometry
            };
          })

        //We group the features into a FeatureCollection (standard GeoJSON format)
        const geoJson = {
          type: "FeatureCollection",
          features: features,
        };

        setProjectArea(geoJson); //We store the result in the projectArea state
        
        setDataVersion(refresh); //We update dataVersion with refresh, to force React to re-render the GeoJSON

      }

    }
    catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    loadProjectAreas();
  }, [user?.infos?.role, refresh]); //When the user role OR the refresh prop changes, the project areas are reloaded


  //function that allow to display popups containing information about each zone
  //The variable called layer is automatically provided by the Leaflet library (and therefore by React-Leaflet when you use <GeoJSON />).
  //feature : GeoJSON object ; layer: the Leaflet object that visually represents this geometry on the map (= L.Polygon).
  const onEachFeature = (feature, layer) => {
    const props = feature.properties;
    //We build an HTML popup with the area information.
    const content = `
        Surface : ${props.area}<br />
        Commentaire : ${props.comment}<br />
        Auteur : ${props.author}
      `;
    layer.bindPopup(content); //We add the popup to the geometry
  };

/*If projectArea is defined, the GeoJSON component is displayed:
data = geometries

onEachFeature = function to add popups

key changes with each update (thanks to dataVersion), which forces React to recreate the component and therefore delete and recreate the Leaflet layers
*/

  return projectArea ? <GeoJSON key={`project-area-${dataVersion}`} data={projectArea} onEachFeature={onEachFeature}  /> : null;
}


