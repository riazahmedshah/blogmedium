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


function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
    <AuthProvider>
      <BrowserRouter basename="/">
        <Routes>
          <Route path='/auth/register' element={<SignupPage type='Signup' />} />
          <Route path='/auth/login' element={<LoginPage type='Signin' />} />
          <Route path='/' element={<LandingPage />} />
          
          <Route element={<Layout />}>
            <Route path='/blogs' element={<Blogs />} />
            <Route path='/blog/:id' element={<Blog />} />
            <Route element={<ProtectedRoute />}>
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
