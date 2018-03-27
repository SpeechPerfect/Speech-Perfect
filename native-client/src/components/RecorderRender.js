import React from 'react'
import {Button, View, Text } from 'react-native'
import Timer  from './Timer'
import { Uploader, RecordButton } from './'
import styles from '../../assets/stylesheet'

const RenderHeader = () => {
    return (
        <View>
          <Text style={styles.text}>Record</Text>
        </View>
    )
}

const RenderBegin = props => {
    return props.begin ? (
        <View style={{height: 2, marginBottom: -2}}>
          <Text style={{color: 'white'}}>
            ''
          </Text>
        </View>
    ) : (
        <View style={styles.recorderBottomText}>
          <Text style={styles.recorderIntroText} > Press the mic and start speaking </Text>
          <Text style={styles.recorderText}>
            We will analyze your speech and
          </Text>
          <Text style={styles.recorderText}> provide you with suggestions on how to improve </Text>
        </View>
    )
}

const RenderStop = () => {
    return (
        <View style={styles.recorderIntroText}>
          <Text style={styles.recorderStopText} > Press the mic to stop recording </Text>
        </View>
    )
}

const RenderReset = props => {
    const state = props.state
    const onButtonClear = props.onButtonClear

    return (
        <View style={styles.recorderButtons}>
          <View style={styles.recorderUpload}>
            <Button style={styles.recorderButton} color="white" onPress={onButtonClear} title="reset" />
          </View>
          {!state.isClicked && (
                  <View style={styles.recorderUpload}>
                    <Uploader navigation={props.navigation} uri={state.recording._uri} duration={state.durationMillis} />
                  </View>)
          }
        </View>
    )
}

const RecorderRender = props => {
    const state = props.state
    const { onButtonClear, startRecording, stopRecording } = props.buttons
    let buttonMethod
    buttonMethod = state.isRecording ? stopRecording : startRecording
    return (
        <View style={styles.container}>
          <View style={styles.recorderHeader}>
            <RenderHeader />
          </View>
          <View style={styles.recorderTopContainer}>
            <Timer duration={state.duration} />
          </View>
          <View style={styles.recorderBottomContainer}>
            <RecordButton press={buttonMethod} />
            <RenderBegin begin={state.begin} />
            {(state.begin && state.isClicked) && <RenderStop />}
            <View style={styles.recorderBottomText}>
              {state.begin && <RenderReset navigation={props.navigation} state={state} onButtonClear={onButtonClear} />}
             </View>
            </View>
            </View>
    )
}

export default RecorderRender
