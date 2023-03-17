export const goToLoginPage = (navigate) => {
    navigate('/')
}

export const goToSignupPage = (navigate) => {
    navigate('/signup')
}

export const goToPostsPage = (navigate) => {
    navigate('/posts')
}

export const goToCommentsPage = (navigate, idPost) => {
    navigate(`${idPost}/posts/comments`)
}