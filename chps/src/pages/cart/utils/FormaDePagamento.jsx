import PropTypes from 'prop-types';
import ToggleButton from '../../../components/utils/buttons/ToggleButton';


function FormaDePagamento({ setSelected, troco, setTroco, selected }) {
    FormaDePagamento.propTypes = {
        setSelected: PropTypes.func.isRequired,
        selected: PropTypes.bool.isRequired,
        setTroco: PropTypes.func.isRequired,
        troco: PropTypes.string.isRequired,
    };

    return (
        <div className="flex flex-col items-center bg-gray-100 shadow-inner pb-2">
            <h2 className="text-xl font-semibold text-center my-4">Escolha sua forma de pagamento</h2>
            <div className="flex w-full justify-evenly">
                <div className={`flex flex-col items-baseline`}>
                    <span className={`${selected ? '' : 'text-green-700'} font-semibold`}>Dinheiro</span>
                    <div className={`${selected ? 'hidden' : 'flex'} flex-col`}>
                        <label htmlFor="troco">Troco para?</label>
                        <input required
                            aria-label="Insira seu troco"
                            className="w-20 border-[1px] border-solid border-gray-300"
                            type="text"
                            name="troco"
                            id="troco"
                            onChange={(e) => setTroco(e.target.value)}
                            value={troco}
                        />
                    </div>
                </div>
                <ToggleButton selected={selected} setSelected={setSelected} />
                <span className={`${selected ? 'text-green-700 ' : ''} font-semibold`}>Cartão</span>
            </div>
        </div>
    )
}

export default FormaDePagamento;