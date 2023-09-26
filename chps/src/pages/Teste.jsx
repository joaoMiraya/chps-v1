import { print } from "../../server/qz/print";


function Teste() {


    const handlePrint = () => {
        print();
    };
    return (

        <>
            <div className="flex h-screen justify-center items-center">
                <button onClick={handlePrint}>print</button>
            </div>
        </>
    )
}

export default Teste;