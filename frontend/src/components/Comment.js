import { useState, useEffect } from 'react';
import { useAuthContext } from '../Hooks/useAuthContext';
import { useParams, Link } from 'react-router-dom';
import { useCommentContext } from '../Hooks/useCommentContext';
import load from '../Assets/load2.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
const Comment = () => {
    const { user } = useAuthContext();
    const [Content, setContent] = useState('');
    const { id } = useParams();
    const { comments, dispatch } = useCommentContext();
    const [Error, setError] = useState(null);
    const [editingCommentId, setEditingCommentId] = useState(null);


    // Get all bogs
    useEffect(() => {
        const fetchcomment = async () => {
            if (!user) {
                setError('You must be logged in');
                return;
            }
            setError(null);
            const response = await fetch('/api/comment/' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json();
            try {
                if (response.ok) {
                    dispatch({ type: 'SET_COMMENTS', payload: json })
                }
            } catch (error) {
                setError(error)
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
        }
        fetchcomment();
    }, [user, id, dispatch]);
    // Post a new comment
    const handlePost = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/comment/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ Blog_id: id, author: user.username, Content })
        })
        const json = await response.json();
        try {
            if (response.ok) {
                dispatch({ type: 'CREATE_COMMENT', payload: json })
                toast.success('Comment created successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                setContent('')
                setEditingCommentId(null)
            }
            if (!response.ok) {
                toast.error('fill all fields', {
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
        } catch (error) {
            setError(error)
            console.log(error)
        }
    }
    // start edit a comment
    const startEditing = (id, Content) => {
        setEditingCommentId(id);
        setContent(Content)
    }

    // Update a comment
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!user) {
            setError('You must be logged in');
            return;
        }
        try {
            const response = await fetch('/api/comment/' + editingCommentId, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ Blog_id: id, author: user.username, Content })
            })
            const json = await response.json();
            if (response.ok) {
                dispatch({ type: 'UPDATE_COMMENT', payload: json })
                toast.success('Comment Updated successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                setEditingCommentId(null)
                setContent('')
            }
            if (!response.ok) {
                toast.error('fill all fields', {
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
        } catch (error) {
            setError(error)
        }
    }
    // Delete a comment
    const handleDelete = async (id) => {
        if (!user) {
            setError('You must be logged in');
            return;
        }
        try {
            const response = await fetch('/api/comment/' + id, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json();
            if (response.ok) {
                dispatch({ type: 'DELETE_COMMENT', payload: json })
                toast.success('Comment deleted successfully', {
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
            if (!response.ok) {
                toast.error('Error deleting comment', {
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
        } catch (error) {
            setError(error)
        }
    }
    return (
        <div className="comment-section">
            <h1>Comments</h1>
            <div className="comment-form">
                <form>
                    <label>Enter Your Comment</label>
                    <input type="text" value={Content} placeholder="Enter your comment" onChange={(e) => setContent(e.target.value)} />
                    <button type="submit" onClick={(e) => editingCommentId ? handleUpdate(e) : handlePost(e)}>{editingCommentId ? 'edit' : 'Post'}</button>
                </form>
            </div>
            <div className='comment all-container'>
                {comments && Array.isArray(comments) ? (
                    comments.map(comment => (
                        <div key={comment._id} className="comment-container">
                            <Link to={`/blogs/post/${comment._id}`}>
                                <h4>{comment.author}--{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</h4>
                                <p>{comment.content}</p>
                            </Link>
                            {user.username === comment.author &&
                                <div className="comment-icons">
                                    <span className="material-symbols-outlined" onClick={() => startEditing(comment._id, comment.content)}>edit</span>
                                    <span className="material-symbols-outlined" onClick={() => handleDelete(comment._id)}>delete</span>
                                </div>}
                            {Error && <div className="error">{Error}</div>}
                        </div>
                    ))
                ) : (
                    <div className="loading">
                        <img src={load} alt="loading" width={300} height={300} />
                    </div>
                )}
            </div>
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
export default Comment;
