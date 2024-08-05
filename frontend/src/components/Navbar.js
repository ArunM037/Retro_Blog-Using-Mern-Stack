import { Link, useNavigate } from "react-router-dom"
import { useLogout } from '../Hooks/useLogout'
import { useAuthContext } from '../Hooks/useAuthContext'
const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const navigate = useNavigate()

    const handleClick = () => {
        logout()
    }

    const handleClick1 = () => {
        navigate('/profile')
    }
    return (
        <nav className="navbar">
            <Link to='/'><h1>RetroBlog</h1></Link>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/create">Create Blog</Link>
                <Link to="/About">About Us</Link>
            </div>
            <div className="nav-auth">
                {user && (
                    <div>
                        <span className="material-symbols-outlined" onClick={handleClick1} >Person</span>
                        <button onClick={handleClick}>Logout</button>
                    </div>
                )}
                {!user && (
                    <div>
                        <Link to="/login">Login </Link>
                        <Link to="/signup">Signup</Link>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
