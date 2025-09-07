import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider} from "@tanstack/react-query"
import './App.css';
import {NotFound} from './components/NotFound'
import LandingPage from '@modules/home/pages/landingPage';
import SignupPage from '@modules/auth/pages/SignupPage';
import LoginPage from '@modules/auth/pages/loginPage';
import { AuthProvider } from '@modules/auth/provider/AuthProvider';
import { Layout, ProtectedRoute } from './routes';
import { Toaster } from '@ui/sonner';
import ProfileSettingPage from '@modules/user/pages/ProfileSettingPage';
import BlogsPage from '@modules/blog/pages/BlogsPage';
import PublishPage from '@modules/blog/pages/PublishPage';
import SingleBlogPage from '@modules/blog/pages/SignleBlogPage'
import ProfilePage from '@modules/user/pages/profilePage';
import UpdateBlogPage from '@modules/blog/pages/UpdateBlogPage';


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
            <Route path='/tag/blogs' element={<BlogsPage />} />
            <Route path='/blog/:id' element={<SingleBlogPage/>} />
            <Route element={<ProtectedRoute />}>
              <Route path='/profile/settings' element={<ProfileSettingPage/>}/>
              <Route path='/publish' element={<PublishPage/>}/>
              <Route path='/profile' element={<ProfilePage/>}/>
              <Route path='/update/:id' element={<UpdateBlogPage/>}/>
            </Route>
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    <Toaster position="bottom-right"  richColors closeButton />
    </QueryClientProvider>
  );
}

export default App;
