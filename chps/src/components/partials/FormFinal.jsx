


function FormFinal() {
    return (
        <section className=" mt-16 ">
            
                <svg className="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#D4AA3C" fillOpacity="1" d="M0,96L16,90.7C32,85,64,75,96,112C128,149,160,235,192,261.3C224,288,256,256,288,250.7C320,245,352,267,384,240C416,213,448,139,480,106.7C512,75,544,85,576,85.3C608,85,640,75,672,96C704,117,736,171,768,181.3C800,192,832,160,864,149.3C896,139,928,149,960,138.7C992,128,1024,96,1056,112C1088,128,1120,192,1152,186.7C1184,181,1216,107,1248,96C1280,85,1312,139,1344,154.7C1376,171,1408,149,1424,138.7L1440,128L1440,320L1424,320C1408,320,1376,320,1344,320C1312,320,1280,320,1248,320C1216,320,1184,320,1152,320C1120,320,1088,320,1056,320C1024,320,992,320,960,320C928,320,896,320,864,320C832,320,800,320,768,320C736,320,704,320,672,320C640,320,608,320,576,320C544,320,512,320,480,320C448,320,416,320,384,320C352,320,320,320,288,320C256,320,224,320,192,320C160,320,128,320,96,320C64,320,32,320,16,320L0,320Z"></path></svg>
            
            <div className="bg-[#D4AA3C]">
                <form >
                    <div className="flex flex-col gap-2 p-4">
                        <h2 className="text-xl font-semibold text-center">Deseja nos enviar uma sugestão?</h2>
                        <label htmlFor="emailMessage">E-mail</label>
                        <input className="bg-transparent border-b-2 border-solid border-[#292929] " type="email" name="emailMessage" id="emailMessage" />

                        <label htmlFor="assuntoMessage">Assunto</label>
                        <input className="bg-transparent border-b-2 border-solid border-[#292929]" type="text" name="assuntoMessage" id="assuntoMessage" />

                        <label htmlFor="mensagemMessage">Sua mensagem</label>
                        <textarea className="rounded-md bg-[#937934] p-2" name="mensagemMessage" id="mensagemMessage" cols="30" rows="3" ></textarea>
                        <button className="bg-[#DB0007] font-bold text-xl text-white py-2 ">Enviar</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default FormFinal;