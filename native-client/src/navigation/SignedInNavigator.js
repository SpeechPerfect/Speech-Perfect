/* eslint-disable new-cap */
import React from 'react'
import { Platform, Button } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'

import { RecordScreen, ResultsScreen, ProfileScreen, SingleReportScreen, TranscriptScreen } from '../screens'

export const SignedInNav = TabNavigator(
  {
    Record: {
      screen: RecordScreen
    },
    Profile: {
      screen: StackNavigator({
        profile: { screen: ProfileScreen, path: 'profile/:name',
        navigationOptions: ({ navigation }) => ({
          title: 'Profile',
          headerStyle: {
            backgroundColor: 'white',
            height: 20
            // tintColor:'rgb(252,197,76)',
          },
          // Why do we need this?
          // headerRight: <Button title='Coach' color='#12092f' onPress={() => navigation.navigate('results')} />,
          headerTintColor: '#12092f'
        }),
        },
        Results: {
          screen: TabNavigator({
            results: { screen: ResultsScreen, path: 'profile/results',
            navigationOptions: ({ navigation }) => ({
              title: 'Results',
              headerStyle: {
                backgroundColor: 'white',
                height: 20
              },
              headerLeft: <Button title="Profile" color="#12092f" onPress={() => navigation.navigate('results')} />,
              headerTintColor: '#12092f'
            })
            },
            singleReport: { screen: SingleReportScreen, path: 'profile/report',
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
            TranscriptScreen
          : {
              screen: TranscriptScreen
            ,
              navigationOptions: ({ navigation }) => ({
                title: 'Transcript',
                headerStyle: {
                  backgroundColor: 'white',
                  height: 20
                },
                headerLeft: <Button title="Back to Report" color="#12092f" onPress={() => navigation.navigate('singleReport')} />,
                headerTintColor: '#12092f'
              })
            }
        },

        {
          navigationOptions: { tabBarVisible: false }
          }
      )}
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
        case 'Results':
            iconName =
                Platform.OS === 'ios' ? `ios-list${focused ? '' : '-outline'}` : 'md-options'
        case 'Profile':
            iconName =
                Platform.OS === 'ios' ? `ios-list${focused ? '' : '-outline'}` : 'md-options'
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={'#12092f'}
            // color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
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
