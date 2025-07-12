import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import './App.css';
import Blogs from './pages/Blogs';
import { Blog } from './pages/singleBlog';
import { Publish } from './pages/Publish';
import Appbar from './components/Appbar';
import Footer from './components/Footer';
import Error from './pages/Error'
import LandingPage from '@modules/home/pages/landingPage';
import SignupPage from '@modules/auth/pages/SignupPage';
import LoginPage from '@modules/auth/pages/loginPage';
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
      <BrowserRouter basename="/">
        <Routes>
            <Route path='/auth/register' element={<SignupPage type='Signup' />} />
            <Route path='/auth/login' element={<LoginPage type='Signin' />} />
            <Route path='/' element={<LandingPage />} />
          <Route element={<Layout />}>
            <Route path='/blogs' element={<Blogs />} />
            <Route path='/blog/:id' element={<Blog />} />
            <Route path='/publish' element={<Publish />} />
            <Route path='*' element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
