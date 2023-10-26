import MesaCard from "../../components/utils/cards/MesaCard";


function Mesas() {

    const nMesas = 50;
    const mesas = [];

    for (let i = 1; i <= nMesas; i++) {
        mesas.push(i);
    };

    return (
        <>
            <h2 className='text-3xl text-center pt-12 font-semibold'>Mesas</h2>
            <div className="flex flex-wrap gap-4  pt-12 justify-center items-center">

                {mesas.map((mesa) => {

                    return (
                        <MesaCard key={mesa} mesaNumero={mesa} />

                    )
                })}
            </div>
        </>
    )

}

export default Mesas;