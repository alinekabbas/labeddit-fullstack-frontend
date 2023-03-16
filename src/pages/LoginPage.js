import { Button, Flex, FormControl, Image, Input, Spinner, Text, VStack } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import StatusBar from '../components/StatusBar'
import logo from '../assets/logos/logo-page-login.png'
import line from '../assets/line.png'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../contexts/GlobalContext'
import { goToPostsPage, goToSignupPage } from '../routes/coordinator'
import axios from 'axios'
import { BASE_URL } from '../constants/url'
import Footer from '../components/Footer/Footer'

const LoginPage = () => {
  const context = useContext(GlobalContext)
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)

  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const onChangeForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  useEffect(() => {
    if (context.isAuth) {
      goToPostsPage(navigate)
    }
  })

  const login = async () => {
    try {
      setIsLoading(true)
      const body = {
        email: form.email,
        password: form.password
      }
      const response = await axios.post(
        `${BASE_URL}/users/login`, body
      )

      window.localStorage.setItem("labeddit-token", response.data.token)
      setIsLoading(false)
      context.setIsAuth(true)
      goToPostsPage(navigate)

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
      border='1px solid gray'
    >
      <Flex>
        <StatusBar />
      </Flex>

      <Flex
        flexDirection={'column'}
        alignItems={'center'}
        padding='50px'
      >
        <Image
          w="84px"
          h="84px"
          src={logo}
          alt='logo'
        />
        <Text
          fontFamily="IBM Plex Sans, sans-serif"
          fontSize='36px'
          fontWeight='700'
        >
          LabEddit
        </Text>
        <Text
          fontFamily="IBM Plex Sans, sans-serif"
          fontSize='16px'
          fontWeight='300'
        >
          O projeto de rede social da Labenu
        </Text>
      </Flex>
      <VStack
        spacing={-3}
        paddingTop='24px'
      >
        <FormControl
          id="email"
          w='363px'
          h='60px'
          borderColor='#D5D8DE'
        >
          <Input
            type="email"
            value={form.email}
            onChange={onChangeForm}
            name="email"
            autoComplete='off'
            placeholder="E-mail"
          />
        </FormControl>

        <FormControl
          id="password"
          w='363px'
          h='60px'
          borderColor='#D5D8DE'
        >
          <Input
            type="password"
            value={form.password}
            onChange={onChangeForm}
            name="password"
            autoComplete='off'
            placeholder="Senha"
          />
        </FormControl>
      </VStack>
      <VStack
        h='80vh'
        paddingTop='30px'
        //justifyContent='space-between'
      >
        <Button
          w='365px'
          h='50px'
          color='white'
          bgGradient='linear(to-r, #FF6489, #F9B24E)'
          borderRadius='27px'
          fontFamily="Noto Sans, sans-serif"
          fontWeight='700'
          fontSize='18px'
          colorScheme='orange'
          onClick={login}
        >
          {isLoading ? <Spinner /> : "Continuar"}
        </Button>
        <Image
          w="363px"
          src={line}
        />
        <Button
          w='365px'
          h='50px'
          color='#FE7E02'
          bg='white'
          border='1px solid #FE7E02'
          borderRadius='27px'
          fontFamily="Noto Sans, sans-serif"
          fontWeight='700'
          fontSize='18px'
          colorScheme='gray'
          onClick={() => goToSignupPage(navigate)}
        >
          Crie uma conta!
        </Button>
      </VStack>
      <Footer/>
    </Flex>
  )
}

export default LoginPage