import { Link } from "react-router-dom";
import { useState } from "react";
import { useLogin } from '../Hooks/useLogin'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isloading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };
    return (
        <div className="Login-container">
            <form className="Login-form" onSubmit={handleSubmit}>
                <h1>Login</h1>
                <label>Enter Your Email</label>
                <input type="Email" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label>Enter Your Password</label>
                <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button disabled={isloading}>Login</button>
                <p>If you don't have an account?<Link to={'/signup'}>SignUp</Link> </p>
            </form>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored" />
        </div>
    );
}

export default Login;
