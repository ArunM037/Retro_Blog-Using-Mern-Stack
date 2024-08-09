import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBlogContext } from '../Hooks/useBlogContext';
import { useAuthContext } from '../Hooks/useAuthContext';
import Reactquill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import load from '../Assets/load2.svg';

const UpdateBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [body, setBody] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const { dispatch } = useBlogContext();
    const { user } = useAuthContext();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {

        const fetchBlog = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/blog/${id}`, {
                    headers: {
                        'authorization': `Bearer ${user.token}`
                    }
                });
                const json = await response.json();

                if (response.ok) {
                    setAuthor(json.author);
                    setIsAuthorized(true);
                    setTitle(json.title);
                    setContent(json.content);
                    setBody(json.body);
                    setImgUrl(json.img_url);
                    if (user && user.username === json.author) {
                        setIsAuthorized(true);
                    } else {
                        setIsAuthorized(false);
                    }
                    dispatch({ type: 'UPDATE_BLOG', payload: json });

                } else {
                    setError(json.error);
                }
            } catch (err) {
                setError('Failed to fetch blog data.');
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id, dispatch, user, author]);

    const handleClick = async (e) => {
        e.preventDefault();
        if (!isAuthorized) {
            setError('You are not authorized to update this blog.');
            return;
        }

        const blog = { title, content, author, body, img_url: imgUrl };

        try {
            const response = await fetch(`/api/blog/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(blog),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();

            if (!response.ok) {
                setError(json.error);
            } else {
                setError(null);
                console.log('Updated blog', json);
                dispatch({ type: 'UPDATE_BLOG', payload: json });
                navigate(`/blogs/${id}`);
            }
        } catch (err) {
            setError('Failed to update blog.');
        }
    };

    return (
        <div className="Update-page">
            {loading ? (
                <div className='loading'><img src={load} alt="" width={300} height={300} /></div>
            ) : (isAuthorized ? (
                <form>
                    <h1>Update Your Blog</h1>
                    <label>Blog Title:</label>
                    <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <label>Blog Content:</label>
                    <input type="text" name="content" value={content} onChange={(e) => setContent(e.target.value)} />
                    <label>Blog Author:</label>
                    <input type="text" name="author" value={author} readOnly />
                    <label>Blog Image(Url):</label>
                    <input type="url" name="img_url" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
                    <label>Blog Body:</label>
                    <div className='quill-container'>
                        <Reactquill theme="snow" value={body} onChange={setBody} />
                    </div>
                    <button type="submit" onClick={handleClick}>Update Blog</button>
                    {error && <div className="error">{error}</div>}
                </form>) : (<h1>Unauthorized Access</h1>))}

        </div>
    );
}

export default UpdateBlog;
