
import axios from 'axios';
import { lazy, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const EntregaPlaceholder = lazy(() => import("./EntregaPlaceholder"));

function Mapa({ address }) {
    Mapa.propTypes = {
        address: PropTypes.string
    };

    const [position, setPosition] = useState([0, 0]);
    const [isSetting, setIsSetting] = useState(true);

    //PEGA AS COORDENADAS DO ENDEREÇO
    useEffect(() => {
        async function fetchCoordinates() {
            try {
                const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`);
                if (response.data && response.data.length > 0) {
                    const firstResult = response.data[0];
                    setPosition([parseFloat(firstResult.lat), parseFloat(firstResult.lon)]);
                    setIsSetting(false)
                }
            } catch (error) {
                setIsSetting(false)
                console.error("Error fetching coordinates:", error);
            } finally {
                setIsSetting(false)
            }
        }
        fetchCoordinates();
    }, [address]);


    if (isSetting) {
        return <EntregaPlaceholder />
    }
    return (

        <>
            <div className='flex justify-center '>
                <MapContainer center={position} zoom={17} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                        <Popup>
                            {address}
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </>

    )
}

export default Mapa;