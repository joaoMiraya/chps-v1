import MesaCard from "../../components/utils/cards/MesaCard";


function Mesas() {

    const nMesas = 16;
    const mesas = [];

    for (let i = 1; i <= nMesas; i++) {
        mesas.push(<MesaCard key={i} mesaNumero={i} />);
    };

    return (
        <>
            <h2 className='text-3xl text-center pt-12 font-semibold'>Mesas</h2>
            <div className="flex flex-wrap gap-4  pt-12 justify-center items-center">
                {mesas}
            </div>
        </>
    )

}

export default Mesas;