import {Link} from 'react-router-dom'
const NavBar=()=>{
    return (
        <>
        <nav>
            <Link to="./pages/SignUpPage"></Link>
            <Link to="./pages/LoginPage"></Link>
        </nav>
        </>
    )
}
export default NavBar;