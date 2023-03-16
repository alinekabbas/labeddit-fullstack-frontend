import { CloseButton, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/logos/logo-header.png'
import returnPostPageIcon from '../assets/icons/return-post-page.png'
import { goToLoginPage, goToPostsPage } from '../routes/coordinator'

const Header = () => {
    const navigate = useNavigate()
    const location = useLocation()
    return (
        <Flex
            w="428px"
            h="50px"
            bg='#EDEDED'
            alignItems={'center'}
            justifyContent={"end"}>

            {location.pathname === '/signup' &&
                <Flex>
                    <Flex>
                        <Image
                            w="28px"
                            h="28px"
                            src={logo}
                            marginRight='114px'
                        />
                    </Flex>
                    <Flex>
                        <Text
                            fontFamily="Noto Sans, sans-serif"
                            fontWeight='600'
                            fontSize='18px'
                            color='#4088CB'
                            h='25px'
                            w='55px'
                            marginRight='30px'
                            cursor={'pointer'}
                            onClick={() => goToPostsPage(navigate)}
                        >
                            Entrar
                        </Text>
                    </Flex>
                </Flex>
            }

            {location.pathname === '/posts' &&
                <Flex>
                    <Flex>
                        <Image
                            w="28px"
                            h="28px"
                            src={logo}
                            marginRight='106px'
                        />
                    </Flex>
                    <Flex>
                        <Text
                            fontFamily="Noto Sans, sans-serif"
                            fontWeight='600'
                            fontSize='18px'
                            color='#4088CB'
                            h='25px'
                            w='63px'
                            marginRight='30px'
                            cursor={'pointer'}
                            onClick={() => goToLoginPage(navigate)}
                        >
                            Logout
                        </Text>
                    </Flex>
                </Flex>
            }

            {location.pathname === '/:id/posts/comments' &&
                <Flex
                    w='428px'
                    h='50px'
                    padding='0px 30px'
                    alignItems={'center'}
                    justifyContent={'space-between'}
                >
                    <Flex>
                        {/* <Image
                            
                            src={returnPostPageIcon}
                        /> */}
                        <CloseButton
                            w="24px"
                            h="24px"
                            color='#A3A3A3'
                            size='lg' 
                        />
                    </Flex>
                    <Flex>
                        <Image
                            w="28px"
                            h="28px"
                            marginLeft='40px'
                            src={logo}
                        />
                    </Flex>
                    <Flex>
                        <Text
                            fontFamily="Noto Sans, sans-serif"
                            fontWeight='600'
                            fontSize='18px'
                            color='#4088CB'
                            h='25px'
                            w='63px'
                            cursor={'pointer'}
                            onClick={() => goToLoginPage(navigate)}
                        >
                            Logout
                        </Text>
                    </Flex>
                </Flex>
            }
        </Flex>
    )
}

export default Header