import { Link } from "react-router-dom";
import { useBlogContext } from '../Hooks/useBlogContext';

const Blogs = () => {
    const { blogs } = useBlogContext();

    return (
        <div className="blogs-container">
            {blogs && blogs.map(blogs => (
                <div key={blogs._id} className="Home-blogs">
                    <div className="Blog-img-container">
                        <img src={blogs.img_url} alt="Blog" className="Blog-img" />
                    </div>
                    <Link to={`/blogs/${blogs._id}`}>
                        <h2 className="Blog-title">{blogs.title}</h2>
                        <h3 className="Blog-author">By {blogs.author}</h3>
                        <p className="Blog-content">{blogs.content}</p>
                        <p>{blogs.createdAt}</p>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default Blogs;
