import { Image, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import likeIcon from '../assets/icons/like.svg'
import dislikeIcon from '../assets/icons/dislike.svg'
import commentIcon from '../assets/icons/comment.svg'
import { useLocation, useNavigate, useParams } from 'react-router'
import { goToCommentsPage } from '../routes/coordinator'

const CardPostAndComments = (props) => {
  const { post, comment } = props

  const navigate = useNavigate()
  const location = useLocation()
  const { idPost } = useParams()

  const addLike = ()=>{

  }

  const addDislike = ()=>{
    
  }

  return (
    <>
      {location.pathname === '/posts' &&
        <Flex
          flexDirection='column'
          w='364px'
          maxH='200px'
          padding='9px 10px'
          gap='18px'
          bg='#FBFBFB'
          border='1px solid #E0E0E0'
          borderRadius='12px'
          fontFamily="IBM Plex Sans, sans-serif"
          fontWeight='400'
          onClick={()=> goToCommentsPage(navigate, post.id)}
        >
          <Text
            fontSize='12px'
            color='#6F6F6F'
          >
            Enviado por: {post.creator.nickname}
          </Text>
          <Text
            fontSize='18px'
          >
            {post.content}
          </Text>
          <Flex
            w='175px'
            h='28px'
            justifyContent='space-between'
            fontSize='10px'
          >
            <Flex
              w='98px'
              padding='4px'
              alignItems='center'
              justifyContent='space-between'
              border='1px solid #ECECEC'
              borderRadius='28px'
              fontWeight='700'
            >
              <Image src={likeIcon} alt='icone like' />
              {post.likes}
              <Image src={dislikeIcon} alt='icone like' />
            </Flex>


            <Flex
              w='66px'
              padding='4px'
              gap='8px'
              alignItems='center'
              justifyContent='center'
              border='1px solid #ECECEC'
              borderRadius='28px'
            >
              <Image src={commentIcon} alt='icone like' />
              {post.commentsPost}
            </Flex>
          </Flex>
        </Flex>
      }

      {location.pathname === `${idPost}/posts/comments` &&
        <Flex
          flexDirection='column'
          w='364px'
          maxH='200px'
          padding='9px 10px'
          gap='18px'
          bg='#FBFBFB'
          border='1px solid #E0E0E0'
          borderRadius='12px'
          fontFamily="IBM Plex Sans, sans-serif"
          fontWeight='400'
        >
          <Text
            fontSize='12px'
            color='#6F6F6F'
          >
            Enviado por: {comment.comments.creator.nickname}
          </Text>
          <Text
            fontSize='18px'
          >
            {comment.comments.content}
          </Text>
          <Flex
            w='175px'
            h='28px'
            justifyContent='space-between'
            fontSize='10px'
          >
            <Flex
              w='98px'
              padding='4px'
              alignItems='center'
              justifyContent='space-between'
              border='1px solid #ECECEC'
              borderRadius='28px'
              fontWeight='700'
            >
              <Image src={likeIcon} alt='icone like' />
              {comment.comments.likes}
              <Image src={dislikeIcon} alt='icone like' />
            </Flex>
          </Flex>
        </Flex>
      }
    </>
  )
}

export default CardPostAndComments