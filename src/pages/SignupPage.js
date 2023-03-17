import { Button, Checkbox, Flex, FormControl, Input, Link, Spinner, Stack, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header'
import StatusBar from '../components/StatusBar'
import { BASE_URL } from '../constants/url'
import { GlobalContext } from '../contexts/GlobalContext'
import { goToPostsPage } from '../routes/coordinator'


const SignupPage = () => {
  const context = useContext(GlobalContext)
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)

  const [form, setForm] = useState({
    nickname: "",
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

  const signup = async () => {
    try {
      setIsLoading(true)
      const body = {
        nickname: form.nickname,
        email: form.email,
        password: form.password
      }

      const response = await axios.post(
        `${BASE_URL}/users/signup`, body
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
      border='1px solid #EDEDED'
    >
      <Flex
        flexDirection={'column'}
      >
        <StatusBar />
        <Header />
      </Flex>
      <Flex
        w='364px'
        h='185px'
        paddingTop='38px'>
        <Text
          fontFamily="IBM Plex Sans, sans-serif"
          fontSize='33px'
          fontWeight='700'
        >
          Olá, boas vindas ao LabEddit ;)
        </Text>
      </Flex>
      <Stack
        paddingTop='160px'
        spacing={-3}
      >
        <FormControl
          id="nickname"
          w='363px'
          h='60px'
          borderColor='#D5D8DE'
        >
          <Input
            type="text"
            value={form.nickname}
            onChange={onChangeForm}
            name="nickname"
            autoComplete='off'
            placeholder="Apelido"
          />
        </FormControl>

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
      </Stack>
      <Stack
        w='364px'
        h='170px'
        paddingTop='50px'
        fontFamily="Noto Sans, sans-serif"
        fontWeight='400'
        fontSize='14px'
      >
        <Text>
          Ao continuar, você concorda com o nosso{' '}
          <Link color='#4088CB' href='#' fontWeight='500'>
            Contrato de usuário{' '}
          </Link>
          e a nossa{' '}
          <Link color='#4088CB' href='#' fontWeight='500'>
            Política de Privacidade
          </Link>
        </Text>
        <Checkbox colorScheme='orange' size={'sm'}>
          Eu concordo em receber emails sobre coisas legais do LabEddit
        </Checkbox>
      </Stack>
      <Flex
        h='80vh'
        paddingTop='30px'
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
          onClick={signup}
        >
          {isLoading ? <Spinner /> : "Cadastrar"}
        </Button>
      </Flex>
      <Footer />
    </Flex>
  )
}

export default SignupPage