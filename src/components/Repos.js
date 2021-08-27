import React from 'react'
import styled from 'styled-components'
import { useGithubContext } from '../context/context'
import { Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts'
import loadingImg from '../images/preloader.gif'

const Repos = () => {
  const { login, repos, isApiLoading } = useGithubContext()
  if (isApiLoading)
    return (
      <Loading>
        <img src={loadingImg} alt='Loading...' />
      </Loading>
    )

  if (!repos)
    return (
      <Loading>
        <h3>something went wrong!</h3>
      </Loading>
    )

  if (repos.length === 0)
    return (
      <Loading>
        <h3>{login} has no repositories!</h3>
      </Loading>
    )
  const languages = repos.reduce((total, repo) => {
    const { language, stargazers_count: stars } = repo
    if (!language) return total
    const lang = total[language]
    if (!lang) total[language] = { label: language, value: 1, stars }
    else
      total[language] = {
        ...lang,
        value: lang.value + 1,
        stars: lang.stars + stars,
      }

    return total
  }, {})

  const mostUseed = Object.values(languages)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)

  const mostPopular = Object.values(languages)
    .map((lang) => {
      return { ...lang, value: lang.stars }
    })
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)
  const getPropertiyName = (obj, name) => {
    if (!obj.name) return name
    let index = 1
    while (true) {
      const secondName = name + index
      if (!obj.secondName) return secondName
      index++
    }
  }
  let { reposStars, reposForks } = repos.reduce(
    (total, repo) => {
      const { stargazers_count: repoStars, name, forks } = repo
      total.reposStars[getPropertiyName(total.reposStars, repoStars)] = {
        label: name,
        value: repoStars,
      }
      total.reposForks[getPropertiyName(total.reposForks, forks)] = {
        label: name,
        value: forks,
      }
      return total
    },
    { reposStars: {}, reposForks: {} }
  )

  reposStars = Object.values(reposStars).slice(-5).reverse()
  reposForks = Object.values(reposForks).slice(-5).reverse()

  return (
    <section className='section'>
      <Wrapper className='section-center'>
        <Pie3D data={mostUseed} />
        <Column3D data={reposStars} />
        <Doughnut2D data={mostPopular} />
        <Bar3D data={reposForks} />
      </Wrapper>
    </section>
  )
}

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`
const Loading = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  img {
    width: 40%;
    max-width: 25rem;
    margin: 3rem auto;
  }
  h3 {
    max-width: 85%;
    margin: auto 0;
    text-align: center;
    line-height: 1.5em;
    letter-spacing: 0.2rem;
    padding: 5rem 0;
    color: brown;
  }
`

export default Repos
