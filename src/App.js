import { ChakraProvider } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { GlobalStyle } from './GlobalStyle';
import Router from './routes/Router';
import { GlobalContext } from './contexts/GlobalContext';
import axios from 'axios';
import { BASE_URL } from './constants/url';
import CardPostAndComments from './components/CardPostAndComments';

const App = () => {
  const [isAuth, setIsAuth] = useState(false)
  const [posts, setPosts] = useState([])
  
  useEffect(()=>{
    const token = window.localStorage.getItem("labeddit-token")
    if(token){
      setIsAuth(true)
    }
  },[])

  useEffect(() =>{
    getPosts()
  }, [])

  const getPosts = async () =>{
    try {
      const config = {
        headers: {
          Authorization: window.localStorage.getItem("labeddit-token")
        }
      }
      const response = await axios.get(`${BASE_URL}/posts`, config)
      setPosts(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (posts.length > 0) {
      const postString = JSON.stringify(posts)
      localStorage.setItem('post', postString)
    }
  }, [posts])

  useEffect(() => {
    const getSavePost = JSON.parse(localStorage.getItem('post'))
    if (getSavePost !== null) {
      setPosts(getSavePost)
    }
  }, [])

  const renderPosts = posts.map((post) => {
    return <CardPostAndComments
      key={post.id}
      post={post}
    />
  })

  const context = {
    isAuth,
    setIsAuth,
    posts,
    setPosts,
    renderPosts
  }

  return (
    <GlobalContext.Provider value={context}>
      <ChakraProvider>
        <GlobalStyle />
        <Router />
      </ChakraProvider>
    </GlobalContext.Provider>
  );
}

export default App;
