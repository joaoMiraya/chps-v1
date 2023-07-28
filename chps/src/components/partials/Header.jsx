import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { AiOutlineMenu, AiOutlineMenuUnfold } from 'react-icons/ai';

function Header({ handleOpen, handleClose, openMenuHambRef, closeMenuHambRef }) {
    Header.propTypes = {
        handleOpen: PropTypes.func.isRequired,
        handleClose: PropTypes.func.isRequired,
        closeMenuHambRef: PropTypes.object.isRequired,
        openMenuHambRef: PropTypes.object.isRequired,
    };

    /* RECEBENDO IMAGENS ESTÁTICAS DO HEADER */
    const { bgHeader, logoHeader } = useSelector((state) => state.images);
    const { isAdm } = useSelector((state) => state.auth);

    return (
        <header className="linear-gradient min-h-[80px]">
            <nav>
                <div className=" relative flex justify-between items-center">
                    <img rel="preconnect" src={bgHeader} className=' md:hidden object-none w-full h-full absolute top-4 overflow-visible z-40' alt="Imagem de fundo" />
                    <div>
                        <Link aria-label="Início" tabIndex={0} to={"/"}><img src={logoHeader} className=' z-50 absolute left-2 top-0 cursor-pointer hover:opacity-80' height={80} width={80} alt="Chapa's Logo" /></Link>
                    </div>
                    <div className=" hidden gap-4 relative top-14 md:flex md:items-end text-white mr-4 ">
                        <Link aria-label='Navegar para menu' className='hover:opacity-80' to={"/menu"}>Cardápio</Link>
                        <Link aria-label='Navegar para perfil' className='hover:opacity-80' to={"/perfil"}>Perfil</Link>
                        <Link aria-label='Navegar para carrinho' className='hover:opacity-80' to={"/carrinho"}>Carrinho</Link>
                        <Link aria-label='Navegar para home' className='hover:opacity-80' to={"/"}>Home</Link>
                        <Link aria-label='Navegar para termos' className='hover:opacity-80' to={"/termos-e-politicas"}>Termos e Políticas</Link>
                        {isAdm ? <Link aria-label='Navegar para termos' to={"/dashboard"}>Dashboard</Link> : ''}
                    </div>
                    <div className=" md:hidden relative top-8 text-white">
                        <button ref={openMenuHambRef} className='p-2 relative z-40' onClick={handleOpen} aria-label='Botão para abrir menu' >
                            <AiOutlineMenu size={30} />
                        </button>
                        <button ref={closeMenuHambRef} className='p-2 relative z-40 hidden' onClick={handleClose} aria-label='Botão para fechar menu'>
                            <AiOutlineMenuUnfold size={30} />
                        </button>
                        {/*   {
                            menu ? <AiOutlineMenuUnfold aria-label='Fechar menu' size={25} onClick={handleCloseMenu} />
                                : <AiOutlineMenu tabIndex={0} aria-label='Abrir menu' size={25} onClick={handleOpenMenu} />
                        } */}
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;