
function MenuPlaceholder() {

    return (

        <>
            <div className=" flex flex-col py-12 px-6 gap-4">
                <span className="bg-gray-100 animate-pulse h-[2rem] flex rounded-xl "></span>
                <div className="flex gap-4">
                    <span className="h-[8rem] w-[8rem] bg-gray-100 animate-pulse block rounded-xl"></span>
                    <span className="h-[8rem] w-[8rem] bg-gray-100 animate-pulse block rounded-xl"></span>
                </div>
                <span className="bg-gray-100 animate-pulse h-[2rem] flex rounded-xl"></span>
                <div className="flex gap-4">
                    <span className="h-[8rem] w-[8rem] bg-gray-100 animate-pulse block rounded-xl"></span>
                    <span className="h-[8rem] w-[8rem] bg-gray-100 animate-pulse block rounded-xl"></span>
                </div>
                <span className="bg-gray-100 animate-pulse h-[2rem] flex rounded-xl"></span>

            </div>
        </>
    )
};

export default MenuPlaceholder;