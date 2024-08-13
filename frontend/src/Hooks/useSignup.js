import { useAuthContext } from "./useAuthContext";
import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isloading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (username, email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/post/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        })
        const json = await response.json();
        if (!response.ok) {
            setIsLoading(false);
            toast.error(json.error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        if (response.ok) {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json));

            //update authConstext
            dispatch({ type: 'LOGIN', payload: json })
            toast.success('Signed up successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
            setIsLoading(false);
        }
    }
    return { signup, isloading, error }
}