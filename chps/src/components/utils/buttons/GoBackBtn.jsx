import { IoIosArrowBack } from 'react-icons/io';


function GoBackBtn() {

    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <>
            <div onClick={handleGoBack}>
                <IoIosArrowBack size={30} />
            </div>
        </>
    )
}

export default GoBackBtn;