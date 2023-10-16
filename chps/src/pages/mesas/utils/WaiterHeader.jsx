import Logo from "../../../components/partials/Logo";


function WaiterHeader() {

    return (

        <>
            <header>
                <nav className="flex justify-start items-center py-2 shadow-lg px-12 border-b-[1px] border-solid brder-gray-300">
                    <Logo />
                </nav>
            </header>
        </>
    )
}

export default WaiterHeader;