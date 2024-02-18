import { useEffect, useState } from 'react'
import './App.css'
import Post from './components/Post'

function App() {
  const [page, setPage] = useState(1)
  const [posts, setPosts] = useState([])


  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    const res = await fetch(`https://dummyjson.com/posts/${page}`);
    const posts = await res.json();
    console.log(posts)
    setPosts(posts)
  }

  const handleSubmit = () => {
    fetchPosts()
  }
  const handlePageChange = (e) => {
    setPage(e.target.value)
  }

  return (
    <>
      <Post
      value={page}
      posts={posts}
      handleSubmit={handleSubmit}
      handlePageChange={handlePageChange}
      />
    </>
  )
}

export default App
