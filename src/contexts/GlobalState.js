import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../constants/url'

const GlobalState = () => {
    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [posts, setPosts] = useState([])
    const [postComments, setPostComments] = useState([])

    const {idPost} = useParams()

    useEffect(() => {
        const token = window.localStorage.getItem("labeddit-token")
        if (token) {
            setIsAuth(true)
        }
    }, [])

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

    useEffect(() => {
        getPosts()
    }, [])

    const getPosts = async () => {
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
        if (postComments.length > 0) {
          const commentString = JSON.stringify(postComments)
          localStorage.setItem('comment', commentString)
        }
      }, [postComments])
    
      useEffect(() => {
        const getSaveComment = JSON.parse(localStorage.getItem('comment'))
        if (getSaveComment !== null) {
            setPostComments(getSaveComment)
        }
      }, [])
    
      useEffect(() => {
        getPostWithComments()
      }, [])
    
      const getPostWithComments = async () =>{
        try {
          setIsLoading(true)
          const config = {
            headers: {
              Authorization: window.localStorage.getItem("labeddit-token")
            }
          }
          const response = await axios.get(`${BASE_URL}/posts/${idPost}/comments`, config)
          console.log(response.data)
          setPostComments(response.data)
        } catch (error) {
          console.log(error)
        }
      }

    return (
        {
            isAuth,
            setIsAuth,
            isLoading,
            setIsLoading,
            posts,
            setPosts,
            getPosts,
            postComments,
            setPostComments,
            getPostWithComments
        }
    )
}

export default GlobalState