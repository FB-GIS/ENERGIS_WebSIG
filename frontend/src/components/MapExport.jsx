import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet-easyprint";

function MapExport() {
  const map = useMap();

  useEffect(() => {
    const printPlugin = L.easyPrint({
      sizeModes: ['A4Portrait', 'A4Landscape'],
      filename: 'carte_export',
      exportOnly: true,
      hideControlContainer: true,
      position: 'topright'
    }).addTo(map);

    return () => {
      map.removeControl(printPlugin); //Remove measure tools every time the component is dismantled
    };
  }, [map]);

  return null;
}


export default MapExport