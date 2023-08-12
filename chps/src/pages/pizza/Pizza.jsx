import Pizzas from "./utils/Pizzas";


function Pizza() {


    return (
        <div className=" pt-12 flex flex-col items-center">
            <h1 className="text-2xl my-4 font-semibold">Pizzas</h1>

            <Pizzas />

        </div>
    )
}


export default Pizza;