import React from 'react'
import { Platform, Button } from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'

// import Colors from '../constants/Colors';

import RecordScreen from '../screens/RecordScreen'
import ResultsScreen from '../screens/ResultsScreen'
import Profile from '../screens/Profile'
import SingleReport from '../screens/SingleReport'

export default TabNavigator (
  {
    Record: {
      screen: RecordScreen,
    },
    Profile: {
      screen: StackNavigator({
        profile: { screen: Profile, path: 'profile/:name',
        navigationOptions: ({ navigation }) => ({
          title: 'Profile',
          headerStyle: {
            backgroundColor: 'white',
            // tintColor:'rgb(252,197,76)',
          },
          headerRight: <Button title='Coach' color='#12092f' onPress={() => navigation.navigate('Results')} />,
          // headerLeft: <Button title='Edit' color='white' onPress={() => navigation.navigate('share')} />,
          headerTintColor: '#12092f',
        }),
        },
        Results: {
          screen: ResultsScreen,
        },
      })
    },

  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {

        const { routeName } = navigation.state

        let iconName
        switch (routeName) {
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
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      style: {
        // backgroundColor: '#12092f',
        height: 45,
          },
        },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  },
)
