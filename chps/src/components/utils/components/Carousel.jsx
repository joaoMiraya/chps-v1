

function Carousel({ image1, image2, image3 }) {

    return (

        <div id="carousel" className="carousel slide" data-bs-interval="4000" data-bs-ride="carousel">
            <div className="carousel-inner h-[14rem] md:h-[25rem] overflow-hidden">
                <div className="carousel-item active">
                    <img src={image1} className="d-block w-100 " alt="carousel-image" />
                </div>
                <div className="carousel-item">
                    <img src={image2} className="d-block w-100 " alt="carousel-image" />
                </div>
                <div className="carousel-item">
                    <img src={image3} className="d-block w-100 " alt="carousel-image" />
                </div>
            </div>
            <button className="carousel-control-prev mt-12" type="button" data-bs-target="#carousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next mt-12" type="button" data-bs-target="#carousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}

export default Carousel;