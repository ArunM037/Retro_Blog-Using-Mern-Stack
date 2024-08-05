import { useAuthContext } from './useAuthContext'
import { useBlogContext } from './useBlogContext'

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: dispatchBlog } = useBlogContext()
    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user')
        //dispatch logout action
        dispatch({ type: 'LOGOUT' })
        dispatchBlog({ type: 'SET_BLOGS', payload: null })
    }
    return { logout }
}