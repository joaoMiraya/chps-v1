import { useState } from "react";

function NextStepForm() {


    const [bairro, setBairro] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [nome, setNome] = useState('');
    const [tel, setTel] = useState('');

    return (

        <div>
            <form >
                <div className="flex flex-col ">
                    <label htmlFor="nome">Seu nome</label>
                    <input
                        className="border-b-[1px] border-solid border-gray-300"
                        name="nome"
                        id="nome"
                        required
                        type="text"
                        onChange={(e) => setNome(e.target.value)}
                        value={nome}
                    />
                    <label htmlFor="tel">Seu telefone</label>
                    <input
                        className="border-b-[1px] border-solid border-gray-300"
                        name="tel"
                        id="tel"
                        required
                        type="text"
                        onChange={(e) => setTel(e.target.value)}
                        value={tel}
                    />
                    <label htmlFor="bairro">Bairro</label>
                    <input
                        className="border-b-[1px] border-solid border-gray-300"
                        name="bairro"
                        id="bairro"
                        required
                        type="text"
                        onChange={(e) => setBairro(e.target.value)}
                        value={bairro}
                    />
                    <label htmlFor="rua">Rua</label>
                    <input
                        className="border-b-[1px] border-solid border-gray-300"
                        name="rua"
                        id="rua"
                        required
                        type="text"
                        onChange={(e) => setRua(e.target.value)}
                        value={rua}
                    />
                    <label htmlFor="nmrCasa">Numero Casa</label>
                    <input
                        className="border-b-[1px] border-solid border-gray-300"
                        name="nmrCasa"
                        id="nmrCasa"
                        required
                        type="text"
                        onChange={(e) => setNumero(e.target.value)}
                        value={numero}
                    />
                </div>
            </form>
        </div>
    )
}

export default NextStepForm;