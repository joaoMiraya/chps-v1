import { useState } from "react";
import { useDispatch } from 'react-redux';
import { getUser } from "../../services/redux/users/usersSlice";
import { getDate } from "../../javascript/main";
import { addNpsDoc } from "../../services/redux/app/appSlice";
import Cookies from "js-cookie";

function NpsComp() {

    const [nota, setNota] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const [comp, setComp] = useState(false);
    const [question, setQuestion] = useState('');
    const [selected, setSelected] = useState(null);
    const [opnion, setOpnion] = useState('');
    const [submiting, setSubmiting] = useState(false);

    const dispatch = useDispatch();

    const handleSetNote = (number) => {
        setSelected(number);
        setComp(true);
        switch (true) {
            case number >= 0 && number <= 3:
                setQuestion("Pode nos dizer o que aconteceu?");
                break;
            case number >= 4 && number <= 6:
                setQuestion("Como podemos melhorar?");
                break;
            case number >= 7 && number <= 8:
                setQuestion("Como teremos nota 10?");
                break;
            case number >= 9 && number <= 10:
                setQuestion("Obrigado! Pode nos dizer o que mais gostou?");
                break;
            default:
                setQuestion("");
                setComp(false);
                break;
        }
    };

    const handleSubmitNps = async (e) => {
        e.preventDefault();
        setSubmiting(true);
        const { uid } = await getUser();
        const nps = {
            Nota: selected,
            Question: question,
            Motivo: opnion,
            Uid: uid,
            Data: getDate()
        };
        dispatch(addNpsDoc(nps))
        Cookies.set("Nps", true, { expires: 90 })
        setSubmiting(false);
        setQuestion('');
        window.location.reload();
    };

    return (

        <>
            <div className="flex flex-col items-center justify-center">
                <h2 className=" font-semibold text-center py-4">Qual a chance de você recomendar o Chapa's para a sua familia e amigos?!</h2>
                <div className="flex gap-1 shadow-inner bg-stone-200 p-2 rounded-full">
                    {nota.map((number) => {
                        return (
                            <span key={number} className={`${selected === number ? 'bg-red-200' : 'bg-white'}  hover:scale-110 w-[1.7rem]  h-[1.7rem] flex justify-center items-center font-semibold border-solid border-2 text-stone-600 border-red-300 rounded-full relative`}>
                                <label htmlFor={`nota${number}`}>{number}</label>
                                <input onClick={() => handleSetNote(number)} className="absolute cursor-pointer opacity-0" type="radio" name={`nota`} id={`nota${number}`} value={number} />
                            </span>
                        )
                    })}
                </div>
                <div className={`${!comp ? 'hidden' : 'flex'} px-6`}>
                    <form onSubmit={(e) => handleSubmitNps(e)} >
                        <div className="flex flex-col mt-4">
                            <label className="font-bold text-red-400 text-center" htmlFor="tip">{question}</label>
                            <textarea
                                className="bg-stone-100 p-2 rounded-xl shadow-md"
                                name="tip"
                                id="tip"
                                cols="30"
                                rows="5" placeholder="Deixe aqui sua opinião"
                                onChange={(e) => setOpnion(e.target.value)}
                                value={opnion}
                            >
                            </textarea>
                            <button disabled={submiting} type="submit" className={`${submiting ? 'opacity-70' : ''} bg-[#D4AA3C] py-2 rounded-full drop-shadow-md mt-6 font-semibold`}>
                                {submiting ?
                                    <div className="spinner-border h-6 w-6" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    : 'Enviar'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default NpsComp;