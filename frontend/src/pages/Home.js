import { useEffect, useState } from "react";
import Blogs from "../components/Blogs";
import { useBlogContext } from "../Hooks/useBlogContext";
const Home = () => {
    const [blogs, setBlogs] = useState(null);
    const { dispatch } = useBlogContext();
    useEffect(() => {
        const fetchBlog = async () => {
            const response = await fetch('/api/blog', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await response.json();
            if (response.ok) {
                setBlogs(json);
                dispatch({ type: 'SET_BLOGS', payload: json });
            }
        };
        fetchBlog();
    }, [dispatch]);
    return (
        <div className="Home">
            <div className="Home-container">
                <h1>RetroBlog</h1>
                <p>Where you can create , update and show ideas</p>
            </div>
            <h1>All Recent Blogs</h1>
            <Blogs blog={blogs} />
        </div>
    );
}

export default Home;