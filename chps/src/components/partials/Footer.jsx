import { AiOutlineArrowRight } from 'react-icons/ai';

function Footer() {

    const date = new Date();
    const anoAtual = date.getFullYear();

    return (
        <footer>
            <div className=" pt-4 pb-4 flex flex-col items-center justify-center">
                <p className='text-center mb-2'>© chapas lanches - Todos os direitos reservados</p>
                <h1 className=" font-semibold">Desenvolvido por {import.meta.env.VITE_AUTHOR + ' ' + '-' + ' ' + anoAtual}</h1>
                <div className="flex w-full items-center justify-evenly underline">
                    <a tabIndex={0} target="_blank" rel="noreferrer" href='https://portfolio-dev-ten.vercel.app/' className="">Entre em contato</a>
                    <div className='flex items-center'>
                        <a tabIndex={0} href='tel:+5518981628581'>WhatsApp</a>
                        <AiOutlineArrowRight />
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;