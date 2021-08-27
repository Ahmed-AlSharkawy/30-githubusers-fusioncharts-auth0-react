import React from 'react'
import { useGithubContext } from '../context/context'
import styled from 'styled-components'
import loadingImg from '../images/preloader.gif'

const Followers = () => {
  const { login, followers, isApiLoading } = useGithubContext()
  if (isApiLoading)
    return (
      <Wrapper>
        <div className='loading'>
          <img src={loadingImg} alt='Loading...' />
        </div>
      </Wrapper>
    )

  if (!followers)
    return (
      <Wrapper>
        <div className='loading'>
          <h3>something went wrong!</h3>
        </div>
      </Wrapper>
    )

  if (followers.length === 0)
    return (
      <Wrapper>
        <div className='loading'>
          <h3>{login} has no followers!</h3>
        </div>
      </Wrapper>
    )

  return (
    <Wrapper>
      <div className='followers'>
        {followers.map((follower, index) => (
          <Follower key={index} {...follower} />
        ))}
      </div>
    </Wrapper>
  )
}

const Follower = ({ avatar_url: img, html_url: url, login }) => {
  return (
    <article>
      <a href={url} target='_blank' rel='noopener noreferrer'>
        <img className='blur' src={img} alt={login} />
      </a>{' '}
      <div>
        <h4>{login}</h4>
        <a href={url} target='_blank' rel='noopener noreferrer'>
          {url}
        </a>
      </div>
    </article>
  )
}

const Wrapper = styled.article`
  background: var(--clr-white);
  border-top-right-radius: var(--radius);
  border-bottom-left-radius: var(--radius);
  border-bottom-right-radius: var(--radius);
  position: relative;

  &::before {
    content: ' followers';
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%);
    background: var(--clr-white);
    color: var(--clr-grey-5);
    border-top-right-radius: var(--radius);
    border-top-left-radius: var(--radius);
    text-transform: capitalize;
    padding: 0.5rem 1rem 0 1rem;
    letter-spacing: var(--spacing);
    font-size: 1rem;
  }
  .followers {
    overflow: scroll;
    height: 260px;
    display: grid;
    grid-template-rows: repeat(auto-fill, minmax(45px, 1fr));
    gap: 1.25rem 1rem;
    padding: 1rem 2rem;
  }
  article {
    transition: var(--transition);
    padding: 0.15rem 0.5rem;
    border-radius: var(--radius);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    column-gap: 1rem;
    img {
      height: 100%;
      width: 45px;
      border-radius: 50%;
      object-fit: cover;
    }
    h4 {
      margin-bottom: 0;
    }
    a {
      color: var(--clr-grey-5);
    }
  }
  .loading {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    img {
      max-width: 40%;
      margin: auto 0;
    }
    h3 {
      max-width: 85%;
      margin: auto 0;
      text-align: center;
      line-height: 1.5em;
      letter-spacing: 0.2rem;
      padding: 3rem 0;
      color: brown;
    }
  }
`
export default Followers
