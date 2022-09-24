import router from '../router'
import store from '../store'

export function authGuard () {
  if (store.state.isLoggedIn) {
    // logged in so return true
    return true
  }
  // not logged in so redirect to login page with the return url
  // router.push({ path: '/home', query: { returnUrl: to.fullPath } });
    router.push({ path: '/auth/signin' })
    return false
}