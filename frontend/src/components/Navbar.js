import { Link } from "react-router-dom"
const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to='/'><h1>RetroBlog</h1></Link>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/create">Create Blog</Link>
                <Link to="/About">About Us</Link>
            </div>
            <div className="nav-auth">
                <Link to="/login">Login </Link>
                <Link to="/signup">Signup</Link>
            </div>
        </nav>
    );
}

export default Navbar;
