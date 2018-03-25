import { AsyncStorage as store } from "react-native"

export const USER_KEY = "auth-demo-key"

export const onSignIn = () => store.setItem('user', "true")

export const onSignOut = () => AsyncStorage.removeItem('user')

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    store.getItem('user')
      .then(res => {
        if (res !== null) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
      .catch(err => reject(err))
  })
}
