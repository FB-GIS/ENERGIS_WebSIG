import { useState, useRef, useEffect } from "react";
import { useMap, FeatureGroup } from "react-leaflet";
import L from "leaflet";
import "leaflet-draw";
import { addOneProjectArea } from "../api/projectArea";
import ProjectAreaForm from "./ProjectAreaForm";

function DrawControls({ onRefresh }) {
  
  //useMap: Hook that allows access to the Leaflet map instance in order to add the drawing tools
  const map = useMap(); 
  //FeatureGroup: Leaflet container for grouping layers (drawings)
  const featureGroupRef = useRef();
  // State that contains the layer (geometry) currently being edited/entered
  const [activeLayer, setActiveLayer] = useState(null); 
  
 //The geometry drawn with the plugin is a Polygon type
 //However, the geometries stored in MySQL are Multipolygon type
 //We create a function to automatically convert a Polygon into MultiPolygon
  const convertToMultiPolygon = (geojson) => {
    if (geojson.geometry.type === 'Polygon') {
      geojson.geometry.coordinates = [geojson.geometry.coordinates];  // Encapsulate the POLYGON geometry in an array
      geojson.geometry.type = 'MultiPolygon';  // Change geometry type to MultiPolygon
    }
    return geojson;
  };

  //Polygon saving function after form validation
  //We pass two states returned by the form as parameters (area and comment)
  const handleSave = ({ area, comment }) => {
    const fg = featureGroupRef.current; // reference to the FeatureGroup (group of shapes on the map)
    const layer = activeLayer; // We store the geometry in a variable 
    //Creation of a data object that will be passed as a parameter in the backend request for adding a project area
    const data = {
      area,
      comment,
      geojson: convertToMultiPolygon(layer.toGeoJSON()), //Converts the drawn geometry to GeoJSON and MultiPolygon
    };

    
    // We call the backend API to save the project area in database
    addOneProjectArea(data)
      .then((res) => {
        if (fg && layer) {
          fg.removeLayer(layer); //Geometry is removed from the display after saving it
        }
        if (onRefresh) {
          onRefresh(); // We call the onRefresh function (passed as a prop) to reload the visible data (geometry)
                       // Here, the function call will increment by 1 the refreshProjectArea state declared in the Map component
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.response) {
          console.error(err.response.data);
        }
      });

    setActiveLayer(null); //We set the activeLayer state to null to close the form
  };



  const handleCancel = () => {
    setActiveLayer(null); // Hide the form without saving the geometry if user click on Cancel button
  };



  useEffect(() => {
    // We check if the map is loaded or the FeatureGroup reference is available
    if (!map || !featureGroupRef.current) {
      return;
    }

    const fg = featureGroupRef.current; // Reference to the FeatureGroup (group of polygon geometries on the map)

    const drawControl = new L.Control.Draw({
      edit: {
        featureGroup: fg, // Allow to modify existing objects in the FeatureGroup
      },
      draw: {
        polygon: true, // Activate polygon geometry
        rectangle: false, // Disable rectangle
        circle: false,  // Disable circle
        marker: false,  // Disable marker
        polyline: false, // Disable  Polyline
      },
    });

    map.addControl(drawControl); // Add drawing tools in the map

    // When a user draws a shape (polygon), this event is triggered
    map.on(L.Draw.Event.CREATED, (e) => {
      const layer = e.layer; // We store the geometry created by the user in a variable
      fg.addLayer(layer); // We retrieve the shape (layer) and add it to the FeatureGroup
      setActiveLayer(layer); // We save the geometry as activeLayer to trigger the display of the form
    });

    return () => {
      //Cleaning: When the component is disassembled, the drawing tools are removed
      map.removeControl(drawControl);
    };
  }, [map]);



  return (
    <>
      <FeatureGroup ref={featureGroupRef} />
      {activeLayer && (
        <ProjectAreaForm onSave={handleSave} onCancel={handleCancel} />
      )}
    </>
  );
}

export default DrawControls;
