import { useAuthContext } from './useAuthContext'
import { useBlogContext } from './useBlogContext'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: dispatchBlog } = useBlogContext()
    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user')
        //dispatch logout action
        dispatch({ type: 'LOGOUT' })
        dispatchBlog({ type: 'SET_BLOGS', payload: null })
        toast.success('Logged out successfully', {
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
    return { logout }
}