import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineInfoCircle } from 'react-icons/ai';
import BebidasSection from "../../components/utils/cards/BebidasSection";
import AcrescimoSection from "../../components/utils/cards/AcrescimoSection";
import IncresDecresBtn from "../../components/utils/buttons/IncresDecresBtn";
import { useParams } from "react-router-dom";
import { fetchLanches } from "../../services/redux/items/lanchesSlice";
import Loading from '../../components/partials/Loading';



function LancheDetalhes() {

    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLanches());
    }, [dispatch]);

    const { lanches } = useSelector(state => state.lanches);
    const lanche = lanches.find((lanche) => lanche.id === id);


    if (!lanche) {
        return <Loading />
    }

    return (
        <>
            <div className="p-4 w-full overflow-hidden">

                <div className="my-4">
                    <h1 className="text-3xl font-semibold">{lanche.nome}</h1>
                    <span>Valor und: {lanche.valor}</span>
                </div>
                <div className="">
                    <img src={lanche.imagem} alt={lanche.nome} />
                </div>
                <p className="text-center">
                    {lanche.ingredientes}
                </p>
                <div className="flex flex-col items-center my-4 ">
                    <IncresDecresBtn />
                    <AcrescimoSection />
                    <div className="flex justify-center text-center my-4 bg-[#9C9C9C40] p-2 rounded-xl">
                        <span className="mb-4"><AiOutlineInfoCircle color="#9C9C9C" size={25} />Você pode remover ingredientes adicionando uma nota na hora de finalizar o pedido</span>
                    </div>
                    <BebidasSection />
                </div>

            </div>
            <button className=" w-full bg-[#FFBC0D] py-3 text-xl font-medium  fixed bottom-0 left-0">Adicionar ao carrinho</button>

        </>
    )
}


export default LancheDetalhes;