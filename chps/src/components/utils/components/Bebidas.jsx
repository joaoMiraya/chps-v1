import { CiBeerMugFull } from 'react-icons/ci';


function Bebidas() {


    return (
        <div className='flex justify-center px-4 my-6'>
            <div aria-label='Botão para ir ao cardápio de bebidas' className='hover:bg-[#eeeeee60] cursor-pointer flex items-center w-full border-[1px] border-solid py-2 px-6 border-gray-300 rounded-lg'>
                <CiBeerMugFull size={50} />
                <h2 className='text-xl font-bold text-center w-full'>Bebidas</h2>
            </div>
        </div>
    )

}

export default Bebidas;