import { IoIosArrowBack } from 'react-icons/io';

function GoBackBtn() {

    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <>
            <button
                tabIndex={0}
                aria-label='Voltar a página anterior'
                className={`fixed md:hidden z-40 left-2 mt-2 border-solid border-[1px] bg-[#eeeeee90] border-gray-200 rounded-full p-1`}
                onClick={handleGoBack}
            >
                <IoIosArrowBack size={30} />
            </button>
        </>
    )
}

export default GoBackBtn;