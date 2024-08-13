import { useParams, useNavigate } from "react-router-dom";
import { useCommentContext } from "../Hooks/useCommentContext";
import { useEffect } from "react";
import { useAuthContext } from "../Hooks/useAuthContext";

const CommentOne = () => {
    const { id } = useParams();
    const { comments, dispatch } = useCommentContext();
    const { user } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchComment = async () => {
            const response = await fetch('/api/comment/post/' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            try {
                if (response.ok) {
                    dispatch({ type: 'SINGLE_COMMENT', payload: json });
                } else {
                    console.log(json.error);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchComment();
    }, [id, dispatch, user]);

    return (
        <div>
            {comments && (
                <div className="commentSingle-container">
                    <h2 className="material-symbols-outlined">
                        <span onClick={() => navigate(-1)}>arrow_back</span> Written by {comments.author}
                    </h2>
                    <p>{comments.content}</p>
                </div>
            )}
        </div>
    );
}

export default CommentOne;
