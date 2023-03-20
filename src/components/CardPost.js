import { Image, Flex, Text, useEditableControls, Input, EditablePreview, Editable, EditableInput, IconButton, ButtonGroup } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import likeIcon from '../assets/icons/like.svg'
import dislikeIcon from '../assets/icons/dislike.svg'
import { useNavigate } from 'react-router'
import { goToCommentsPage } from '../routes/coordinator'
import { ChatIcon, CheckIcon, CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { GlobalContext } from '../contexts/GlobalContext'
import axios from 'axios'
import { BASE_URL } from '../constants/url'

const CardPost = (props) => {
  const { post } = props

  const context = useContext(GlobalContext)
  const { setIsLoading, getPosts } = context

  const [content, setContent] = useState(post.content)
  const [postToEdit, setPostToEdit] = useState(false)
  const [likePost, setLikePost] = useState(post.likes)
  const [dislikePost, setDislikePost] = useState(post.dislikes)

  const navigate = useNavigate()


  const editPost = async () => {
    try {
      setIsLoading(true)
      const body = {
        content: content
      }
      const config = {
        headers: {
          Authorization: window.localStorage.getItem("labeddit-token")
        }
      }
      await axios.put(`${BASE_URL}/posts/${post.id}`, body, config)
      setPostToEdit(!postToEdit)
      setIsLoading(false)
      getPosts()

    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  const deletePost = async () => {
    try {
      setIsLoading(true)
      const config = {
        headers: {
          Authorization: window.localStorage.getItem("labeddit-token")
        }
      }

      await axios.delete(`${BASE_URL}/posts/${post.id}`, config)
      setIsLoading(false)
      getPosts()

    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  // const likeDislikePost = async () => {
  //   try {
  //     const body = {
  //       like: 
  //     }
  //     const config = {
  //       headers: {
  //         Authorization: window.localStorage.getItem("labeddit-token")
  //       }
  //     }


  //   } catch (error) {
  //     console.log(error)
  //     setIsLoading(false)
  //   }
  // }

  const EditableControls = () => {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls()

    return isEditing ? (
      <ButtonGroup justifyContent='center' size='sm'>
        <IconButton icon={<CheckIcon onClick={editPost} color='#6F6F6F' />} {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon color='#6F6F6F' />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex >
        <IconButton icon={<EditIcon color='#6F6F6F' />} {...getEditButtonProps()} />
      </Flex>
    )
  }

  return (
    <>

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
        <Flex justifyContent='space-between'>
          <Text
            fontSize='12px'
            color='#6F6F6F'
          >
            Enviado por: {post.creator.nickname}
          </Text>
          <DeleteIcon color='red' cursor='pointer' onClick={deletePost} />
        </Flex>
        <Text
          fontSize='18px'
        >
          <Editable
            defaultValue={post.content}
            isPreviewFocusable={false}
          >
            <EditablePreview />
            { }
            <Input as={EditableInput} value={content} onChange={(e) => setContent(e.target.value)} />
            <EditableControls />
          </Editable>

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
            <Image cursor={'pointer'} src={likeIcon} alt='icone like' />
            {post.likes}
            <Image cursor={'pointer'} src={dislikeIcon} alt='icone like' />
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
            <ChatIcon boxSize={4} color='#6F6F6F' cursor={'pointer'} onClick={() => goToCommentsPage(navigate, post.id)} />
            {post.commentsPost}
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default CardPost