import { useEffect, useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import Cookies from 'js-cookie';

function Capa() {

    const [openColors, setOpenColors] = useState(false);

    const [color, setColor] = useState(Cookies.get("CoverColor") || '');

    const colors = {
        orange: '#C55300',
        red: '#DB0007',
        yellow: '#FFBC0D',
        black: '#292929',
        gray: '#999999'
    };

    useEffect(() => {
        if (color) {
            Cookies.set('CoverColor', color, { expires: 365 });
        }
    }, [color]);

    
    return (

        <div style={{ backgroundColor: color }} className={`${color.length > 3 ? '' : 'bg-gray-300'} flex justify-end items-end p-2 w-full rounded-t-xl max-w-[24rem] h-[6rem]`}>
            <div className='p-2 cursor-pointer'>
                {openColors ?
                    <AiOutlineClose color='white' onClick={() => setOpenColors(!openColors)} size={20} /> :
                    <FiEdit2 color='white' onClick={() => setOpenColors(!openColors)} size={20} />
                }
            </div>
            <div className={`${openColors ? 'flex' : 'hidden'} flex-col w-[1.5rem]  drop-shadow-2xl absolute top-28 bg-white p-4 items-center gap-2 rounded-full border-[1px] border-gray-300 border-solid`}>
                {Object.keys(colors).map((key, i) => {
                    const cor = colors[key];
                    return (
                        <label
                            style={{ backgroundColor: cor }}
                            className="w-6 h-6 hover:opacity-40 rounded-full"
                            key={i}
                            htmlFor={`color${cor}`}
                        >
                            <input
                                onClick={() => setColor(cor)}
                                className="opacity-0  cursor-pointer"
                                type="radio"
                                name={`color${cor}`}
                                id={`color${cor}`}
                                value={cor}
                            />
                        </label>
                    )
                })}
            </div>
        </div>
    )
}

export default Capa;