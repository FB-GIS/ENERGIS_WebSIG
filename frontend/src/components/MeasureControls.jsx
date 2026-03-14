import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-measure";


function MeasureControls() {

    const map = useMap();

    useEffect(() => {

        if (!map) return;
        
        // There is a conflict between the react leaflet-measure library and leaflet. When the user clicks on the map to draw a geometry, the map automatically moves. 
        // So we need to change the default behavior of the L.Control.Measure method (from Leaflet-measure plugin) to disable auto-pan (automatic map movement) when using the measurement tools.
        
        // Disable auto-pan by overriding the plugin’s internal method
        L.Control.Measure.include({
            // Prevent auto-panning when the capture marker is placed
            _setCaptureMarkerIcon: function() {
                // Turn off autoPan
                this._captureMarker.options.autoPanOnFocus = false;
                // Call the original icon setup
                this._captureMarker.setIcon(
                    L.divIcon({
                        iconSize: this._map.getSize().multiplyBy(2),
                    })
                );
            },
        });

        
        const measureControls = new L.Control.Measure({
            primaryLengthUnit: "kilometers",
            secondaryLengthUnit: "meters",
            primaryAreaUnit: "hectares",
            secondaryAreaUnit: "sqmeters",
            activeColor: "#db4a29",
            completedColor: "#9b2d14",
            position: "topright"
        });

        map.addControl(measureControls) //Add the measure tools to the map

        return () => {
            map.removeControl(measureControls); //Remove measure tools every time the component is dismantled
        };
    }, [map])

    return null
}

export default MeasureControls
