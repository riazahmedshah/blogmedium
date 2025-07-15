import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider} from "@tanstack/react-query"
import './App.css';
import Blogs from './pages/Blogs';
import { Blog } from './pages/singleBlog';
import { Publish } from './pages/Publish';
import Error from './pages/Error'
import LandingPage from '@modules/home/pages/landingPage';
import SignupPage from '@modules/auth/pages/SignupPage';
import LoginPage from '@modules/auth/pages/loginPage';
import { AuthProvider } from '@modules/auth/provider/AuthProvider';
import { Layout, ProtectedRoute } from './routes';
import { Toaster } from '@ui/sonner';
import ProfileSettingPage from '@modules/user/pages/ProfileSettingPage';
import BlogsPage from '@modules/blog/pages/BlogsPage';


function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
    <AuthProvider>
      <BrowserRouter basename="/">
        <Routes>
          <Route path='/auth/register' element={<SignupPage type='Signup' />} />
          <Route path='/auth/login' element={<LoginPage type='Signin' />} />
          
          <Route element={<Layout />}>
            <Route path='/' element={<LandingPage />} />
            <Route path='/blogs' element={<Blogs />} />
            <Route path='/dev' element={<BlogsPage/>}/>
            <Route path='/blog/:id' element={<Blog />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/profile/settings' element={<ProfileSettingPage/>}/>
              <Route path='/publish' element={<Publish />} />
            </Route>
            <Route path='*' element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    <Toaster position="bottom-right"  richColors closeButton />
    </QueryClientProvider>
  );
}

export default App;
