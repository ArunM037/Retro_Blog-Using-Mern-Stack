import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBlogContext } from '../Hooks/useBlogContext';
import { useAuthContext } from '../Hooks/useAuthContext';

const UpdateBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [body, setBody] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const { dispatch } = useBlogContext();
    const { user } = useAuthContext();

    useEffect(() => {

        const fetchBlog = async () => {
            try {
                const response = await fetch(`/api/blog/${id}`, {
                    headers: {
                        'authorization': `Bearer ${user.token}`
                    }
                });
                const json = await response.json();

                if (response.ok) {
                    setTitle(json.title);
                    setContent(json.content);
                    setAuthor(user.username);
                    setBody(json.body);
                    setImgUrl(json.img_url);
                    dispatch({ type: 'UPDATE_BLOG', payload: json });
                } else {
                    setError(json.error);
                }
            } catch (err) {
                setError('Failed to fetch blog data.');
            }
        };

        fetchBlog();
    }, [id, dispatch, user]);

    const handleClick = async (e) => {
        e.preventDefault();

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
                <textarea name="body" cols="100" rows="10" value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                <button type="submit" onClick={handleClick}>Update Blog</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
}

export default UpdateBlog;
