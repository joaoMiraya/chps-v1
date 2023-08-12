import PropTypes from 'prop-types';


function SegundoSabor({ pizzas, setSegundoSabor }) {
    SegundoSabor.propTypes = {
        pizzas: PropTypes.array.isRequired,
        setSegundoSabor: PropTypes.func.isRequired,
    }

    return (

        <ul className="list-group max-h-[12rem] overflow-y-auto">
            {pizzas.map((pizza) => {
                return (
                    <li aria-label='Outro sabor da pizza' key={pizza.id} className="list-group-item">
                        <input aria-label={pizza.nome} onClick={() => setSegundoSabor(pizza)} className="form-check-input me-1" type="radio" name="listGroupRadio" value={pizza.nome} id={pizza.id} />
                        <label className="form-check-label" htmlFor={pizza.id}>{pizza.nome}</label>
                    </li>
                )
            })}

        </ul>
    )
}


export default SegundoSabor;