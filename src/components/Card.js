import React from 'react'
import styled from 'styled-components'
import { useGithubContext } from '../context/context'
import { MdBusiness, MdLocationOn, MdLink } from 'react-icons/md'
import loadingImg from '../images/preloader.gif'

const Card = () => {
  const {
    user: {
      avatar_url: img,
      html_url: url,
      name,
      company,
      blog,
      bio,
      location,
      twitter_username: twitter,
    },
    isApiLoading,
  } = useGithubContext()
  if (isApiLoading)
    return (
      <Wrapper>
        <div className='loading'>
          <img src={loadingImg} alt='Loading...' />
        </div>
      </Wrapper>
    )
  return (
    <Wrapper>
      <header>
        <a href={url} target='_blank' rel='noopener noreferrer'>
          <img className='blur' src={img} alt={name} />
        </a>
        <div>
          <h4>{name}</h4>
          {twitter && <p>@{twitter}</p>}
        </div>
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          <a
            className='styled-link'
            href={url}
            target='_blank'
            rel='noopener noreferrer'
          >
            follow on github
          </a>
          {twitter && (
            <a
              className='styled-link'
              href={`https://twitter.com/${twitter}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              follow on twitter
            </a>
          )}
        </div>
      </header>
      <p className='bio'>{bio}</p>
      <div className='links'>
        {company && (
          <p>
            <MdBusiness />
            {company}
          </p>
        )}
        {location && (
          <p>
            <MdLocationOn />
            {location}
          </p>
        )}
        {blog && (
          <a href={`https://${blog}`} target='_blank' rel='noopener noreferrer'>
            <MdLink />
            {blog}
          </a>
        )}
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.article`
  background: var(--clr-white);
  padding: 1.5rem 2rem;
  border-top-right-radius: var(--radius);
  border-bottom-left-radius: var(--radius);
  border-bottom-right-radius: var(--radius);
  position: relative;
  &::before {
    content: 'user';
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

  header {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    column-gap: 1rem;
    margin-bottom: 1rem;
    img {
      width: 75px;
      height: 75px;
      border-radius: 50%;
    }
    h4 {
      margin-bottom: 0.25rem;
    }
    p {
      margin-bottom: 0;
    }
    a.styled-link {
      color: var(--clr-primary-5);
      border: 1px solid var(--clr-primary-5);
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      text-transform: capitalize;
      letter-spacing: var(--spacing);
      transition: var(--transition);
      cursor: pointer;
      &:hover {
        background: var(--clr-primary-5);
        color: var(--clr-white);
      }
      font-size: 0.75rem;
    }
  }
  .bio {
    color: var(--clr-grey-3);
  }
  .links {
    p,
    a {
      margin-bottom: 0.25rem;
      display: flex;
      align-items: center;
      svg {
        margin-right: 0.5rem;
        font-size: 1.3rem;
      }
    }
    a {
      color: var(--clr-primary-5);
      transition: var(--transition);
      svg {
        color: var(--clr-grey-5);
      }
      &:hover {
        color: var(--clr-primary-3);
      }
    }
  }
  .loading {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    img {
      width: 40%;
      margin: auto 0;
    }
  }
`
export default Card
