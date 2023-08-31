import PropTypes from 'prop-types';


function FormTemposRetirada({ handleSetTime }) {
    FormTemposRetirada.propTypes = {
        handleSetTime: PropTypes.func.isRequired,
    }
    return (

        <div className="flex flex-col items-start gap-2">
            <div className="flex flex-row-reverse">
                <label className="cursor-pointer" htmlFor="15minRetirada">15 minutos</label>
                <input onChange={(e) => handleSetTime(e.target.value)} defaultValue={'15 minutos'} type="radio" name="timeRetirada" id="15minRetirada" />
            </div>
            <div className="flex flex-row-reverse">
                <label className="cursor-pointer" htmlFor="30minRetirada">30 minutos</label>
                <input onChange={(e) => handleSetTime(e.target.value)} defaultValue={'30 minutos'} type="radio" name="timeRetirada" id="30minRetirada" />
            </div>
            <div className="flex flex-row-reverse">
                <label className="cursor-pointer" htmlFor="45minRetirada">45 minutos</label>
                <input onChange={(e) => handleSetTime(e.target.value)} defaultValue={'45 minutos'} type="radio" name="timeRetirada" id="45minRetirada" />
            </div>
            <div className="flex flex-row-reverse">
                <label className="cursor-pointer" htmlFor="60minRetirada">60 minutos</label>
                <input onChange={(e) => handleSetTime(e.target.value)} defaultValue={'60 minutos'} type="radio" name="timeRetirada" id="60minRetirada" />
            </div>
            <div className="flex flex-row-reverse">
                <label className="cursor-pointer" htmlFor="75minRetirada">75 minutos</label>
                <input onChange={(e) => handleSetTime(e.target.value)} defaultValue={'75 minutos'} type="radio" name="timeRetirada" id="75minRetirada" />
            </div>
            <div className="flex flex-row-reverse">
                <label className="cursor-pointer" htmlFor="90minRetirada">90 minutos</label>
                <input onChange={(e) => handleSetTime(e.target.value)} defaultValue={'90 minutos'} type="radio" name="timeRetirada" id="90minRetirada" />
            </div>
        </div>

    )
}

export default FormTemposRetirada;