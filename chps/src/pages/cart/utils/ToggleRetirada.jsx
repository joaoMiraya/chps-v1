import { lazy, useState } from 'react';


const ToggleButton = lazy(() => import("../../../components/utils/buttons/ToggleButton"));

function ToggleRetirada({ retirar, setRetirar }) {


    return (

        <div className="flex flex-col items-center bg-gray-100 shadow-inner py-4">
            <h2 className="text-xl font-semibold text-center py-2">Deseja entregar ou retirar?</h2>
            <div className="flex w-full justify-evenly">
                <div className={`flex flex-col items-baseline`}>
                    <span className={`${retirar ? '' : 'text-green-700'} font-semibold`}>Entregar</span>
                </div>
                <ToggleButton selected={retirar} setSelected={setRetirar} />
                <span className={`${retirar ? 'text-green-700 ' : ''} font-semibold`}>Retirar</span>
            </div>
        </div>

    )
};

export default ToggleRetirada;