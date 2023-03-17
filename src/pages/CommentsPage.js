import { Button, Flex, Image, Input, Spinner, Stack, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Header from '../components/Header'
import StatusBar from '../components/StatusBar'
import { BASE_URL } from '../constants/url'
import line from '../assets/line.png'
import CardPostAndComments from '../components/CardPostAndComments'
import Footer from '../components/Footer/Footer'

const CommentsPage = () => {
  const params = useParams()
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [form, setForm] = useState({
    content: ""
  })

  const onChangeForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const createComment = async () => {
    try {
      setIsLoading(true)
      const body = {
        content: form.content
      }
      const config = {
        headers: {
          Authorization: window.localStorage.getItem("labeddit-token")
        }
      }

      await axios.post(
        `${BASE_URL}/comments/${params.idPost}/post`, body, config
      )
      setIsLoading(false)
      setForm({
        content: ""
      })
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (comments.length > 0) {
      const commentString = JSON.stringify(comments)
      localStorage.setItem('comment', commentString)
    }
  }, [comments])

  useEffect(() => {
    const getSaveComment = JSON.parse(localStorage.getItem('comment'))
    if (getSaveComment !== null) {
      setComments(getSaveComment)
    }
  }, [])

  useEffect(() => {
    getComments()
  }, [])

  const getComments = async () =>{
    try {
      setIsLoading(true)
      const config = {
        headers: {
          Authorization: window.localStorage.getItem("labeddit-token")
        }
      }
      const response = await axios.get(`${BASE_URL}/posts/${params.idPost}/comments`, config)
      console.log(response.data)
      setComments(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const renderComments = comments.map((comment) => {
    return <CardPostAndComments
      key={comment.id}
      comment={comment}
    />
  })

  return (
    <Flex
      w="428px"
      h="120vh"
      flexDirection={'column'}
      alignItems={'center'}
      border='1px solid #EDEDED'
    >
      
      <Flex
        flexDirection={'column'}>
        <StatusBar />
        <Header/>
      </Flex>
      
        <Stack
          paddingTop='32px'
        >
          <Input
            type="text"
            value={form.content}
            onChange={onChangeForm}
            name="content"
            autoComplete='off'
            placeholder="Adicionar comentário"
            w='364px'
            h='131px'
            fontFamily="IBM Plex Sans, sans-serif"
            fontWeight='400'
            fontSize='18px'
            borderRadius='12px'
            bg='#EDEDED'
          />
        </Stack>

        <Flex
          paddingTop='12px'
        >
          <Button
            w='365px'
            h='50px'
            color='white'
            bgGradient='linear(to-r, #FF6489, #F9B24E)'
            borderRadius='12px'
            fontFamily="Noto Sans, sans-serif"
            fontWeight='700'
            fontSize='18px'
            colorScheme='orange'
            onClick={createComment}
          >
            {isLoading ? <Spinner /> : "Responder"}
          </Button>
        </Flex>
        <Image
          w="363px"
          paddingTop='16px'
          src={line}
        />
        <VStack>
          {renderComments}
        </VStack>

        <Footer/>
    </Flex>
  )
}

export default CommentsPage