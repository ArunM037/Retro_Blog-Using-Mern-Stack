import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-links" >
                <Link to="/">Home</Link>
                <Link to="/create">Create Blog</Link>
                <Link to="/About">About Us</Link>
            </div>
            <p>Copyright © 2022 RetroBlog. All rights reserved.</p>
        </div>
    );
}

export default Footer;