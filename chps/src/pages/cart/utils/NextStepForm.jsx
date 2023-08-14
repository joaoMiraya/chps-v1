import { useState } from "react";

import FormaDePagamento from "./FormaDePagamento";

function NextStepForm() {

    const [selected, setSelected] = useState(false);

    const [troco, setTroco] = useState('');

    const [bairro, setBairro] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [nome, setNome] = useState('');
    const [tel, setTel] = useState('');

    return (

        <div>
            <form >
                <div className="flex flex-col ">
                    <label className="ml-4" htmlFor="nome">Seu nome</label>
                    <input
                        aria-label="Insira seu nome"
                        className="border-b-[1px] border-solid border-gray-300"
                        name="nome"
                        id="nome"
                        required
                        type="text"
                        onChange={(e) => setNome(e.target.value)}
                        value={nome}
                    />
                    <label className="ml-4" htmlFor="tel">Seu telefone</label>
                    <input
                        aria-label="Insira seu telefone"
                        className="border-b-[1px] border-solid border-gray-300"
                        name="tel"
                        id="tel"
                        required
                        type="text"
                        onChange={(e) => setTel(e.target.value)}
                        value={tel}
                    />
                    <label className="ml-4" htmlFor="bairro">Bairro</label>
                    <input
                        aria-label="Insira seu bairro"
                        className="border-b-[1px] border-solid border-gray-300"
                        name="bairro"
                        id="bairro"
                        required
                        type="text"
                        onChange={(e) => setBairro(e.target.value)}
                        value={bairro}
                    />
                    <label className="ml-4" htmlFor="rua">Rua</label>
                    <input
                        aria-label="Insira sua rua"
                        className="border-b-[1px] border-solid border-gray-300"
                        name="rua"
                        id="rua"
                        required
                        type="text"
                        onChange={(e) => setRua(e.target.value)}
                        value={rua}
                    />
                    <label className="ml-4" htmlFor="nmrCasa">Numero Casa</label>
                    <input
                        aria-label="Insira seu numero da casa"
                        className="border-b-[1px] border-solid border-gray-300"
                        name="nmrCasa"
                        id="nmrCasa"
                        required
                        type="text"
                        onChange={(e) => setNumero(e.target.value)}
                        value={numero}
                    />
                    <FormaDePagamento
                        selected={selected}
                        setSelected={setSelected}
                        troco={troco}
                        setTroco={setTroco}
                    />

                </div>
            </form>
        </div>
    )
}

export default NextStepForm;