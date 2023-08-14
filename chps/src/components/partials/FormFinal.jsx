
import { Link } from 'react-router-dom';

function FormFinal() {
    return (
        <section className=" mt-12 ">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#D4AA3C" fillOpacity="1" d="M0,64L30,90.7C60,117,120,171,180,170.7C240,171,300,117,360,117.3C420,117,480,171,540,192C600,213,660,203,720,202.7C780,203,840,213,900,192C960,171,1020,117,1080,122.7C1140,128,1200,192,1260,186.7C1320,181,1380,107,1410,69.3L1440,32L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path>
            </svg>
            <div className="bg-[#D4AA3C] pb-6">
                <form >
                    <div className="flex flex-col gap-2 p-4">
                        <h2 className="text-xl font-semibold text-center">Deseja nos enviar uma sugestão?</h2>
                        <label htmlFor="emailMessage">E-mail</label>
                        <input aria-label="Digite seu e-mail para enviar sugestão" className="bg-transparent border-b-2 border-solid border-[#292929] " type="email" name="emailMessage" id="emailMessage" />

                        <label htmlFor="assuntoMessage">Assunto</label>
                        <input aria-label="Digite o assunto da sugestão" className="bg-transparent border-b-2 border-solid border-[#292929]" type="text" name="assuntoMessage" id="assuntoMessage" />

                        <label htmlFor="mensagemMessage">Sua mensagem</label>
                        <textarea aria-label="Digite a sua sugestão" className="rounded-md bg-[#937934] p-2" name="mensagemMessage" id="mensagemMessage" cols="30" rows="3" ></textarea>
                        <button type="submit" aria-label="Botão para enviar sua sugestão" className="bg-[#DB0007] font-bold text-xl text-white py-2 ">Enviar</button>
                    </div>
                </form>
                <div>
                    <h2 className="font-semibold text-2xl text-center my-2">Dúvidas?</h2>
                    <ul className="flex underline gap-6 font-semibold  pl-6">
                        <Link aria-label='Contato' tabIndex={0} to={"/contato"}>Contato</Link>
                        <Link aria-label='Como chegar?' tabIndex={0} to={"/como-chegar"}>Como chegar</Link>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default FormFinal;