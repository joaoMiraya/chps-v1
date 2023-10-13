import { BsFacebook, BsInstagram, BsWhatsapp } from 'react-icons/bs';
import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';

function FormFinal() {

    const form = useRef();
    const [email, setEmail] = useState('');
    const [assunto, setAssunto] = useState('');
    const [nome, setNome] = useState('');
    const [mensagem, setMensagem] = useState('');

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(import.meta.env.VITE_EMAIL_SERVICE_ID, import.meta.env.VITE_EMAIL_TEAMPLATE_ID, form.current, import.meta.env.VITE_EMAIL_PUBLIC_KEY)
            .then((result) => {
                console.log(result.text);
                setEmail('')
                setAssunto('')
                setMensagem('')
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <section className=" mt-32 flex flex-col max-w-screen overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#D4AA3C" fillOpacity="1" d="M0,64L30,90.7C60,117,120,171,180,170.7C240,171,300,117,360,117.3C420,117,480,171,540,192C600,213,660,203,720,202.7C780,203,840,213,900,192C960,171,1020,117,1080,122.7C1140,128,1200,192,1260,186.7C1320,181,1380,107,1410,69.3L1440,32L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path>
            </svg>
            <div className="bg-[#D4AA3C] pb-6">

                <form ref={form} onSubmit={sendEmail} >
                    <div className="flex flex-col gap-2 p-6">
                        <h2 className="text-xl font-semibold text-center">Deseja nos enviar uma sugestão?</h2>
                        <label htmlFor="nome">Nome</label>
                        <input
                            aria-label="Digite seu nome para enviar sugestão"
                            className="bg-transparent border-b-2 border-solid border-[#292929] "
                            type="text"
                            name="nome"
                            id="nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />

                        <label htmlFor="email">E-mail</label>
                        <input
                            aria-label="Digite seu e-mail para enviar sugestão"
                            className="bg-transparent border-b-2 border-solid border-[#292929] "
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <label htmlFor="assunto">Assunto</label>
                        <input
                            aria-label="Digite o assunto da sugestão"
                            className="bg-transparent border-b-2 border-solid border-[#292929]"
                            type="text"
                            name="assunto"
                            id="assunto"
                            value={assunto}
                            onChange={(e) => setAssunto(e.target.value)}
                        />

                        <label htmlFor="mensagem">Sua mensagem</label>
                        <div className="rounded-md bg-[#937934]">
                            <textarea
                                aria-label="Digite a sua sugestão"
                                className=" bg-transparent p-2"
                                name="mensagem"
                                id="mensagem"
                                cols="30" rows="3"
                                value={mensagem}
                                onChange={(e) => setMensagem(e.target.value)}
                            >
                            </textarea>
                        </div>
                        <button type="submit" aria-label="Botão para enviar sua sugestão" className="bg-[#DB0007] font-bold text-xl text-white py-2 ">Enviar</button>
                    </div>
                </form>

                <h2 className="text-2xl font-semibold text-center">Acompanhe nossas redes sociais</h2>
                <div className='flex justify-center gap-6 pt-6'>
                    <a href='https://www.facebook.com/profile.php?id=100058972426609' target='_blank'><BsFacebook size={30} /></a>
                    <a href='https://www.instagram.com/chapaslanchees/' target='_blank'><BsInstagram size={30} /></a>
                    <a href='tel:+5518996149007'><BsWhatsapp size={30} /></a>
                </div>
            </div>
        </section>
    )
}

export default FormFinal;