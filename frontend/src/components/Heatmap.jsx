import { useEffect, useState, useRef } from "react";
import { LayerGroup } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";
import { displayProjects } from "../api/project";

function Heatmap() {
  const layerRef = useRef(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        //We call the API to retrieve all the projects (solar and wind)
        const res = await displayProjects();
        if (res.status === 200) {
          setProjects(res.projects); //We store all the projects in the projects state
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const heatPoints = projects.map((p) => {
      // The coordinates (latitude and longitude) contained in each project are stored in corresponding variables
      const [lng, lat] = JSON.parse(p.geom).coordinates; // Transform JSON text returned by the API into JS object to display it on the map
      return [lat, lng, 17]; //Latitude, Longitude, Intensity value of the point
    });

    //Creation of the heat map
    const heatLayer = L.heatLayer(heatPoints, {
      radius: 70, //size of the heat "rings"
      blur: 20, //softening of the edges
    });

    heatLayer.addTo(layerRef.current); //add the heat map to the main map
  }, [projects]); //This heatmap is re-rendered every time projects are updated.

  return <LayerGroup ref={layerRef} />;
}

export default Heatmap;
