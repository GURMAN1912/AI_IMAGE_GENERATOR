import React from 'react'
import {logo} from './assets'
import Home from './pages/Home'
import {BrowserRouter ,Link,Route,Routes} from "react-router-dom"
import CreatePost from './pages/CreatePost'

export default function App() {
  return (
    <BrowserRouter>
      <header className='w-full flex justify-between items-center bg-[#9BBEC8] sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
        <Link to={'/'}>
          <img src={logo} alt="logo" className='w-32 object-contain' />
        </Link>
        <Link to={"create-post"} className='font-inter font-medium bg-[#164863] text-white px-4 py-2 rounded-md'>
          Create
        </Link>
      </header>
      <main className='sm:p-8 px-4 py-4 w-full bg-[#DDF2FD] min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/create-post' element={<CreatePost/>}/>
        </Routes>

      </main>
    </BrowserRouter>
  )
}
