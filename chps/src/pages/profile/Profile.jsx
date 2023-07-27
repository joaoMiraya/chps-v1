import LogoutBtn from "../../components/utils/buttons/LogoutBtn";

function Profile() {

    return (
        <div className=" flex flex-col h-screen">
            <div className="flex w-full justify-end p-4">
                <LogoutBtn />
            </div>
        </div>
    )
}


export default Profile;