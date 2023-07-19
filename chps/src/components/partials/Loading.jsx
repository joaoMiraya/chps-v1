import { useSelector } from "react-redux";


function Loading() {

    const { bgHeader } = useSelector((state) => state.images);

    return (
        <div className=" linear-gradient h-screen justify-center items-center relative">
            <img className="loadingAnimate absolute" src={bgHeader} alt="lanche-image" />
        </div>
    )
}

export default Loading;