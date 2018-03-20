import React from 'react'
import { Platform } from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { TabNavigator, TabBarBottom } from 'react-navigation'

// import Colors from '../constants/Colors';

<<<<<<< HEAD
import HomeScreen from '../screens/HomeScreen';
import RecordScreen from '../screens/RecordScreen';
import ResultsScreen from '../screens/ResultsScreen';
import Testing from '../components/TextToSpeech';
=======
import HomeScreen from '../screens/HomeScreen'
import RecordScreen from '../screens/RecordScreen'
import ResultsScreen from '../screens/ResultsScreen'
import Testing from '../components/TextToSpeech'
import Profile from '../screens/Profile'
>>>>>>> 9eae312176db81a7d628837eb715463b4a3773a5

export default TabNavigator (
  {
    Home: {
      screen: HomeScreen,
    },
    Record: {
      screen: RecordScreen,
    },
    Results: {
      screen: ResultsScreen,
    },
    Audio: {
      screen: Testing,
<<<<<<< HEAD
=======
    },
    Profile: {
      screen: Profile,
>>>>>>> 9eae312176db81a7d628837eb715463b4a3773a5
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {

        const { routeName } = navigation.state

        let iconName
        switch (routeName) {
          case 'Home':
            iconName =
              Platform.OS === 'ios'
                ? `ios-information-circle${focused ? '' : '-outline'}`
                : 'md-home'
            break
          case 'Record':
            iconName = Platform.OS === 'ios' ? `ios-microphone${focused ? '' : '-outline'}` : 'md-microphone'
            break
          case 'Results':
            iconName =
              Platform.OS === 'ios' ? `ios-list${focused ? '' : '-outline'}` : 'md-options'
          case 'Audio':
            iconName =
              Platform.OS === 'ios' ? `ios-list${focused ? '' : '-outline'}` : 'md-options'
<<<<<<< HEAD
=======
            break
            case 'Profile':
            iconName =
              Platform.OS === 'ios' ? `ios-list${focused ? '' : '-outline'}` : 'md-options'
>>>>>>> 9eae312176db81a7d628837eb715463b4a3773a5
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
