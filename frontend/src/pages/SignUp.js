import { Link } from "react-router-dom";
import { useState } from "react";
import { useSignup } from '../Hooks/useSignup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, isloading } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(username, email, password);
    }

    return (
        <div className="Signup-container">
            <form className="Signup-form" onSubmit={handleSubmit}>
                <h1>Signup</h1>
                <label>Enter Your Username</label>
                <input type="text" placeholder="Enter your Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <label>Enter Your Email</label>
                <input type="email" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label>Enter Your Password</label>
                <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button disabled={isloading}>SignUp</button>
                <p>If you already have an account? <Link to={'/Login'}>Login</Link></p>
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

export default SignUp;
