import PropTypes from 'prop-types';




function IncresDecresBtn({qnt, setQnt}) {
    IncresDecresBtn.propTypes = {
        qnt: PropTypes.number.isRequired,
        setQnt: PropTypes.func.isRequired,
    };
    


    const handleDecreaseCart = () => {
        if (qnt === 0) {
            return
        } else {
            setQnt(qnt - 1)
        }
    };

    const handleIncreaseCart = () => {
        setQnt(qnt + 1)
    };


    return (

        <>
            <div className="mb-6 border-[1px] border-solid border-gray-400 gap-4 flex px-2 py-[3px] rounded-2xl">
                <button className={`${qnt === 0 ? ' opacity-0' : ''}`} onClick={handleDecreaseCart}> - </button>
                {qnt}
                <button className='' onClick={handleIncreaseCart}> + </button>
            </div>
        </>
    )
}

export default IncresDecresBtn;