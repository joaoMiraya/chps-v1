import Carousel from "./utils/Carousel";
import MainComp from "./utils/MainComp";
import Bebidas from "../../components/utils/components/Bebidas";

function Menu() {

    return (
        <div className=" flex flex-col ">
            <Carousel />
            <h1 className="text-3xl font-semibold text-center my-6">Está com fome do que hoje?!</h1>
            <main>
                <MainComp />
                <h2 className="text-2xl font-semibold text-start ml-6 mt-6">E para beber?</h2>
                <Bebidas />
            </main>
            <section className="bg-[#FFFFE0] py-16">
                <p className="text-center text-lg px-4">
                    Bem-vindo ao Chapas! Experimente nossos lanches, lanches artesanais,
                    pizzas e porções deliciosas. Cada prato é preparado com carinho para tornar sua refeição única.
                    Peça agora mesmo direto do seu celular e aproveite! Bom apetite!
                </p>
            </section>
        </div>
    )
}

export default Menu;