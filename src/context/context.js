import React, { useEffect, useReducer, useContext } from 'react'
import moment from 'moment'
// reducer files
import reducer from './reducer'
import {
  SET_REQUESTS_ERROR,
  SET_REQUESTS,
  TOGGLE_REQUESTS_LOADING,
  SET_API_DATA,
  SET_API_ERROR,
  TOGGLE_API_LOADING,
} from './actions'
// initial data files
import { mockUser, mockRepos, mockFollowers } from './mockData.js'
// axios for fetching data
import axios from 'axios'
const rootUrl = 'https://api.github.com'

const initialState = {
  data: {
    isApiLoading: false,
    apiError: null,
    login: 'john-smilga',
    user: mockUser,
    repos: mockRepos,
    followers: mockFollowers,
  },
  requests: {
    isRequestsLoading: true,
    limit: 0,
    used: 0,
    remaining: 0,
    reset: 0,
    requestsError: null,
  },
}

export const GithubContext = React.createContext()

export const GithubProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const checkRequests = () => {
    dispatch({ type: SET_REQUESTS_ERROR, payload: null })
    dispatch({ type: TOGGLE_REQUESTS_LOADING, payload: true })

    axios(`${rootUrl}/rate_limit`)
      .then((res) => {
        let { limit, used, remaining, reset } = res.data.rate
        reset = moment.unix(reset).format('DD/MM/YYYY hh:mm:ss')
        dispatch({
          type: SET_REQUESTS,
          payload: { limit, used, remaining, reset },
        })

        if (!remaining)
          dispatch({
            type: SET_REQUESTS_ERROR,
            payload: 'you have exceeded hourly rate limit!',
          })
      })
      .catch((err) => {
        dispatch({ type: SET_REQUESTS_ERROR, payload: err.toString() })
      })
      .finally(() =>
        dispatch({ type: TOGGLE_REQUESTS_LOADING, payload: false })
      )
  }

  const searchGithubUser = async (userName) => {
    if (!userName)
      return dispatch({
        type: SET_API_ERROR,
        payload: 'you must enter a valid username!',
      })

    dispatch({ type: SET_API_ERROR, payload: null })
    dispatch({ type: TOGGLE_API_LOADING, payload: true })

    let user, repos, followers
    await axios(`${rootUrl}/users/${userName}`)
      .then((res) => {
        user = res.data
      })
      .catch((err) =>
        dispatch({ type: SET_API_ERROR, payload: err.toString() })
      )

    if (user) {
      const { login, followers_url, repos_url } = user

      await Promise.allSettled([
        axios(`${repos_url}?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ])
        .then((results) => {
          const [reposRes, followersRes] = results

          if (reposRes.status === 'fulfilled') repos = reposRes.value.data
          else if (reposRes.status === 'rejected')
            dispatch({
              type: SET_API_ERROR,
              payload: reposRes.reason.toString(),
            })

          if (followersRes.status === 'fulfilled')
            followers = followersRes.value.data
          else if (followersRes.status === 'rejected')
            dispatch({
              type: SET_API_ERROR,
              payload: followersRes.reason.toString(),
            })
        })
        .catch((err) =>
          dispatch({ type: SET_API_ERROR, payload: err.toString() })
        )

      dispatch({
        type: SET_API_DATA,
        payload: { login, user, repos, followers },
      })
    }

    checkRequests()
    dispatch({ type: TOGGLE_API_LOADING, payload: false })
  }

  useEffect(checkRequests, [])

  return (
    <GithubContext.Provider
      value={{
        ...state,
        ...state.data,
        ...state.requests,
        searchGithubUser,
        checkRequests,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export const useGithubContext = () => useContext(GithubContext)
