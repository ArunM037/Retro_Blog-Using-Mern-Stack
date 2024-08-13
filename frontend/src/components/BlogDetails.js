import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlogContext } from '../Hooks/useBlogContext';
import { useAuthContext } from '../Hooks/useAuthContext';
import DOMPurify from 'dompurify';
import 'react-quill/dist/quill.snow.css';
import load from '../Assets/load2.svg';
import Comment from './Comment';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BlogDetails = () => {
    const { id } = useParams(); // Ensure this matches your route parameter
    const [blog, setBlog] = useState(null);
    const { dispatch } = useBlogContext();
    const { user } = useAuthContext();
    const [isloading, setIsloading] = useState(true);
    const navigate = useNavigate()
    if (!user) {
        navigate('/login')
    }
    useEffect(() => {
        const fetchBlog = async () => {
            setIsloading(true);
            const response = await fetch('/api/blog/' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            try {
                if (response.ok) {
                    setBlog(json);
                    setIsloading(false);
                } else {
                    console.error('Failed to fetch blog details');
                    setIsloading(false);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setIsloading(false);
            }
        };
        fetchBlog();
    }, [id, dispatch, user, navigate]);

    return (
        <div>
            {isloading && <div className='loading'><img src={load} alt="loading" width={300} height={300} /></div>}
            <div>
                {blog &&
                    <div key={blog._id} className="blog-details">
                        <h2>{blog.title}</h2>
                        <h5>Author : {blog.author}</h5>
                        <p>Created At : {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}</p>
                        <div className="blogdetails-img">
                            <img src={blog.img_url} alt="img" width={1000} height={500} />
                        </div>
                        <h3>About : {blog.content}</h3>
                        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.body) }} />
                    </div>}
            </div>
            <div className="comment-container">
                <Comment />
            </div>
            <ToastContainer containerId={"Blog request"}
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

export default BlogDetails;
