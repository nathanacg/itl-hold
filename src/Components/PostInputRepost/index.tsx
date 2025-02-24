import { SetStateAction, useEffect, useState } from 'react'
import { Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native'

import { InputCount, InputLegend } from './styles'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { theme, fontStyle } from '../../Theme/theme'


import AudioRecorderPlayer, { AVEncoderAudioQualityIOSType, AVEncodingOption, AVModeIOSOption, AudioEncoderAndroidType, AudioSourceAndroidType, RecordBackType } from 'react-native-audio-recorder-player'
import AudioMessageReceived from './AudioMessageReceived'
import { TrashIcon } from '../MessageCard/style'

interface PostInputProps {
  value: string
  setValue: React.Dispatch<SetStateAction<string>>
  metrics: string
  setAudio?: (uri: string) => void
}

const audioRecorderPlayer = new AudioRecorderPlayer()

let timer = 0
let timerId: NodeJS.Timeout

export default function PostInputRepost(props: PostInputProps) {

  const [isRecording, setIsRecording] = useState(false)
  const [audioPath, setAudioPath] = useState<string>('')


  const [recordingTimer, setRecordingTimer] = useState<number>(0)
  const [cronometroSegundos, setCronometroSegundos] = useState(0)
  const [showCronometro, setShowCronometro] = useState(false)
  const [metric, setMetric] = useState<number[]>([])


  const MAX_RECORDING_TIME = 61

  const resetCronometro = () => {
    setCronometroSegundos(0)
  }

  const onStartRecord = async () => {

    const result = await audioRecorderPlayer.startRecorder(undefined, {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVModeIOS: AVModeIOSOption.spokenaudio,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.max,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    }, true)

    setIsRecording(true)
    setAudioPath(result)
    setRecordingTimer(0)
    startRecordingTimer()
    setShowCronometro(true)
    setCronometroSegundos(0)

    setTimeout(() => {
      onStopRecord()
    }, MAX_RECORDING_TIME * 1000)
  }

  const onStopRecord = async () => {

    const result = await audioRecorderPlayer.stopRecorder()
    await audioRecorderPlayer.removeRecordBackListener()

    setIsRecording(false)
    setAudioPath(result)
    stopRecordingTimer()
    setShowCronometro(false)
    if (props.setAudio) {
      props.setAudio(result)

    }
    await audioRecorderPlayer.addRecordBackListener((e: RecordBackType) => {
      timer = e.currentPosition / 1000
      setMetric(pv => [...pv, e.currentMetering || 0])

    })
  }

  const startRecordingTimer = () => {
    timerId = setInterval(() => {
      setRecordingTimer((prevTimer) => prevTimer + 1)
      setCronometroSegundos((prevSegundos) => prevSegundos + 1)
    }, 1000)
  }

  const stopRecordingTimer = () => {
    clearInterval(timerId)
    setCronometroSegundos(0)
  }

  const formatarTempo = (segundos: number) => {
    const minutos = Math.floor(segundos / 60)
    const segundosRestantes = segundos % 60
    const formatoMinutos = minutos < 10 ? `0${minutos}` : minutos
    const formatoSegundos = segundosRestantes < 10 ? `0${segundosRestantes.toFixed(0)}` : segundosRestantes.toFixed(0)
    return `${formatoMinutos}:${formatoSegundos}`
  }


  useEffect(() => {
    const recordBackListener = (e: RecordBackType) => {
      timer = e.currentPosition / 1000;
      setMetric((pv) => [...pv, e.currentMetering || 0])
    }

    audioRecorderPlayer.addRecordBackListener(recordBackListener)

    return () => {
      audioRecorderPlayer.removeRecordBackListener()
    }
  }, [])

  return (
    <>
      <View>
        <InputLegend>

          <TextInput
            style={{ width: 330, height: 100, fontFamily: fontStyle.regular, fontSize: 13, color: '#ACACAC', paddingTop: 7 }}
            placeholder={"Escreva ou grave sua mensagem..."}
            placeholderTextColor={theme.lightGray}
            value={props.value}
            onChangeText={props.setValue}
            multiline={true}
            maxLength={300}
          />
          {!isRecording && audioPath && (
            <View style={{ marginLeft: -20, marginBottom: -10, width: '87%', flexDirection: 'row', alignItems: 'center' }}>
              <AudioMessageReceived
                uri={audioPath}
                publication
                audioTotalTime={formatarTempo(recordingTimer)}
                configAudMetrics={[-33.92938995361328, -38.041709899902344, -41.189544677734375, -35.6361083984375, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -39.822540283203125, -33.92938995361328, -38.041709899902344, -41.189544677734375, -35.6361083984375, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -39.822540283203125, -42.133541107177734, -42.133541107177734, -32.26824188232422, -32.26824188232422, -13.833025932312012, -13.833025932312012, -24.762142181396484, -24.762142181396484, -23.383811950683594, -23.383811950683594, -21.76665687561035, -21.76665687561035, -16.243961334228516, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -38.041709899902344, -41.189544677734375, -38.041709899902344, -41.189544677734375, -38.041709899902344, -41.189544677734375, -35.6361083984375, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -39.822540283203125, -33.92938995361328, -38.041709899902344, -41.189544677734375, -35.6361083984375, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -39.822540283203125, -42.133541107177734, -42.133541107177734, -32.26824188232422, -32.26824188232422, -13.833025932312012, -13.833025932312012, -24.762142181396484, -24.762142181396484, -23.383811950683594, -23.383811950683594, -21.76665687561035, -21.76665687561035, -16.243961334228516, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -38.041709899902344, -41.189544677734375, -38.041709899902344, -41.189544677734375, -35.6361083984375, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -39.822540283203125, -33.92938995361328, -38.041709899902344, -41.189544677734375, -35.6361083984375, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -39.822540283203125, -42.133541107177734, -42.133541107177734, -32.26824188232422, -32.26824188232422, -13.833025932312012, -13.833025932312012, -24.762142181396484, -24.762142181396484, -23.383811950683594, -23.383811950683594, -21.76665687561035, -21.76665687561035, -16.243961334228516, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -38.041709899902344, -41.189544677734375, -38.041709899902344, -41.189544677734375]}
              //configAudMetrics={metric}
              />
              <View style={{
                width: 30,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <TouchableOpacity
                  style={{ marginBottom: 10 }}
                  activeOpacity={0.3}
                  onPress={() => {
                    setAudioPath('')
                    resetCronometro()
                  }}>
                  <TrashIcon style={{ width: 19, height: 20 }} source={require("../../Assets/Icons/trash.png")} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </InputLegend>
        {/*  <TouchableOpacity
          onPress={() => {
            if (!isRecording) {
              onStartRecord()
            } else {
              onStopRecord()
            }
          }}
          style={{ position: "absolute", bottom: 5, right: 7 }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {isRecording && showCronometro && (
              <Text style={{ color: 'gray', marginLeft: 2, fontSize: 20 }}>{formatarTempo(cronometroSegundos)}</Text>
            )}
            {!isRecording && (
              <FontAwesome
                name="microphone"
                size={22}
                style={{
                  color: 'gray',
                  marginRight: 5,
                  marginBottom: 2
                }}
              />
            )}
            {isRecording && (
              <FontAwesome
                name="arrow-up"
                size={22}
                style={{
                  color: theme.primarycolor,
                  marginRight: 2,
                  marginLeft: 5,
                }}
              />
            )}
          </View>
        </TouchableOpacity> */}
      </View >
      <InputCount style={{ alignSelf: "flex-end" }}>
        {300 - props.value.length}
      </InputCount>
    </>
  )
}