import { useState, useEffect } from 'react';
import { useAuthContext } from '../Hooks/useAuthContext';
import { useParams } from 'react-router-dom';
import { useCommentContext } from '../Hooks/useCommentContext';
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
                console.log(error)
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
                console.log('Comment created successfully', json)
                setContent('')
                setEditingCommentId(null)
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
                console.log('Comment updated successfully', json)
                setEditingCommentId(null)
                setContent('')
            }
        } catch (error) {
            setError(error)
            console.log('Error updating comment', error)
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
                console.log('Comment deleted successfully')
            }
        } catch (error) {
            setError(error)
            console.log('Error deleting comment', error)
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
            {comments && comments.map(comment => (
                <div key={comment._id} className="comment-container">
                    <h4>{comment.author}-{comment.createdAt}</h4>
                    <p>{comment.content}</p>
                    <div className="comment-icons">
                        <span className="material-symbols-outlined" onClick={() => startEditing(comment._id, comment.content)}>edit</span>
                        <span className="material-symbols-outlined" onClick={() => handleDelete(comment._id)}>delete</span>
                    </div>
                    {Error && <div className="error">{Error}</div>}
                </div>
            ))}
        </div>
    );
}
export default Comment;
