import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import './App.css';
import Auth from './pages/Auth';
import Blogs from './pages/Blogs';
import { Blog } from './pages/singleBlog';
import { Publish } from './pages/Publish';
import { UserProvider } from './components/UserContext';
import Home from './pages/Home';
import Appbar from './components/Appbar';
import Footer from './components/Footer';
import Error from './pages/Error'
function Layout() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Appbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <BrowserRouter basename="/">
        <Routes>
            <Route path='/signup' element={<Auth type='Signup' />} />
            <Route path='/signin' element={<Auth type='Signin' />} />
            <Route path='/' element={<Home />} />
          <Route element={<Layout />}>
            <Route path='/blogs' element={<Blogs />} />
            <Route path='/blog/:id' element={<Blog />} />
            <Route path='/publish' element={<Publish />} />
            <Route path='*' element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
