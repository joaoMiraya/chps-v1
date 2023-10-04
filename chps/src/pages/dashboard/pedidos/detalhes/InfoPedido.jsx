import PropTypes from 'prop-types';


function InfoPedido({ pedido }) {
    InfoPedido.propTypes = {
        pedido: PropTypes.object.isRequired
    };

    return (
        <>
            <h2 className="text-2xl font-semibold text-center my-2">Pedido:</h2>
            <ul>
                {pedido.itens.map((item) => (
                    <div key={item.id} className="flex justify-between border-b-[1px] border-solid border-gray-300">
                        <div className="flex flex-col">
                            <li>{item.qnt + ' ' + item.nome}</li>
                            <li>{item.tamanho ? 'Tamanho: ' + item.tamanho : ''}</li>
                            {item.acrescimos?.map((acrescimo) => (
                                <span key={acrescimo.id} className="flex justify-between">
                                    <p>+ {acrescimo.nome}</p>
                                </span>
                            ))}
                        </div>
                        <li >R$ {item.valor}</li>
                    </div>

                ))}
            </ul>
            <hr />
        </>
    )
}

export default InfoPedido;