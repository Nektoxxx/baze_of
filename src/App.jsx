import { Routes, Route } from 'react-router-dom'
import { FeedPage } from './pages/FeedPage'
import { PostPage } from './pages/PostPage'
import { NewPostPage } from './pages/NewPostPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<FeedPage />} />
      <Route path="/posts/new" element={<NewPostPage />} />
      <Route path="/posts/:id" element={<PostPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  )
}

export default App
