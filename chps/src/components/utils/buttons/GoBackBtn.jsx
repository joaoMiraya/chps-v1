import PropTypes from 'prop-types';
import { IoIosArrowBack } from 'react-icons/io';


function GoBackBtn({ goBackRef }) {
    GoBackBtn.propTypes = {
        goBackRef: PropTypes.instanceOf(Object).isRequired,
    };
    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <>
            <div ref={goBackRef} className=' fixed md:hidden z-40 left-2 mt-4 border-solid border-[1px] bg-[#eeeeee90] border-gray-200 rounded-full p-1' onClick={handleGoBack}>
                <IoIosArrowBack size={30} />
            </div>
        </>
    )
}

export default GoBackBtn;