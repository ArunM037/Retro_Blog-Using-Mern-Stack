import { BrowserRouter, Routes, Route } from 'react-router-dom';

//import componets
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateBlogs from './components/CreateBlog';
import AboutUs from './pages/AboutUs';
import UpdateBlog from './components/UpdateBlog';
import BlogDetails from './components/BlogDetails';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateBlogs />} />
          <Route path='/About' element={<AboutUs />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path="/blogs/update/:id" element={<UpdateBlog />} />
          <Route path='/blogs/:id' element={<BlogDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
