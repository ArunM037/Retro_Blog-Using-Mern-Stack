import { useEffect, useState } from "react";
import { useAuthContext } from "../Hooks/useAuthContext";
import { useBlogContext } from "../Hooks/useBlogContext";
import { Link, useNavigate } from "react-router-dom";
import load from "../Assets/load2.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
    const { user } = useAuthContext();
    const { blogs, dispatch } = useBlogContext();
    const [isloading, setIsloading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBloguser = async () => {
            if (!user) {
                console.error('User is not authenticated');
                navigate('/login');
                return;
            }
            setIsloading(true);

            try {
                const response = await fetch('/api/blog/user', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch blog details');
                }

                const json = await response.json();
                dispatch({ type: 'USER_BLOGS', payload: json });
            } catch (error) {
                toast.error(error.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            } finally {
                setIsloading(false);
            }
        };

        fetchBloguser();
    }, [user, dispatch, navigate]);

    const handleClick = async (id) => {
        if (!user) {
            console.error('User is not authenticated');
            return;
        }
        try {
            const response = await fetch('/api/blog/' + id, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            const json = await response.json();
            if (response.ok) {
                dispatch({ type: 'DELETE_BLOG', payload: json });
                toast.success('Blog deleted successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
            }
        } catch (error) {
            toast.error(error.message, {
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
    };
    return (
        <div className="profile">
            <h1>Welcome! {user?.username}</h1>
            <p>Your email is: {user?.email}</p>
            <h1 className="profile-title">Your Blogs</h1>
            {isloading ? (
                <div className="loading">
                    <img src={load} alt="loading" width={300} height={300} />
                </div>
            ) : (
                blogs && blogs.length > 0 ? (
                    blogs.map((blog) => (
                        <div key={blog._id} className="profile-blogs">
                            <Link to={`/blogs/${blog._id}`}>
                                <h2>{blog.title}</h2>
                                <p>{blog.content}</p>
                            </Link>
                            <div className="blog-icons">
                                <span className="material-symbols-outlined" onClick={() => handleClick(blog._id)}>Delete</span>
                                <span className="material-symbols-outlined" onClick={() => navigate(`/blogs/update/${blog._id}`)}>Edit</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-blogs">
                        <p>No blogs found</p>
                    </div>
                )
            )}
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
};

export default Profile;
