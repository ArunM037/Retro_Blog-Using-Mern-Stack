import { useContext } from 'react';
import { BlogContext } from '../context/BlogContext';

export const useBlogContext = () => {
    const context = useContext(BlogContext);

    if (!context) {
        throw new Error('useBlogContext must be used within a BlogContextProvider');
    }

    return context;
};
