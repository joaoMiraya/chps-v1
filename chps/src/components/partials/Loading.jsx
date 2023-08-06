import logo from '/windows11/SmallTile.scale-400.png'
function Loading() {

    return (
        <div className=" linear-gradient flex h-screen justify-center items-center relative">
            <div>
                <img src={logo} alt="background-image" />
                <h1 className='text-3xl font-semibold text-white text-center mt-4'>Carregando ...</h1>
            </div>
        </div>
    )
}

export default Loading;