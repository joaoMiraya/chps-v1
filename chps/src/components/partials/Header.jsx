import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { AiOutlineMenu } from 'react-icons/ai';
import { AiOutlineMenuUnfold } from 'react-icons/ai';


function Header({ menu, bgHeader, logoHeader, handleOpenMenu, handleCloseMenu }) {
    Header.propTypes = {
        menu: PropTypes.bool.isRequired,
        handleOpenMenu: PropTypes.func.isRequired,
        handleCloseMenu: PropTypes.func.isRequired,
        bgHeader: PropTypes.string.isRequired,
        logoHeader: PropTypes.string.isRequired,
    };
    /* RECEBENDO IMAGENS ESTÁTICAS DO HEADER */

    return (
        <header className="linear-gradient min-h-[80px]">
            <nav>
                <div className=" relative flex justify-between items-center">
                    <img src={bgHeader} className=' md:hidden object-none w-full h-full absolute top-4 overflow-visible z-40' alt="Imagem de fundo" />
                    <div>
                        <Link aria-label="Início" tabIndex={1} to={"/"}><img src={logoHeader} className=' z-50 absolute left-2 top-0 cursor-pointer hover:opacity-80' height={60} width={60} alt="Chapa's Logo" /></Link>
                    </div>
                    <ul className=" hidden gap-4 relative top-14 md:flex md:items-end text-white mr-4 ">
                        <Link aria-label='Navegar para menu' to={"/menu"}><li className=' hover:opacity-80'>Cardápio</li></Link>
                        <Link aria-label='Navegar para perfil' to={"/profile"}><li className=' hover:opacity-80'>Perfil</li></Link>
                        <Link aria-label='Navegar para carrinho' to={"/cart"}><li className=' hover:opacity-80'>Carrinho</li></Link>
                        <Link aria-label='Navegar para home' to={"/"}><li className=' hover:opacity-80'>Home</li></Link>
                        <Link aria-label='Navegar para termos' to={"/termos-e-politicas"}><li className=' hover:opacity-80'>Termos e Políticas</li></Link>
                    </ul>
                    <div className=" md:hidden relative top-8 right-2 text-white">
                        {menu ? '' : <AiOutlineMenu tabIndex={2} aria-label='Abrir menu' size={25} onClick={handleOpenMenu} />}
                        {menu ? <AiOutlineMenuUnfold aria-label='Fechar menu' size={25} onClick={handleCloseMenu} /> : ''}
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;