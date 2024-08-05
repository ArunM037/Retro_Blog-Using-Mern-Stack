import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isloading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (Username, email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/post/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Username, email, password })
        })
        const json = await response.json();
        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }
        if (response.ok) {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json));

            //update authConstext
            dispatch({ type: 'LOGIN', payload: json })
            setIsLoading(false);
        }
    }
    return { signup, isloading, error }
}