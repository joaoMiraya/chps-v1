import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

function MenuHamb({ menu }) {
    MenuHamb.propTypes = {
        menu: PropTypes.bool.isRequired
    };

    return (
        <div className={` bg-gradient-to-b from-[#D4AA3C] to-[#C55300]
         h-screen z-30 flex flex-col items-center justify-between absolute ${menu ? 'right-0' : 'right-full'} min-w-[200px]`}
        >
            <nav>
                <ul className=" text-white text-center mt-20">
                    <Link to={"/menu"}><li className="py-2 px-6 w-full hover:opacity-75">Cardápio</li></Link>
                    <Link to={"/"}><li className="py-2 w-full hover:opacity-75">Carrinho</li></Link>
                    <Link to={"/"}><li className="py-2 w-full hover:opacity-75">Perfil</li></Link>
                    <Link to={"/"}><li className="py-2 w-full hover:opacity-75">Home</li></Link>
                    <Link to={"/"}><li className="py-2 w-full hover:opacity-75">Termos e Politicas</li></Link>
                </ul>

            </nav>
        </div>
    )
}

export default MenuHamb;