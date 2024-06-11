//  phương thức nèa
export const getAccessTokenFromLS = () =>
  localStorage.getItem('access_token') || ''

export const getRefreshTokenFromLS = () =>
  localStorage.getItem('access_token') || ''

export const setAccessTokenToLS = (access_token: string) =>
  localStorage.setItem('access_token', access_token)

export const setRefreshTokenToLS = (refresh_token: string) => {
  localStorage.setItem('refresh_token', refresh_token)
}
export const clearLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}
