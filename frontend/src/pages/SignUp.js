import { Link } from "react-router-dom";

const SignUp = () => {
    return (
        <div classname="Signup-container">
            <form className="Signup-form">
                <h1>Signup</h1>
                <label>Enter Your Username</label>
                <input type="text" placeholder="Enter your Username" />
                <label>Enter Your Email</label>
                <input type="Email" placeholder="Enter your Email" />
                <label>Enter Your Password</label>
                <input type="password" placeholder="Enter your password" />
                <button>SignUp</button>
                <p>If you already have an account?<Link to={'/Login'}>Login</Link> </p>
            </form>
        </div>
    );
}

export default SignUp;
