

function EntregaPlaceholder() {

    return (

        <>
            <div className="flex flex-col">
                <div className="flex h-[30vh] bg-gray-200 rounded-md animate-pulse">
                </div>
                <span className="bg-gray-200 h-[2rem] animate-pulse mt-2 flex rounded-lg"></span>
                <span className="bg-gray-200 h-[2rem] mt-2 animate-pulse flex rounded-lg"></span>
                <span className="bg-gray-200 h-[2rem] mt-2 animate-pulse flex rounded-lg"></span>

                <span className="bg-gray-200 h-[6rem] mt-12 animate-pulse flex rounded-lg"></span>

                <span className="bg-gray-200 h-[3rem] mt-12 animate-pulse flex rounded-lg"></span>
            </div>
        </>
    )
};

export default EntregaPlaceholder;