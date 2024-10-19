
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './pages/Auth'
import Blogs from './pages/Blogs'
import { Blog } from './pages/singleBlog'
import { Publish } from './pages/Publish'
import { UserProvider } from './components/UserContext'
import Home from './pages/Home'

function App() {

  return (
    <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/signup' element = {<Auth type='Signup'/>}/>
        <Route path='/signin' element = {<Auth type='Signin'/>}/>
        <Route path='/blogs' element = {<Blogs/>}/>
        <Route path='/blog/:id' element = {<Blog/>}/>
        <Route path='/publish' element = {<Publish/>}/>
      </Routes>
    </BrowserRouter>
    </UserProvider>
  )
}

export default App
