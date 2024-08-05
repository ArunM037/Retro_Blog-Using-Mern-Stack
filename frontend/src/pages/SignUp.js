import { Link } from "react-router-dom";
import { useState } from "react";
import { useSignup } from '../Hooks/useSignup'

const SignUp = () => {
    const [Username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, isloading, error } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signup(Username, email, password);
    }
    return (
        <div classname="Signup-container">
            <form className="Signup-form" onSubmit={handleSubmit}>
                <h1>Signup</h1>
                <label>Enter Your Username</label>
                <input type="text" placeholder="Enter your Username" value={Username} onChange={(e) => setUsername(e.target.value)} required />
                <label>Enter Your Email</label>
                <input type="Email" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label>Enter Your Password</label>
                <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button disabled={isloading}>SignUp</button>
                <p>If you already have an account?<Link to={'/Login'}>Login</Link> </p>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
}

export default SignUp;
