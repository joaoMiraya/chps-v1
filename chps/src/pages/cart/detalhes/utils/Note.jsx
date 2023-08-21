import { CiStickyNote } from 'react-icons/ci';
import PropTypes from 'prop-types';


function Note({ setNote, note, handleSaveChanges }) {
    Note.propTypes = {
        setNote: PropTypes.func.isRequired,
        note: PropTypes.string.isRequired,
        handleSaveChanges: PropTypes.func.isRequired,
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
            <button onClick={handleSaveChanges} className=" rounded-sm shadow-inner cursor-pointer border-[1px] border-solid border-gray-300 items-center py-2 w-full flex justify-center"><CiStickyNote size={25} /> Adicionar nota</button>
        </div>
    )
}

export default Note;