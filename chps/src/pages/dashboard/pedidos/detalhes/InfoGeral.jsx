import PropTypes from 'prop-types';

function InfoGeral({ pedido }) {
    InfoGeral.propTypes = {
        pedido: PropTypes.object.isRequired
    };
    
    return (

        <>
            <h2 className="text-2xl font-semibold text-center my-2">Informação geral:</h2>

            <span className="flex gap-2">
                <p className="font-semibold">Número do pedido: </p>{pedido.numero_pedido}
            </span>
            <hr />
            <span className="flex gap-2">
                <p className="font-semibold">Dia: </p>{pedido.data}
            </span>
            <hr />
            <span className="flex gap-2">
                <p className="font-semibold">Horário do pedido: </p>{pedido.hora_pedido}
            </span>
            <hr />
            <span className="flex gap-2">
                <p className="font-semibold">Nome do cliente: </p>{pedido.nome}
            </span>
            <hr />
            <span className="flex gap-2">
                <p className="font-semibold">Telefone: </p>{pedido.telefone}
            </span>
            <span className="flex gap-2">
                <p className="font-semibold">Pagamento: </p>{pedido.pagamento}
            </span>
            <hr />



        </>
    )
}

export default InfoGeral;