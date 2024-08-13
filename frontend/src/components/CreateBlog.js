import { useState } from 'react';
import { useBlogContext } from '../Hooks/useBlogContext';
import { useAuthContext } from '../Hooks/useAuthContext';
import Reactquill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateBlogs = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [body, setBody] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [error, setError] = useState(null);
    const { dispatch } = useBlogContext();
    const { user } = useAuthContext();

    const handleClick = async (e) => {
        if (!user) {
            setError('You must be logged in')
            return
        }
        e.preventDefault();

        const blog = { title, content, author: user.username, body, img_url: imgUrl };

        const response = await fetch('/api/blog', {
            method: 'POST',
            body: JSON.stringify(blog),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            toast.error(error, {
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
        if (response.ok) {
            setTitle('');
            setContent('');
            setImgUrl('');
            setBody('');
            setError(null);
            dispatch({ type: 'CREATE_BLOG', payload: json });
            toast.success('Blog added successfully', {
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
    };

    return (
        <div className="create">
            <form>
                <h1>Create New Blog</h1>
                <label>Blog Title:</label>
                <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <label>Blog Content:</label>
                <input type="text" name="content" value={content} onChange={(e) => setContent(e.target.value)} />
                <label>Blog Author:</label>
                <input type="text" name="author" value={user?.username || ' '} readOnly />
                <label>Blog Image(Url):</label>
                <input type="url" name="img_url" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
                <label>Blog Body:</label>
                <div className='quill-container'>
                    <Reactquill theme="snow" value={body} onChange={setBody} />
                </div>
                <button type="submit" onClick={handleClick}>Add Blog</button>
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
            </form>
        </div>
    );
}

export default CreateBlogs;
