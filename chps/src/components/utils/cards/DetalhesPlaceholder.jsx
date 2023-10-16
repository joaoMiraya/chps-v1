

function DetalhesPlaceholder() {

    return (

        <>
            <div className="px-6 pt-12 flex flex-col">
                <span className="bg-gray-200 animate-pulse flex h-[4rem] rounded-xl"></span>
                <div className="flex gap-2 justify-end items-center pt-2">
                    <span className="w-[3rem] h-[1rem] bg-gray-200 animate-pulse rounded-full"></span>
                    <span className="w-[3rem] h-[1rem] bg-gray-200 animate-pulse rounded-full"></span>
                    <span className="w-[3rem] h-[1rem] bg-gray-200 animate-pulse rounded-full"></span>
                </div>
                <div className="h-[40vh] mt-6 flex bg-gray-200 animate-pulse rounded-xl">
                </div>
                <span className="bg-gray-200 animate-pulse flex h-[4rem] rounded-xl my-6"></span>
                <span className="w-[6rem] self-center h-[1rem] bg-gray-200 animate-pulse rounded-full"></span>

            </div>
        </>
    )
}

export default DetalhesPlaceholder;