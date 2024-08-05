import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
function App() {
  const { user } = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to='/login' />} />
          <Route path="/create" element={<CreateBlogs />} />
          <Route path='/About' element={<AboutUs />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/signup' element={!user ? <SignUp /> : <Navigate to='/' />} />
          <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
          <Route path="/blogs/update/:id" element={<UpdateBlog />} />
          <Route path='/blogs/:id' element={<BlogDetails />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
