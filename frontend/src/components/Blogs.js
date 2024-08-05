import { Link, useNavigate } from "react-router-dom";
import { useBlogContext } from '../Hooks/useBlogContext';

const Blogs = () => {
    const navigate = useNavigate();
    const { blogs, dispatch } = useBlogContext();

    const handleClick = async (id) => {
        try {
            const response = await fetch('/api/blog/' + id, {
                method: 'DELETE',
            });

            const json = await response.json();
            if (response.ok) {
                dispatch({ type: 'DELETE_BLOG', payload: json });
            }
        } catch (error) {
            console.error('Error while deleting blog:', error);
        }
    };

    return (
        <div className="blogs-container">
            {blogs && blogs.map(blogs => (
                <div key={blogs._id} className="Home-blogs">
                    <div className="Blog-img-container">
                        <img src={blogs.img_url} alt="Blog" className="Blog-img" />
                    </div>
                    <Link to={`/blogs/${blogs._id}`}>
                        <h2 className="Blog-title">{blogs.title}</h2>
                        <h3 className="Blog-author">{blogs.author}</h3>
                        <p className="Blog-content">{blogs.content}</p>
                        <p>{blogs.createdAt}</p>
                    </Link>
                    <div className="blog-icons">
                        <span className="material-symbols-outlined" onClick={() => handleClick(blogs._id)}>Delete</span>
                        <span className="material-symbols-outlined" onClick={() => navigate(`/blogs/update/${blogs._id}`)}>Edit</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Blogs;
