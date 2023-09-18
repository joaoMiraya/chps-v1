

function Localizacao() {

    return (
        <>
            <section className="bg-[#FBD87F60] py-6 mt-6">
                <h2 className="text-2xl font-semibold text-start pl-12 mb-6">Como chegar?</h2>
                <iframe className="w-full h-[350px] " src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3697.2793225089213!2d-51.474949425894266!3d-22.077147179847703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9493f0ff65701365%3A0x367ac5c20f2c12ae!2sR.%20Carlos%20Gomes%2C%2058%20-%20%C3%81lvares%20Machado%2C%20SP%2C%2019160-000!5e0!3m2!1spt-BR!2sbr!4v1695050580731!5m2!1spt-BR!2sbr" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                <p className="text-center my-6">Rua Carlos Gomes, 58 - Centro <br /> Álvares Machado - SP </p>
                <p className="text-center">Próximo à prefeitura municipal</p>
            </section>
        </>
    )


}
export default Localizacao;