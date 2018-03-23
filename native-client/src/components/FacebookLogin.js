import React from "react"
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  View
} from "react-native"

import Expo from "expo"
import { Facebook } from "expo"


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
          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={() => this.logIn()} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>
                Login with Facebook
              </Text>
            </TouchableOpacity>
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 20,
    color: "white",
    padding: 10,
    backgroundColor: "#3b5998"
  }
})
