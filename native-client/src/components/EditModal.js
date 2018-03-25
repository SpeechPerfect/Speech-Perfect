import React, { Component } from 'react'
import { FlatList, View, StyleSheet, Button, Dimensions, Image, Text, TouchableHighlight, Modal } from 'react-native'
import styles from '../../assets/stylesheet'
import EditTitleForm from './EditTitleForm'

const EditModal = (props) =>  {
    console.log('EDIT MODAL', props)
    return (
       <Modal
        // animationType="slide"
        transparent={ true }
        visible={ props.modalVisible }
        onRequestClose={() => { props.setModalVisible(false, 0) }}
        style={styles.modalContainer}
       >
         <View style={styles.modalContainer}>
            <TouchableHighlight
              onPress={() => { props.setModalVisible(false, 0) }}
            >
            <View style={styles.modal}>
              <Text> Edit Speech Title </Text>
              <EditTitleForm speech={props.speech} />
            </View>
            </TouchableHighlight>
         </View>
       </Modal>
    )
}
export default EditModal
export { EditModal }
