import { Flex, Image } from '@chakra-ui/react'
import React from 'react'
import Header from '../components/Header'
import StatusBar from '../components/StatusBar'


const SignupPage = () => {
  return (
    <Flex
      w="428px"
      h="926px"
      justifyContent={'center'}
      backgroundColor={'gray'}
      >
      <Flex
        flexDirection={'column'}
      >
        <StatusBar />
        <Header/>
        
      </Flex>
    </Flex>
  )
}

export default SignupPage