import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import  {Recorder}  from '../components';

export default class RecordScreen extends React.Component {
  static navigationOptions = {
    title: 'Record',
  };

  render() {
    return (
      <View>
           <Recorder />
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: 'black',
  },
})
