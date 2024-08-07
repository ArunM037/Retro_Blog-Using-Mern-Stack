import { createContext, useReducer } from 'react';

// Create BlogContext
export const BlogContext = createContext();

// BlogReducer to handle actions
export const BlogsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_BLOGS':
            return {
                blogs: action.payload
            };
        case 'USER_BLOGS':
            return {
                blogs: action.payload
            };
        case 'CREATE_BLOG':
            return {
                blogs: [action.payload, ...state.blogs]
            };
        case 'DELETE_BLOG':
            return {
                blogs: state.blogs.filter((b) => b._id !== action.payload._id)
            };
        case 'UPDATE_BLOG':
            return {
                blogs: state.blogs.map((b) =>
                    b._id === action.payload._id ? action.payload : b
                )
            };
        default:
            return state;
    }
};


// BlogContextProvider component
export const BlogContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(BlogsReducer, {
        blogs: [],
    });

    return (
        <BlogContext.Provider value={{ ...state, dispatch }}>
            {children}
        </BlogContext.Provider>
    );
};
