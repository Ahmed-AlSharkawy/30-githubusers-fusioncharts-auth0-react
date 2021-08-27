import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useParams, Redirect } from 'react-router-dom'
import loadingGif from './images/preloader.gif'
import { useGithubContext } from './context/context'

function AppWrapper() {
  const { login } = useParams()
  const { isApiLoading, searchGithubUser } = useGithubContext()

  useEffect(() => {
    const fetchData = async () => {
      return searchGithubUser(login)
    }
    fetchData()
  }, [login, searchGithubUser])

  if (isApiLoading) {
    console.log('loading')
    return (
      <Wrapper>
        <img src={loadingGif} alt='Loading...' />
      </Wrapper>
    )
  }

  return <Redirect to='/' />
}

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  img {
    width: 150px;
  }
`
export default AppWrapper
