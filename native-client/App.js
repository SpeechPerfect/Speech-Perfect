import React from 'react'
import { Provider } from 'react-redux'
import { Platform, StatusBar, View, AsyncStorage as store } from 'react-native'
import createRootNavigator from './src/navigation/RootNavigation'
import { Font, AppLoading } from 'expo'
import styles from './assets/stylesheet'
console.disableYellowBox = true


export default class App extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            fontLoaded: false,
            isReady: false,
            signedIn: false,
            checkedForUser: false
        }
    }

    componentDidMount() {
        if (Platform.OS === 'android'){
            Font.loadAsync({
                Arial: require('./fonts/Arial.ttf'),
                'Geeza Pro': require('./fonts/Geeza_Pro_Regular.ttf'),
                'Avenir-Book': require('./fonts/Avenir-Book.otf')
            })
                .then(() => this.setState({ fontLoaded: true }))
        }
        else {
        setTimeout(() => this.setState({ fontLoaded: true }), 1100)
            }

        store.getItem('user')
        .then((user) => JSON.parse(user))
        .then(userData => {
            console.log('user data is ', userData)
            this.setState({
                signedIn: !!userData.id,
                checkedForUser: true
            })
        })
        .catch(err => console.log(err))
        }

    render() {
        console.log('OH HAI', this.state)
        const { signedIn } = this.state
        const Layout = createRootNavigator(signedIn)

        if (!this.state.fontLoaded) {
            return (
              <AppLoading />
            )
          }


      return (
    <Provider store={store}>
      <View style={styles.container}>
        {/* what is this element? */}
        <View style={styles.statusBar} >
         {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
        </View>
        {<Layout />}
      </View>
    </Provider>
    )}
}
