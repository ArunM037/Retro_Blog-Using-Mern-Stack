import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div classname="Login-container">
            <form className="Login-form">
                <h1>Login</h1>
                <label>Enter Your Email</label>
                <input type="Email" placeholder="Enter your Email" />
                <label>Enter Your Password</label>
                <input type="password" placeholder="Enter your password" />
                <button>Login</button>
                <p>If you don't have an account?<Link to={'/signup'}>SignUp</Link> </p>
            </form>
        </div>
    );
}

export default Login;
