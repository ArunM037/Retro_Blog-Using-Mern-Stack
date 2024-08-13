import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBlogContext } from '../Hooks/useBlogContext';
import { useAuthContext } from '../Hooks/useAuthContext';
import Reactquill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import load from '../Assets/load2.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [body, setBody] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
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
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id, dispatch, user, author]);

    const handleClick = async (e) => {
        e.preventDefault();
        if (!isAuthorized) {
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

            if (response.ok) {
                setTitle('');
                setContent('');
                setImgUrl('');
                setBody('');
                dispatch({ type: 'UPDATE_BLOG', payload: json });
                toast.success('Blog Updated successfully', {
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
                </form>) : (<h1>Unauthorized Access</h1>))}
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
}

export default UpdateBlog;
