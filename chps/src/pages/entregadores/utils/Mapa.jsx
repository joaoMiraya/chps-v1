import { GoogleMap, Marker } from "@react-google-maps/api";
import { useState } from "react";
import PropTypes from 'prop-types';

function Mapa({ address }) {
    Mapa.propTypes = {
        address: PropTypes.string.isRequired
    };

    const [markers, setMarkers] = useState([]);


    return (
        <>
         
        </>
    )
}

export default Mapa;