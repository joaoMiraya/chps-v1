import { Link } from 'react-router-dom';


function NotFound() {
    return (
        <>
            <div className="flex h-screen bg-[#FDF9EE] absolute">
                <img src={''} alt="404" className=" object-contain" />
            </div>
            <h1 className="absolute top-20 text-center text-3xl font-light text-amber-900">O caminho que você está tentando chegar não leva a nada</h1>
            <div className=" absolute bottom-20 left-1/2">
                <Link to={"/"} className=" bg-[#FDF9EE] shadow-xl border-[1px] border-[#b6b0a0] px-8 py-2 font-semibold text-amber-900  ">VOLTAR</Link>
            </div>
        </>

    )
}

export default NotFound;