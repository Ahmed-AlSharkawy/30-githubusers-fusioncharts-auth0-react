import {
  SET_REQUESTS_ERROR,
  SET_REQUESTS,
  TOGGLE_REQUESTS_LOADING,
  SET_API_DATA,
  SET_API_ERROR,
  TOGGLE_API_LOADING,
} from './actions'

const reducer = (state, { type, payload }) => {
  switch (type) {
    case SET_REQUESTS_ERROR:
      return {
        ...state,
        requests: { ...state.requests, requestsError: payload },
      }

    case SET_REQUESTS:
      const { limit, used, remaining, reset } = payload
      return {
        ...state,
        requests: { ...state.requests, limit, used, remaining, reset },
      }

    case TOGGLE_REQUESTS_LOADING:
      return {
        ...state,
        requests: { ...state.requests, isRequestsLoading: payload },
      }

    case SET_API_ERROR:
      return {
        ...state,
        data: { ...state.data, apiError: payload },
      }

    case TOGGLE_API_LOADING:
      return {
        ...state,
        data: { ...state.data, isApiLoading: payload },
      }

    case SET_API_DATA:
      const { login, user, repos, followers } = payload
      return {
        ...state,
        data: { ...state.data, login, user, repos, followers },
      }

    default:
      break
  }
}
export default reducer
