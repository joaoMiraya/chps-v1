import { useSelector } from "react-redux";


function Menu() {

    const { bgHeader, logoHeader } = useSelector((state) => state.images);

    return (
        <div className="container flex flex-col h-screen">
            <h1>Menu</h1>

            <div id="carouselExample" className="carousel slide">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={bgHeader} className="d-block w-100" alt="carousel-image" />
                    </div>
                    <div className="carousel-item">
                        <img src={logoHeader} className="d-block w-100" alt="carousel-image" />
                    </div>
                    <div className="carousel-item">
                        <img src={bgHeader} className="d-block w-100" alt="carousel-image" />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}

export default Menu;