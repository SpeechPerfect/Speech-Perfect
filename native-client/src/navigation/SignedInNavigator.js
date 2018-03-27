/* eslint-disable new-cap */
import React from 'react'
import { Platform, Button } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'
import { RecordScreen, ProfileScreen, SingleReportScreen, TranscriptScreen } from '../screens'
import styles from '../../assets/stylesheet'

export const SignedInNav = TabNavigator(
  {
    Record: {
      screen: RecordScreen
    },
    Profile: {
      screen: StackNavigator({
        profile: { screen: ProfileScreen,
        navigationOptions: ({ navigation }) => ({
          title: 'History',
          headerStyle: {
            backgroundColor: 'white',
            height: 20
          },
          headerTintColor: '#12092f'
        }),
        },
        singleReport: { screen: SingleReportScreen,
        navigationOptions: ({ navigation }) => ({
          title: 'Report',
          headerStyle: {
            backgroundColor: 'white',
            height: 20
          },
          headerLeft: <Button title="Back to Profile" color="#12092f" onPress={() => navigation.navigate('profile')} />,
          headerTintColor: '#12092f'
        }),
        },
        TranscriptScreen: {screen: TranscriptScreen,
          navigationOptions: ({ navigation }) => ({
            title: 'Transcript',
            headerStyle: {
              backgroundColor: 'white',
              height: 20
            },
            headerLeft: <Button title="Back to Report" color="#12092f" onPress={() => navigation.navigate('singleReport')} />,
            headerTintColor: '#12092f'
          })
        },
      })
    },

  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => { //eslint-disable-line

        const { routeName } = navigation.state

        let iconName
        switch (routeName) { //eslint-disable-line default-case
        case 'Record':
            iconName = Platform.OS === 'ios' ? `ios-microphone${focused ? '' : '-outline'}` : 'md-microphone'
            break
        case 'Profile':
            iconName =
                Platform.OS === 'ios' ? `ios-bookmark${focused ? '' : '-outline'}` : 'md-bookmark'
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={styles.navigatorIonicon}
          />
        )
      }
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      style: {
        // backgroundColor: '#12092f',
        height: 45
          }
        },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false
  },
)

export default SignedInNav
