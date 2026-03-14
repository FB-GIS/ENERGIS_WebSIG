import { useState, useEffect, useRef } from "react";
import {ProjectArea} from "../components/ProjectArea";
import {SolarProject, WindProject} from "../components/Project";
import SearchLocation from "../components/Geocoding";
import MapExport from "../components/MapExport"
import {
    MapContainer,
    TileLayer,
    LayersControl,
    LayerGroup,
    Marker,
    Popup,
    GeoJSON,
    FeatureGroup,
    WMSTileLayer 
}
from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import DrawControls from "../components/DrawControls";
import {OpenStreetMapProvider} from 'leaflet-geosearch';
import MeasureControls from "../components/MeasureControls";
import Heatmap from "../components/Heatmap";



function Map() {
    
    // Coordinates of the center of France
    const center = [46.5397, 2.4302];
    const [refreshProjectArea, setRefreshProjectArea] = useState(0); 

    //We create a counter function that will increment each time a user draws a study area
    // This will force the map to refresh so that the study area can be displayed directly once it has been saved
    const handleRefresh = () => {
        setRefreshProjectArea(count => count += 1);
    };

    return (
        <>

        <MapContainer 
        center = { center } 
        zoom = { 6 }
        >
                <LayersControl position="topleft">
                    <LayersControl.BaseLayer checked name="OpenStreetMap">
                      <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Satellite Image">
                      <TileLayer
                        attribution= 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                        url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                      />
                    </LayersControl.BaseLayer>
                    
                  <LayersControl.Overlay name="Limites admnistratives (IGN)">
                    <WMSTileLayer
                        url="https://data.geopf.fr/wms-r/wms"
                        params={{
                            version: "1.3.0",
                            layers: "ADMINEXPRESS-COG.LATEST",
                            format: "image/png",
                            transparent: true
                          }}
                        attribution="© IGN"
                    />
                  </LayersControl.Overlay>
                  
                  
                  <LayersControl.Overlay name="Cadastre (IGN)">
                    <WMSTileLayer
                        url="https://data.geopf.fr/wms-r/wms"
                        params={{
                            version: "1.3.0",
                            layers: "CADASTRALPARCELS.PARCELLAIRE_EXPRESS",
                            format: "image/png",
                            transparent: true
                          }}
                        attribution="© IGN"
                    />
                  </LayersControl.Overlay>
                
                    <LayersControl.Overlay name="Zone d'étude">
                        <LayerGroup>
                            <ProjectArea refresh={refreshProjectArea} /> 
                        </LayerGroup>
                    </LayersControl.Overlay> 

                    <LayersControl.Overlay name="Projets solaires">
                        <LayerGroup>
                            <SolarProject /> 
                        </LayerGroup>
                    </LayersControl.Overlay>

                    <LayersControl.Overlay name="Projets éoliens">
                        <LayerGroup>
                            <WindProject /> 
                        </LayerGroup>
                    </LayersControl.Overlay>
                    
                    <LayersControl.Overlay name="Heatmap (projets)">
                        <Heatmap />
                    </LayersControl.Overlay>
                    
                    
                  <LayersControl.Overlay name="Vitesses de vent à 140m (IGN)">
                    <WMSTileLayer
                        url="https://data.geopf.fr/wms-r/wms"
                        params={{
                            version: "1.3.0",
                            layers: "POTENTIEL.VENT.140M",
                            format: "image/png",
                            transparent: true
                          }}
                        attribution="© IGN"
                    />
                    </LayersControl.Overlay> 
                    
                    
                  <LayersControl.Overlay name="Sites UNESCO (IGN)">
                    <WMSTileLayer
                        url="https://data.geopf.fr/wms-r/wms"
                        params={{
                            version: "1.3.0",
                            layers: "PROTECTEDAREAS.UNESCO",
                            format: "image/png",
                            transparent: true
                          }}
                        attribution="© IGN"
                    />
                    </LayersControl.Overlay> 
                    

                  <LayersControl.Overlay name="Biotopes d'espèces protégées (IGN)">
                    <WMSTileLayer
                        url="https://data.geopf.fr/wms-r/wms"
                        params={{
                            version: "1.3.0",
                            layers: "PROTECTEDAREAS.APB",
                            format: "image/png",
                            transparent: true
                          }}
                        attribution="© IGN"
                    />
                    </LayersControl.Overlay> 
                    
                    
                  <LayersControl.Overlay name="Zones humides (IGN)">
                    <WMSTileLayer
                        url="https://data.geopf.fr/wms-r/wms"
                        params={{
                            version: "1.3.0",
                            layers: "PROTECTEDAREAS.RAMSAR",
                            format: "image/png",
                            transparent: true
                          }}
                        attribution="© IGN"
                    />
                    </LayersControl.Overlay> 
                    
                    
                  <LayersControl.Overlay name="Natura 2000 - Oiseaux (IGN)">
                    <WMSTileLayer
                        url="https://data.geopf.fr/wms-r/wms"
                        params={{
                            version: "1.3.0",
                            layers: "PROTECTEDAREAS.ZPS",
                            format: "image/png",
                            transparent: true
                          }}
                        attribution="© IGN"
                    />
                    </LayersControl.Overlay> 
                    
                    
               <LayersControl.Overlay name="Natura 2000 - Habitats (IGN)">
                    <WMSTileLayer
                        url="https://data.geopf.fr/wms-r/wms"
                        params={{
                            version: "1.3.0",
                            layers: "PROTECTEDAREAS.SIC",
                            format: "image/png",
                            transparent: true
                          }}
                        attribution="© IGN"
                    />
                    </LayersControl.Overlay> 
                    
                    
                  <LayersControl.Overlay name="Parcs naturels régionaux (IGN)">
                    <WMSTileLayer
                        url="https://data.geopf.fr/wms-r/wms"
                        params={{
                            version: "1.3.0",
                            layers: "PROTECTEDAREAS.PNR",
                            format: "image/png",
                            transparent: true
                          }}
                        attribution="© IGN"
                    />
                    </LayersControl.Overlay> 

                  <LayersControl.Overlay name="ZNIEFF1 (IGN)">
                    <WMSTileLayer
                        url="https://data.geopf.fr/wms-r/wms"
                        params={{
                            version: "1.3.0",
                            layers: "PROTECTEDAREAS.ZNIEFF1",
                            format: "image/png",
                            transparent: true
                          }}
                        attribution="© IGN"
                    />
                    </LayersControl.Overlay>
                    
                  <LayersControl.Overlay name="ZNIEFF2 (IGN)">
                    <WMSTileLayer
                        url="https://data.geopf.fr/wms-r/wms"
                        params={{
                            version: "1.3.0",
                            layers: "PROTECTEDAREAS.ZNIEFF2",
                            format: "image/png",
                            transparent: true
                          }}
                        attribution="© IGN"
                    />
                  </LayersControl.Overlay>
                  
      
                </LayersControl>
                
                <DrawControls onRefresh={handleRefresh} /> 
                
                <SearchLocation provider={new OpenStreetMapProvider()} />
                
                <MapExport />
                
                <MeasureControls />
                
            </MapContainer> 
        </>
    );
}

export default Map
