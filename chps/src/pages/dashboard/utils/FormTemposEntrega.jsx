import PropTypes from 'prop-types';


function FormTemposEntrega({ handleSetTime }) {
    FormTemposEntrega.propTypes = {
        handleSetTime: PropTypes.func.isRequired,
    }
    return (

        <div className="flex flex-col items-start gap-2">
            <div className="flex flex-row-reverse">
                <label className="cursor-pointer" htmlFor="15min">15 minutos</label>
                <input onChange={(e) => handleSetTime(e.target.value)} defaultValue={'15 minutos'} type="radio" name="time" id="15min" />
            </div>
            <div className="flex flex-row-reverse">
                <label className="cursor-pointer" htmlFor="30min">30 minutos</label>
                <input onChange={(e) => handleSetTime(e.target.value)} defaultValue={'30 minutos'} type="radio" name="time" id="30min" />
            </div>
            <div className="flex flex-row-reverse">
                <label className="cursor-pointer" htmlFor="45min">45 minutos</label>
                <input onChange={(e) => handleSetTime(e.target.value)} defaultValue={'45 minutos'} type="radio" name="time" id="45min" />
            </div>
            <div className="flex flex-row-reverse">
                <label className="cursor-pointer" htmlFor="60min">60 minutos</label>
                <input onChange={(e) => handleSetTime(e.target.value)} defaultValue={'60 minutos'} type="radio" name="time" id="60min" />
            </div>
            <div className="flex flex-row-reverse">
                <label className="cursor-pointer" htmlFor="75min">75 minutos</label>
                <input onChange={(e) => handleSetTime(e.target.value)} defaultValue={'75 minutos'} type="radio" name="time" id="75min" />
            </div>
            <div className="flex flex-row-reverse">
                <label className="cursor-pointer" htmlFor="90min">90 minutos</label>
                <input onChange={(e) => handleSetTime(e.target.value)} defaultValue={'90 minutos'} type="radio" name="time" id="90min" />
            </div>
        </div>

    )
}

export default FormTemposEntrega;