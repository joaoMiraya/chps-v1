import Logo from "../../../components/partials/Logo";

function Header() {

    return (
        <>
            <header>
                <nav className="flex justify-start items-center py-2  px-12 border-b-[1px] border-solid brder-gray-300">
                    <Logo />
                </nav>
            </header>
        </>
    )
}

export default Header;