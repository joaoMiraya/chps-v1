import { Link } from 'react-router-dom';
import logo from '/android/android-launchericon-96-96.png';

function Logo() {

    return (
        <>
            <Link to={"/"}><img src={logo} alt="Chapas logo" /></Link>
        </>
    )
}

export default Logo;