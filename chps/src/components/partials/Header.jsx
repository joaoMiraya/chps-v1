import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineMenuUnfold } from 'react-icons/ai';
import { useSelector } from 'react-redux';


function Header({ menu, handleOpenMenu, handleCloseMenu }) {
    Header.propTypes = {
        menu: PropTypes.bool.isRequired,
        handleOpenMenu: PropTypes.func.isRequired,
        handleCloseMenu: PropTypes.func.isRequired,
    };

    /* RECEBENDO IMAGENS ESTÁTICAS DO HEADER */
    const { bgHeader, logoHeader } = useSelector((state) => state.images);

    return (
        <header className="linear-gradient min-h-[80px]">
            <nav>
                <div className=" relative flex justify-between items-center">
                    <img src={bgHeader} className=' md:hidden object-none w-full h-full absolute top-4 overflow-visible z-40' alt="Imagem de fundo" />
                    <div>
                        <Link aria-label="Início" tabIndex={1} to={"/"}><img src={logoHeader} className=' z-50 absolute left-2 top-0 cursor-pointer hover:opacity-80' height={60} width={60} alt="Chapa's Logo" /></Link>
                    </div>
                    <div className=" hidden gap-4 relative top-14 md:flex md:items-end text-white mr-4 ">
                        <Link aria-label='Navegar para menu' className='hover:opacity-80' to={"/menu"}>Cardápio</Link>
                        <Link aria-label='Navegar para perfil' className='hover:opacity-80' to={"/perfil"}>Perfil</Link>
                        <Link aria-label='Navegar para carrinho' className='hover:opacity-80' to={"/carrinho"}>Carrinho</Link>
                        <Link aria-label='Navegar para home' className='hover:opacity-80' to={"/"}>Home</Link>
                        <Link aria-label='Navegar para termos' className='hover:opacity-80' to={"/termos-e-politicas"}>Termos e Políticas</Link>
                    </div>
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