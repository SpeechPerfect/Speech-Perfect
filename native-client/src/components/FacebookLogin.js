import React from "react"
import { Alert, Text, TouchableOpacity, View } from "react-native"
import Expo from "expo"
import styles from '../../assets/stylesheet'

export default class FacebookLogin extends React.Component {
  async logIn() {
    const {
      type,
      token
    } = await Expo.Facebook.logInWithReadPermissionsAsync("126975674509524", {
      permissions: ["public_profile", "email"]
    })
    if (type === "success") {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`)
      Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`)
    }
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.facebookHelpContainer}>
            <TouchableOpacity onPress={() => this.logIn()} style={styles.facebookHelpLink}>
              <Text style={styles.facebookHelpLinkText}>
                Login with Facebook
              </Text>
            </TouchableOpacity>
          </View>
      </View>
    )
  }
}
