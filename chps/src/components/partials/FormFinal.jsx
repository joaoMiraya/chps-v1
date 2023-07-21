


function FormFinal() {
    return (
        <section className="bg-[#D4AA3C] mt-16">
            <form >
                <div className="flex flex-col gap-2 p-4">
                    <h2 className="text-xl font-semibold text-center">Deseja nos enviar uma sugestão?</h2>
                    <label htmlFor="emailMessage">E-mail</label>
                    <input className="bg-transparent border-b-2 border-solid border-[#292929] " type="email" name="emailMessage" id="emailMessage" />

                    <label htmlFor="assuntoMessage">Assunto</label>
                    <input className="bg-transparent border-b-2 border-solid border-[#292929]" type="text" name="assuntoMessage" id="assuntoMessage" />
                    <textarea placeholder="Sua mensagem" className="rounded-md bg-[#937934] p-2" name="mensagemMessage" id="mensagemMessage" cols="30" rows="3" ></textarea>
                    <button className="bg-[#DB0007] font-bold text-xl text-white py-2 ">Enviar</button>
                </div>
            </form>
        </section>
    )
}

export default FormFinal;