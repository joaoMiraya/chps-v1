import PropTypes from 'prop-types';


function Note({ setNote, note }) {
    Note.propTypes = {
        setNote: PropTypes.func.isRequired,
        note: PropTypes.string,
    };
    return (

        <div className="mt-6 flex flex-col items-center gap-4 px-6">
            <h2 className="text-xl font-semibold  text-center">Gostaria de adicionar uma nota ao pedido?</h2>
            <textarea
                className="bg-gray-100 p-2"
                name="notaPedido"
                id="notaPedido"
                cols="30"
                rows="5"
                onChange={(e) => setNote(e.target.value)}
                value={note}
                placeholder="Adicione sua nota">
            </textarea>
            <span className='text-center'>Você pode pedir para retirar ingredientes, deixar o ponto ao seu gosto ou outras exigências...</span>
        </div>
    )
}

export default Note;