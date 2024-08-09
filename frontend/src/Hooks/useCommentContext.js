import { useContext } from "react";
import { CommentContext } from "../context/CommentContext";

export const useCommentContext = () => {
    const context = useContext(CommentContext)

    if (!context) {
        throw new Error('useCommentContext must be within a CommentContextProvider')
    }

    return context
}