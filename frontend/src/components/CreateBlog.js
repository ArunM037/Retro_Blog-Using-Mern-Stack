import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlogContext } from '../Hooks/useBlogContext';

const CreateBlogs = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [body, setBody] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { dispatch } = useBlogContext();

    const handleClick = async (e) => {
        e.preventDefault();

        const blog = { title, content, author, body, img_url: imgUrl };

        const response = await fetch('/api/blog', {
            method: 'POST',
            body: JSON.stringify(blog),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setTitle('')
            setContent('')
            setAuthor('')
            setImgUrl('')
            setBody('')
            setError(null)
            dispatch({ type: 'CREATE_BLOG', payload: json })
            console.log('new blog added', json)
            navigate('/')
        }
    }

    return (
        <div className="create">
            <form>
                <h1>Create New Blog</h1>
                <label>Blog Title:</label>
                <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <label>Blog Content:</label>
                <input type="text" name="content" value={content} onChange={(e) => setContent(e.target.value)} />
                <label>Blog Author:</label>
                <input type="text" name="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                <label>Blog Image(Url):</label>
                <input type="url" name="img_url" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
                <label>Blog Body:</label>
                <textarea name="body" cols="100" rows="10" value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                <button type="submit" onClick={handleClick}>Add Blog</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
}

export default CreateBlogs;
