import { StackNavigator } from 'react-navigation'
import {SignedInNav} from './MainTabNavigator'
import {SignedOutNav} from './SignedOutNavigator'

const createRootNavigator = (signedIn = false) => {
  return StackNavigator( //eslint-disable-line new-cap
    {
      SignedIn: {
        screen: SignedInNav,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
      SignedOut: {
        screen: SignedOutNav,
        navigationOptions: {
          gesturesEnabled: false
        }
      }
    },
    {
      headerMode: 'none',
      mode: 'modal',
      initialRouteName: signedIn ? 'SignedIn' : 'SignedOut'
    }
  )
}

export default createRootNavigator
