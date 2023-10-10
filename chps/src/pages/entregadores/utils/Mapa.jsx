
import { useState } from "react";
import PropTypes from 'prop-types';

function Mapa({ address }) {
    Mapa.propTypes = {
        address: PropTypes.string
    };

    const [markers, setMarkers] = useState([]);


    return (

        <>
            <div id="map" className="h-[12rem]"></div>

        </>

    )
}

export default Mapa;