import PropTypes from 'prop-types';


function Note({ setNote, note }) {
    Note.propTypes = {
        setNote: PropTypes.func.isRequired,
        note: PropTypes.string,
    };
    return (

        <div className="my-6 flex flex-col items-center gap-4">
            <h2 className="text-xl font-semibold  text-center">Gostaria de adicionar alguma exigência ao pedido?</h2>
            <textarea
                className="bg-gray-200 rounded-md shadow-md p-2"
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