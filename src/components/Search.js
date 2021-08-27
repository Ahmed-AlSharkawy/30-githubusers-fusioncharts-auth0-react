import React from 'react'
import styled from 'styled-components'
import { MdSearch } from 'react-icons/md'
import loadingImg from '../images/preloader.gif'
import { useGithubContext } from '../context/context'
const Search = () => {
  const {
    isRequestsLoading,
    limit,
    used,
    remaining,
    reset,
    requestsError,
    login,
    apiError,
    isApiLoading,
    searchGithubUser,
    checkRequests,
  } = useGithubContext()

  const [user, setUser] = React.useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isApiLoading) searchGithubUser(user)
  }
  return (
    <section className='section'>
      <Wrapper className='section-center'>
        {(requestsError || apiError) && (
          <ErrorWrapper>
            <p>{requestsError}</p>
            <p>{apiError}</p>
          </ErrorWrapper>
        )}
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <MdSearch />
            <input
              type='text'
              placeholder='enter github user'
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            {remaining > 0 && !isApiLoading && (
              <button type='submit'>search</button>
            )}
          </div>
          <div className='buttons-container'>
            <button type='button' className='btn' onClick={checkRequests}>
              check requests
            </button>
            <a
              href={`https://github-users-pagination-react-hooks.netlify.app/${login}`}
              target='_blank'
              rel='noopener noreferrer'
              className='btn'
            >
              open in full data app
            </a>
          </div>
        </form>
        {isRequestsLoading === true ? (
          <div className='loading'>
            <img src={loadingImg} alt='loading...' />
          </div>
        ) : (
          <div>
            <h4>
              <span>Used Requests : </span>
              {used} / {limit}
            </h4>
            <h4>
              <span>Remaining Requests : </span>
              {remaining}
            </h4>
            <h4>
              <span>Reset Time : </span>
              {reset}
            </h4>
          </div>
        )}
      </Wrapper>
    </section>
  )
}

const Wrapper = styled.div`
  position: relative;
  display: grid;
  gap: 1rem 1.75rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr max-content;
    align-items: start;

    h3,
    h4 {
      padding: 0 0.5rem;
    }
  }
  .form-control {
    background: var(--clr-white);
    display: grid;
    align-items: center;
    grid-template-columns: auto 1fr auto;
    column-gap: 0.5rem;
    border-radius: 5px;
    padding: 0.5rem;
    input {
      border-color: transparent;
      outline-color: var(--clr-grey-10);
      letter-spacing: var(--spacing);
      color: var(--clr-grey-3);
      padding: 0.25rem 0.5rem;
    }
    input::placeholder {
      color: var(--clr-grey-3);
      text-transform: capitalize;
      letter-spacing: var(--spacing);
    }
    button {
      border-radius: 5px;
      border-color: transparent;
      padding: 0.25rem 0.5rem;
      text-transform: capitalize;
      letter-spacing: var(--spacing);
      background: var(--clr-primary-5);
      color: var(--clr-white);
      transition: var(--transition);
      cursor: pointer;
      &:hover {
        background: var(--clr-primary-8);
        color: var(--clr-primary-1);
      }
    }

    svg {
      color: var(--clr-grey-5);
    }
    input,
    button,
    svg {
      font-size: 1.3rem;
    }
    @media (max-width: 800px) {
      button,
      input,
      svg {
        font-size: 0.85rem;
      }
    }
  }
  .loading {
    width: 6rem;
  }
  h3,
  h4 {
    margin-bottom: 0.5em;
    color: var(--clr-grey-5);
    font-weight: 400;
    span {
      color: var(--clr-primary-2);
    }
  }
  .buttons-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;

    align-items: flex-start;
    .btn {
      font-size: 0.75rem;
      line-height: 1.25;
    }
  }

  @media screen and (min-width: 768px) {
    .buttons-container {
      flex-direction: row;
    }
  }
`
const ErrorWrapper = styled.article`
  position: absolute;
  width: 90vw;
  top: 0;
  left: 0;
  transform: translateY(-100%);
  text-transform: capitalize;
  p {
    color: red;
    letter-spacing: var(--spacing);
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
`
export default Search
