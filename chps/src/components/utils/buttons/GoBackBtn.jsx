import PropTypes from 'prop-types';
import { IoIosArrowBack } from 'react-icons/io';


function GoBackBtn({ goBackRef, menuHide }) {
    GoBackBtn.propTypes = {
        goBackRef: PropTypes.instanceOf(Object).isRequired,
        menuHide: PropTypes.bool.isRequired,
    };
    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <>
            <div className={`${menuHide ? 'hidden' : ''}  fixed md:hidden z-40 left-2 mt-2 border-solid border-[1px] bg-[#eeeeee90] border-gray-200 rounded-full p-1`} ref={goBackRef} onClick={handleGoBack}>
                <IoIosArrowBack size={30} />
            </div>
        </>
    )
}

export default GoBackBtn;