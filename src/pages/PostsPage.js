import { Button, Flex, Image, Input, Spinner, Stack, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import Header from '../components/Header'
import StatusBar from '../components/StatusBar'
import { BASE_URL } from '../constants/url'
import { GlobalContext } from '../contexts/GlobalContext'
import line from '../assets/line.png'
import Footer from '../components/Footer/Footer'

const PostsPage = () => {
  const context = useContext(GlobalContext)
  const {renderPosts} = context
  
  const [isLoading, setIsLoading] = useState(false)

  const [form, setForm] = useState({
    content: ""
  })

  const onChangeForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const createPost = async () => {
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
        `${BASE_URL}/posts`, body, config
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
        <Header />
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
          placeholder="Escreva seu post..."
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
          onClick={createPost}
        >
          {isLoading ? <Spinner /> : "Postar"}
        </Button>
      </Flex>
      <Image
        w="363px"
        paddingTop='32px'
        src={line}
      />

      <VStack
      paddingTop='24px'
      
      >
        {renderPosts}
      </VStack>

      <Footer/>
    </Flex>
  )
}

export default PostsPage