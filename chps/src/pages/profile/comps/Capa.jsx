import { useEffect, useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import Cookies from 'js-cookie';

function Capa() {

    const [openColors, setOpenColors] = useState(false);

    const [color, setColor] = useState(Cookies.get("CoverColor") || '');

    useEffect(() => {
        Cookies.set('CoverColor', color, { expires: 365 })
    }, [color]);

    const colors = {

        red: {
            id: 1,
            hex: '#DB0007'
        },
        yellow: {
            id: 2,
            hex: '#FFBC0D'
        },
        orange: {
            id: 3,
            hex: '#C55300'
        },
        black: {
            id: 4,
            hex: '#292929'
        },
        gray: {
            id: 5,
            hex: '#999999'
        }

    };
    return (

        <div className={`${color.length > 3 ? 'bg-[' + color + ']' : 'bg-gray-300'} flex justify-end items-end p-2 w-full rounded-t-xl max-w-[24rem] h-[6rem]`}>
            <div className='border-[1px] border-solid border-white cursor-pointer rounded-full p-2'>
                {openColors ?
                    <AiOutlineClose color='white' onClick={() => setOpenColors(!openColors)} size={20} /> :
                    <FiEdit2 color='white' onClick={() => setOpenColors(!openColors)} size={20} />
                }
            </div>
            <div className={`${openColors ? 'flex' : 'hidden'} flex-col w-[1.5rem]  drop-shadow-2xl absolute top-28 bg-white p-4 items-center gap-2 rounded-full border-[1px] border-gray-300 border-solid`}>
                {Object.values(colors).map((cor) => {
                    return (
                        <label className={`bg-[${cor.hex}] w-6 h-6 hover:opacity-40 rounded-full`} key={cor.id} htmlFor={`color${cor.id}`}>
                            <input onClick={(e) => setColor(e.target.value)} className='opacity-0' type="checkbox" name={`color${cor.id}`} id={`color${cor.id}`} value={cor.hex} />
                        </label>
                    )
                })}
            </div>
        </div>
    )
}

export default Capa;