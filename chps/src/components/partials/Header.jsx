import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineMenu, AiOutlineMenuUnfold } from 'react-icons/ai';
import logoHeader from '/windows11/SmallTile.scale-200.png'
import { useEffect } from 'react';
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from '../../services/firebase/firebase';
import { setBgHeaderUrl } from '../../services/redux/images/imageSlice';

function Header({ handleOpen, handleClose, openMenuHambRef, closeMenuHambRef }) {
    Header.propTypes = {
        handleOpen: PropTypes.func.isRequired,
        handleClose: PropTypes.func.isRequired,
        closeMenuHambRef: PropTypes.object.isRequired,
        openMenuHambRef: PropTypes.object.isRequired,
    };

    const dispatch = useDispatch();

    /* RECEBENDO IMAGENS ESTÁTICAS DO HEADER */
    const { bgHeader } = useSelector((state) => state.images);

    const { isAdm } = useSelector((state) => state.auth);

    /* REQUISIÇÕES DAS IMAGENS ESTÁTICAS DA APLICAÇÃO */
    useEffect(() => {
        if (!bgHeader) {
            const fetchImageUrls = async () => {
                const bgHeaderReference = ref(storage, 'images-app/lanchebg.png');
                /* REQUISIÇÃO DA IMAGEM DE FUNDO DO HEADER */
                try {
                    const headerBgUrl = await getDownloadURL(bgHeaderReference);
                    dispatch(setBgHeaderUrl(headerBgUrl));
                } catch (error) {
                    console.error('Erro ao obter a URL da imagem:', error);
                }
            };
            fetchImageUrls();
        } else {
            return
        }
    }, [dispatch]);



    return (
        <header className="linear-gradient min-h-[80px]">
            <nav>
                <div className=" flex justify-between items-center">
                    <img rel="preconnect" src={bgHeader} className=' md:hidden object-contain z-40 bg-center absolute' alt="Imagem de fundo" />
                    <div>
                        <Link aria-label="Início" tabIndex={0} to={"/"}><img src={logoHeader} className=' z-50 absolute left-2 top-0 cursor-pointer hover:opacity-80' height={80} width={80} alt="Chapa's Logo" /></Link>
                    </div>
                    <div className=" hidden gap-4 relative top-14 md:flex md:items-end text-white mr-4 ">
                        <Link tabIndex={0} aria-label='Navegar para menu' className='hover:opacity-80' to={"/menu"}>Cardápio</Link>
                        <Link tabIndex={0} aria-label='Navegar para perfil' className='hover:opacity-80' to={"/perfil"}>Perfil</Link>
                        <Link tabIndex={0} aria-label='Navegar para carrinho' className='hover:opacity-80' to={"/carrinho"}>Carrinho</Link>
                        <Link tabIndex={0} aria-label='Navegar para home' className='hover:opacity-80' to={"/"}>Home</Link>
                        <Link tabIndex={0} aria-label='Navegar para termos' className='hover:opacity-80' to={"/termos-e-politicas"}>Termos e Políticas</Link>
                        {isAdm ? <Link aria-label='Navegar para dashboard' to={"/dashboard"}>Dashboard</Link> : ''}
                    </div>
                    <div className=" md:hidden relative top-8 text-white">
                        <button tabIndex={0} ref={openMenuHambRef} className='p-2 relative z-40' onClick={handleOpen} aria-label='Botão para abrir menu' >
                            <AiOutlineMenu size={30} />
                        </button>
                        <button tabIndex={0} ref={closeMenuHambRef} className='p-2 relative z-40 hidden' onClick={handleClose} aria-label='Botão para fechar menu'>
                            <AiOutlineMenuUnfold size={30} />
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;