import React from 'react'
import { useGithubContext } from '../context/context'
import styled from 'styled-components'
import { GoRepo, GoGist } from 'react-icons/go'
import { FiUsers, FiUserPlus } from 'react-icons/fi'
import loadingImg from '../images/preloader.gif'

const UserInfo = () => {
  const {
    user: { public_repos: repos, followers, following, public_gists: gists },
    isApiLoading,
  } = useGithubContext()

  const setItem = (id, icon, label, value, color) => {
    return { id, icon, label, value, color }
  }

  let items = []
  items.push(setItem(1, <GoRepo className='icon' />, 'repos', repos, 'pink'))
  items.push(
    setItem(2, <FiUsers className='icon' />, 'followers', followers, 'green')
  )
  items.push(
    setItem(
      3,
      <FiUserPlus className='icon' />,
      'following',
      following,
      'purple'
    )
  )
  items.push(setItem(4, <GoGist className='icon' />, 'gists', gists, 'yellow'))

  return (
    <section className='section'>
      <Wrapper className='section-center'>
        {items.map((item) => (
          <Item key={item.id} {...item} isApiLoading={isApiLoading} />
        ))}
      </Wrapper>
    </section>
  )
}

const Item = ({ icon, label, value, color, isApiLoading }) => {
  if (isApiLoading)
    return (
      <div className='loading'>
        <img src={loadingImg} alt='Loading...' />
      </div>
    )
  return (
    <article className='item'>
      <span className={color}>{icon}</span>
      <div>
        <h3>{value}</h3>
        <p>{label}</p>
      </div>
    </article>
  )
}

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem 2rem;
  @media (min-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  }
  .item {
    border-radius: var(--radius);
    padding: 1rem 2rem;
    background: var(--clr-white);
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 3rem;
    align-items: center;
    span {
      width: 3rem;
      height: 3rem;
      display: grid;
      place-items: center;
      border-radius: 50%;
    }
    .icon {
      font-size: 1.5rem;
    }
    h3 {
      margin-bottom: 0;
      letter-spacing: 0;
    }
    p {
      margin-bottom: 0;
      text-transform: capitalize;
    }
    .pink {
      background: #ffe0f0;
      color: #da4a91;
    }
    .green {
      background: var(--clr-primary-10);
      color: var(--clr-primary-5);
    }
    .purple {
      background: #e6e6ff;
      color: #5d55fa;
    }
    .yellow {
      background: #fffbea;
      color: #f0b429;
    }
  }
  .loading {
    width: 6rem;
    display: block;
    margin: 0 auto;
  }
`

export default UserInfo
