import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBlogContext } from '../Hooks/useBlogContext';

const BlogDetails = () => {
    const { id } = useParams(); // Ensure this matches your route parameter
    const [blog, setBlog] = useState(null);
    const { dispatch } = useBlogContext();

    useEffect(() => {
        const fetchBlog = async () => {
            const response = await fetch('/api/blog/' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await response.json();
            if (response.ok) {
                setBlog(json);
            } else {
                console.error('Failed to fetch blog details');
            }
        };
        fetchBlog();
    }, [id, dispatch]);

    return (
        <div className="blog-details">
            {blog &&
                <div key={blog._id}>
                    <h2>{blog.title}</h2>
                    <h5>Author : {blog.author}</h5>
                    <p>Created At : {blog.createdAt}</p>
                    <h3>About : {blog.content}</h3>
                    <p>{blog.body}</p>
                </div>}
        </div>
    );
}

export default BlogDetails;
