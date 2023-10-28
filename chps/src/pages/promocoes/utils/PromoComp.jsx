import img from '../.././../assets/images/bannerPromo.jpg';


function PromoComp() {

    return (

        <>
            <div className='relative'>
            {/* <h2 className="text-2xl font-semibold top-12 absolute text-white ">Promoções disponíveis</h2> */}
                <img className='h-[80vh]' src={img} alt="background-image" />
            </div>
        </>
    )
}

export default PromoComp;