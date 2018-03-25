import { StackNavigator } from "react-navigation"

import {SignupScreen, LoginScreen} from "../screens"

export const SignedOut = StackNavigator({
  SignUp: {
    screen: SignupScreen,
    navigationOptions: {
      title: "Sign Up"
    }
  },
  SignIn: {
    screen: LoginScreen,
    navigationOptions: {
      title: "Log In"
    }
  }
})
