import {useEffect} from "react";
import {useMap} from 'react-leaflet'
import {GeoSearchControl} from 'leaflet-geosearch'

function SearchLocation(props) {
    //useMap: Hook that allows access to the Leaflet map instance in order to add the geocoding tool
    const map = useMap();
    //Retrieve the provider property passed to the component. Here, OpenStreetMap (database which contains all adresses).
    const {provider} = props;
    
    useEffect(() => {
        const searchControl = new GeoSearchControl({
            provider
        })
        
        map.addControl(searchControl) //add the search bar to the map
    
        //Remove the search bar from the map when the component is unmounted or when props change
        return () => map.removeControl(searchControl)
        }, [props])
    
     return null   
    
}

export default SearchLocation;