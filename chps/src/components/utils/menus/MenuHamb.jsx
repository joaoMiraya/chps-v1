import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";

function MenuHamb({ menuHambRef }) {
    MenuHamb.propTypes = {
        menuHambRef: PropTypes.instanceOf(Object).isRequired,
    };
    const { isWaiter } = useSelector(state => state.auth);
    return (
        <aside aria-label="Menu lateral" ref={menuHambRef} className="bg-gradient-to-b from-[#D4AA3C] to-[#C55300] h-screen flex flex-col items-center justify-between absolute z-30 hiddeMenu min-w-[200px]">
            <nav>
                <div className=" text-white text-center mt-32  flex flex-col">
                    <Link aria-label="Navegar para cardápio" to={"/mesas"} className={`z-40 py-2 px-6 w-full hover:opacity-75 ${isWaiter ? 'inline' :'hidden'}`}>Mesas</Link>
                    <Link aria-label="Navegar para cardápio" to={"/menu"} className=" z-40 py-2 px-6 w-full hover:opacity-75">Cardápio</Link>
                    <Link aria-label="Navegar para carrinho" to={"/carrinho"} className=" z-40 py-2 w-full hover:opacity-75">Carrinho</Link>
                    <Link aria-label="Navegar para perfil" to={"/perfil"} className=" z-40 py-2 w-full hover:opacity-75">Perfil</Link>
                    <Link aria-label="Navegar para home" to={"/"} className=" z-40 py-2 w-full hover:opacity-75">Home</Link>
                    <Link aria-label="Navegar para termos e politicas" to={"/termos-e-politicas"} className=" z-40 py-2 w-full hover:opacity-75">Termos e Politicas</Link>
                </div>

            </nav>
        </aside>
    )
}

export default MenuHamb;