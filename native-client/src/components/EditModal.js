import React, { Component } from 'react'
import { FlatList, View, StyleSheet, Button, Dimensions, Image, Text, TouchableHighlight, Modal } from 'react-native'


export default class EditModal extends Component {
  constructor() {
    super()
    this.state = {
      modalVisible: false,
      id: null,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      modalVisible: nextProps.modalVisible,
      id: nextProps.id,
    })
  }

  render() {
    return (
       <Modal
        // animationType="slide"
        transparent={ true }
        visible={ this.state.modalVisible }
        onRequestClose={() => { this.props.setModalVisible(false) }}
        style={styles.modalContainer}
       >
         <View style={styles.modalContainer}>
           <View>
            <TouchableHighlight
              onPress={() => { this.props.setModalVisible(false) }}
            >
            <View style={{backgroundColor: 'blue', height: 400, width: 600}}>
            {/* <Image
                style={{height:400, width:600}}
                source={{uri: musicians[this.props.id].image}} /> */}
              <Text> HEYYY </Text>
            </View>
            </TouchableHighlight>
           </View>
         </View>
       </Modal>
    )
  }
}

export { EditModal }

const styles = StyleSheet.create({
  modalContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    // height: 500,
    // width: 500,
    flex: 1,
  },
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
})


//react-native-button
//react-native-modalbox
