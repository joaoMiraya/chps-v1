import PropTypes from 'prop-types';

function Endereço({ pedido }) {
    Endereço.propTypes = {
        pedido: PropTypes.object.isRequired
    };

    return (

        <div className={`${pedido.retirar ? 'hidden' : 'flex flex-col'}`}>
            <h2 className="text-2xl font-semibold text-center my-2">Endereço:</h2>

            <span className="flex gap-2">
                <p className="font-semibold">Bairro: </p>{pedido.bairro}
            </span>
            <hr />
            <span className="flex gap-2">
                <p className="font-semibold">Rua: </p>{pedido.rua}
            </span>
            <hr />
            <span className="flex gap-2">
                <p className="font-semibold">Número da casa: </p>{pedido.numero_casa}
            </span>
            <hr />
            <span className="flex gap-2">
                <p className="font-semibold">Referência </p>{pedido.referencia}
            </span>
            <hr />
        </div>
    )
}

export default Endereço;