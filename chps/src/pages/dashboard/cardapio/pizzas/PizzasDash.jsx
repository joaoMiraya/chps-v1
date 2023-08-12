import AddPizza from "./utils/AddPizza";
import PizzasDashComp from "./PizzasDashComp";

function PizzasDash() {

    return (
        <div className="flex">
            <div className="flex flex-col w-1/3 h-screen p-6 border-r-2 border-gray-300 border-solid shadow-2xl">
                <h2 className="text-xl text-center">Adicionar nova pizza</h2>
                <AddPizza />
            </div>
            <div className="flex flex-col w-full">
                <h1 className="text-2xl font-semibold text-center">Pizzas do Cardápio</h1>
                <PizzasDashComp />
            </div>
        </div>
    )
}


export default PizzasDash;