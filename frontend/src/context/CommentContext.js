import { createContext, useReducer } from 'react';


//Create CommentContext
export const CommentContext = createContext();


//CommentReducer to handle actions
export const CommentReducer = (state, action) => {
    switch (action.type) {
        case 'SET_COMMENTS':
            return {
                ...state, comments: action.payload
            };
        case 'SINGLE_COMMENT':
            return {
                ...state,
                comments: action.payload,
            };
        case 'CREATE_COMMENT':
            return {
                comments: [action.payload, ...state.comments]
            }
        case 'DELETE_COMMENT':
            return {
                comments: state.comments.filter((c) => c._id !== action.payload._id)
            }
        case 'UPDATE_COMMENT':
            return {
                comments: state.comments.map((c) =>
                    c._id === action.payload._id ? action.payload : c
                )
            };
        default:
            return state;
    }
}

// CommentContextProvider component
export const CommentContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(CommentReducer, {
        comments: []
    });
    return (
        <CommentContext.Provider value={{ ...state, dispatch }}>
            {children}
        </CommentContext.Provider>
    )
}