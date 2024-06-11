// Example implementation of getTokenFromLS
export const getTokenFromLS = () => localStorage.getItem('access_token') || ''



// Example implementation of getTokenFromLS
export const getRefreshTokenFromLS = () => localStorage.getItem('refresh_token') || ''





// Implementation of setAccessTokenToLS
export const setAccessTokenToLS = (access_token: string) =>
  localStorage.setItem('access_token', access_token)

export const clearLS = () => {
  localStorage.removeItem('access_token')
}
