import Pizzas from "./utils/Pizzas";


function Pizza() {


    return (
        <div className=" pt-12 flex flex-col items-center">
            <h1 className="text-2xl my-4 font-semibold text-center">Pizzas para dividir com a família e amigos</h1>

            <Pizzas />

        </div>
    )
}


export default Pizza;