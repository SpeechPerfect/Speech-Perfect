import React from 'react'
import { View, Text, TouchableHighlight, Modal } from 'react-native'
import styles from '../../assets/stylesheet'
import { EditTitleForm } from './'

const EditModal = props => {
  speech = props.speech
  return (
    <Modal
      // animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible(false, speech)
      }}
      style={styles.modalContainer}
    >
      <View style={styles.modalContainer}>
        <TouchableHighlight
          onPress={() => {
            props.setModalVisible(false, speech)
          }}
        >
          <View style={styles.modal}>
            <Text style={styles.text}> Edit Speech Title </Text>
            <EditTitleForm
              speech={props.speech}
              setModalVisible={props.setModalVisible}
            />
          </View>
        </TouchableHighlight>
      </View>
    </Modal>
  )
}
export default EditModal
