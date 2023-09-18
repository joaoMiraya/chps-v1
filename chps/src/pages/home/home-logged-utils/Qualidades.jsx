import { BsEmojiSmile } from 'react-icons/bs';
import { CiBeerMugFull } from 'react-icons/ci';
import { MdOutlineFastfood } from 'react-icons/md';

function Qualidades() {

    return (

        <>
            <div className='text-gray-400 font-semibold flex flex-col gap-6 px-12'>
                <div className='flex items-center'>
                    <div className="rounded-full border-4 border-gray-300 border-solid  p-2">
                        <BsEmojiSmile size={30} />
                    </div>
                    <p className='text-center'>Ambiente Familiar e acolhedor</p>
                </div>
                <hr />
                <div className='flex items-center'>
                    <div className="rounded-full border-4 border-gray-300 border-solid  p-2">
                        <CiBeerMugFull size={30} />
                    </div>
                    <p className='text-center'> Cerveja e Chopp trincando para maiores</p>
                </div>
                <hr />
                <div className='flex items-center'>
                    <div className="rounded-full border-4 border-gray-300 border-solid  p-2">
                        <MdOutlineFastfood size={30} />
                    </div>
                    <p className='text-center'>Variadas opções para pedir no cardápio</p>
                </div>
            </div>
        </>
    )
}

export default Qualidades;