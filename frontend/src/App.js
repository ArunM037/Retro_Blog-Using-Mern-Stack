import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthContext } from './Hooks/useAuthContext';


//import componets
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateBlogs from './components/CreateBlog';
import AboutUs from './pages/AboutUs';
import UpdateBlog from './components/UpdateBlog';
import BlogDetails from './components/BlogDetails';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Footer from './components/Footer';
import CommrentOne from './components/CommrentOne';

//Routes Website
function App() {
  const { user } = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to='/login' />} />
          <Route path="/create" element={user ? <CreateBlogs /> : <Navigate to='/login' />} />
          <Route path='/About' element={user ? <AboutUs /> : <Navigate to='/login' />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/signup' element={!user ? <SignUp /> : <Navigate to='/' />} />
          <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
          <Route path="/blogs/update/:id" element={<UpdateBlog />} />
          <Route path='/blogs/:id' element={<BlogDetails />} />
          <Route path='/blogs/post/:id' element={<CommrentOne />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <ToastContainer containerId={"Blog request"}
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

export default App;
