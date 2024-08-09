import { useEffect, useState } from "react";
import Blogs from "../components/Blogs";
import { useBlogContext } from "../Hooks/useBlogContext";
import { useAuthContext } from "../Hooks/useAuthContext";
import load from '../Assets/load2.svg'

const Home = () => {
    const { dispatch } = useBlogContext();
    const { user } = useAuthContext()
    const [isloading, setIsloading] = useState(false)

    useEffect(() => {
        const fetchBlog = async () => {
            setIsloading(true)
            const response = await fetch('/api/blog', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            if (response.ok) {
                dispatch({ type: 'SET_BLOGS', payload: json });
                setIsloading(false)
            }
            if (!response.ok) {
                setIsloading(false)
                console.error('Failed to fetch blog details');
            }
        };
        fetchBlog();
    }, [dispatch, user]);

    return (
        <div className="Home">
            <div className="Home-container">
                <h1>RetroBlog</h1>
                <p>Where you can create, update, and show ideas</p>
            </div>
            <h1>All Recent Blogs</h1>
            {isloading &&
                <div className="loading">
                    <img src={load} alt="loading" width={300} height={300} />
                </div>
            }
            <Blogs />
        </div>
    );
};
export default Home;
