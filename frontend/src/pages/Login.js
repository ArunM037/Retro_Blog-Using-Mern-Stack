import { Link } from "react-router-dom";
import { useState } from "react";
import { useLogin } from '../Hooks/useLogin'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isloading, error } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };
    return (
        <div classname="Login-container">
            <form className="Login-form" onSubmit={handleSubmit}>
                <h1>Login</h1>
                <label>Enter Your Email</label>
                <input type="Email" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label>Enter Your Password</label>
                <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button disabled={isloading}>Login</button>
                <p>If you don't have an account?<Link to={'/signup'}>SignUp</Link> </p>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
}

export default Login;
