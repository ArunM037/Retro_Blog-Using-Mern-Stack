import { useEffect } from "react";
import Blogs from "../components/Blogs";
import { useBlogContext } from "../Hooks/useBlogContext";
import { useAuthContext } from "../Hooks/useAuthContext";

const Home = () => {
    const { dispatch } = useBlogContext();
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchBlog = async () => {
            const response = await fetch('/api/blog', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            if (response.ok) {
                dispatch({ type: 'SET_BLOGS', payload: json });
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
            <Blogs />
        </div>
    );
};
export default Home;
