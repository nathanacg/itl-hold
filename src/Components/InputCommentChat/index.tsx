import { useEffect, useRef, useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'

import { theme } from '../../Theme/theme'
import Icon from 'react-native-vector-icons/Foundation'

import {
    InputCommentContainer,
    Input,
    CircleButton,
    BlueButtonImage,
    CameraIcon,
    ClipIcon,
    InputText,
    ConatinerAudioTime,
    TextTime
} from './style'

import AudioRecorderPlayer, { AVEncoderAudioQualityIOSType, AVEncodingOption, AVModeIOSOption, AudioEncoderAndroidType, AudioSourceAndroidType, RecordBackType } from 'react-native-audio-recorder-player'

import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
} from 'react-native-reanimated'


import { Profile } from '../../Pages/Feed/components/ComentsList'

const audioRecorderPlayer = new AudioRecorderPlayer()

import { useSocket } from '../../context/socket'

interface InputcommentProps {
    placeholder: string
    setValue?: (text: string) => void
    onSend: (text: string) => void
    onOpenGalery?: () => void
    onOpenCamera?: () => void
    paddingBottom?: string
    marcations?: Profile[]
    chatRoomId?: string
    options?: boolean
    notAudio?: boolean
}

let timer = 0
let timerId: NodeJS.Timeout

export default function InputcommentChat(props: InputcommentProps) {

    const inputRef = useRef<TextInput>(null)
    const { sendAudio } = useSocket()

    const vibrationStrength = 5

    const [isPressing, setIsPressing] = useState(false);
    const [isRecording, setIsRecording] = useState<boolean>(false)
    const [audioPath, setAudioPath] = useState<string | undefined>(undefined)

    const [recordingTimer, setRecordingTimer] = useState<number>(0)
    const [cronometroSegundos, setCronometroSegundos] = useState(0)


    const [showCronometro, setShowCronometro] = useState(false)
    const [metric, setMetric] = useState<number[]>([])

    const containerAudioAnimation = useSharedValue(1)
    const containerBackgroundColorAnimation = useSharedValue('blue')

    const containerStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { scaleX: containerAudioAnimation.value },
                { scaleY: containerAudioAnimation.value },

            ],
            backgroundColor: containerBackgroundColorAnimation.value,
        };
    })

    const onStartRecord = async () => {
        await audioRecorderPlayer.stopPlayer()
        await audioRecorderPlayer.stopRecorder()
        const result = await audioRecorderPlayer.startRecorder(undefined, {
            AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
            AudioSourceAndroid: AudioSourceAndroidType.MIC,
            AVModeIOS: AVModeIOSOption.spokenaudio,
            AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.max,
            AVNumberOfChannelsKeyIOS: 2,
            AVFormatIDKeyIOS: AVEncodingOption.aac,
        }, true)

        audioRecorderPlayer.addRecordBackListener((e: RecordBackType) => {
            timer = e.currentPosition / 1000
            setMetric(pv => [...pv, e.currentMetering || 0])
        });
        setIsRecording(true);
        setAudioPath(result);
        setRecordingTimer(0);
        startRecordingTimer();
        setShowCronometro(true);
        setCronometroSegundos(0);
        containerAudioAnimation.value = 2;
        containerBackgroundColorAnimation.value = theme.dangerColor;
        containerAudioAnimation.value = withSpring(1.5, { damping: 50 });

        setTimeout(() => {
            containerAudioAnimation.value = withTiming(1.8, { duration: 300 });
        }, 0);
    };



    const onStopRecord = async () => {
        if (!isPressing) {
            return
        }
        const result = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener()
        setIsRecording(false)

        const data = new FormData()
        data.append('file', {
            uri: result,
            name: 'audio.m4a',
            type: 'audio/x-m4a',
        })

        data.append('configAudMetrics', metric)
        data.append('configAudTime', timer)

        sendAudio(data, JSON.stringify(metric), timer, props.chatRoomId)
        setMetric([])
        timer = 0
        stopRecordingTimer()
        setShowCronometro(false)
        containerAudioAnimation.value = 1
        containerBackgroundColorAnimation.value = 'blue'
        containerAudioAnimation.value = withSpring(1, { damping: 2 })

        setTimeout(() => {
            containerAudioAnimation.value = withTiming(1 + vibrationStrength, { duration: 200 });
            setTimeout(() => {
                containerAudioAnimation.value = withTiming(1, { duration: 200 });
            }, 40);
        }, 0);

    }


    const startRecordingTimer = () => {

        timerId = setInterval(() => {
            setRecordingTimer((prevTimer) => prevTimer + 1);
            setCronometroSegundos((prevSegundos) => prevSegundos + 1);
        }, 1000);
    };

    const stopRecordingTimer = () => {
        clearInterval(timerId);
        setRecordingTimer(0);
        setCronometroSegundos(0);
    }

    const formatarTempo = (segundos: number) => {
        const minutos = Math.floor(segundos / 60);
        const segundosRestantes = segundos % 60;
        const formatoMinutos = minutos < 10 ? `0${minutos}` : minutos;
        const formatoSegundos = segundosRestantes < 10 ? `0${segundosRestantes.toFixed(0)}` : segundosRestantes.toFixed(0);
        return `${formatoMinutos}:${formatoSegundos}`;
    };

    const [value, setValue] = useState("")

    const handleKeyPress = (event: { nativeEvent: { key: string; repeat: any } }) => {
        if (event.nativeEvent.key === ' ' && event.nativeEvent.repeat) {
            props.onSend(value + '.');
            setValue('');
        }
    };

    return (
        <InputCommentContainer paddingBottom={props.paddingBottom}>
            <Input>
                {showCronometro ?
                    <ConatinerAudioTime>
                        <Icon name="microphone" color={theme.dangerColor} size={20} />
                        <TextTime>
                            {formatarTempo(timer)}
                        </TextTime>
                        <SoundBar metricsTime={metric} />
                    </ConatinerAudioTime>
                    :
                    <InputText
                        ref={inputRef}
                        autoCorrect
                        placeholder={props.placeholder}
                        autofocus={true}
                        scrollEnable={true}
                        value={value}
                        onSubmitEditing={() => {
                            props.onSend(value)
                            setValue("")
                        }}
                        onKeyPress={handleKeyPress}
                        returnKeyType="send"
                        onChangeText={(text: string) => { props.setValue && props.setValue(text); setValue(text) }}
                        placeholderTextColor="#5e5e5e"
                    />
                }
                {props.options &&
                    <>
                        <TouchableOpacity onPress={props.onOpenCamera}>
                            <CameraIcon source={require('../../Assets/Icons/cameraGrey.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={props.onOpenGalery}>
                            <ClipIcon source={require('../../Assets/Icons/clip.png')} />
                        </TouchableOpacity>
                    </>}
            </Input>

            {!props.notAudio ?
                <>
                    {value ? (
                        <CircleButton onPress={() => {
                            if (value) {
                                props.onSend(value)
                                setValue("")
                            }
                        }}>
                            <BlueButtonImage source={require("../../Assets/Icons/sendWhite.png")} />
                        </CircleButton>
                    ) : (
                        <TouchableOpacity
                            onLongPress={onStartRecord}
                            onPressOut={() => {
                                setIsPressing(false)
                                if (isPressing) {
                                    onStopRecord()
                                }
                            }}
                            onPressIn={() => setIsPressing(true)}>
                            <Animated.View style={[stylesBt.Animation, containerStyle]}>
                                <BlueButtonImage source={require("../../Assets/Icons/microphoneWhite.png")} />
                            </Animated.View>
                        </TouchableOpacity>
                    )}
                </>
                :
                <CircleButton onPress={() => {
                    if (value) {
                        props.onSend(value)
                        setValue("")
                    }
                }}>
                    <BlueButtonImage source={require("../../Assets/Icons/sendWhite.png")} />
                </CircleButton>
            }


        </InputCommentContainer>
    )
}

const SoundBar = ({ metricsTime = [] }: { metricsTime: number[] }) => {

    return (
        <View style={styles.container}>
            <Bar metricsTime={metricsTime} index={metricsTime.length - 1} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 2} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 3} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 4} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 5} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 6} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 7} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 8} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 9} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 10} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 11} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 12} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 13} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 14} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 15} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 16} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 17} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 18} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 19} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 20} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 21} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 22} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 23} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 24} />
        </View>
    )
}

const Bar = ({ index, metricsTime }: { index: number, metricsTime: number[] }) => {

    const valor = metricsTime[index] || -30



    const volumeConv = (valor * -1) > 30 ? 30 : (valor * -1) < 0 ? 0 : (valor * -1)

    const mapValue = (value: number) => {
        return ((value - 0) * (1 - 0)) / (30 - 0) + 0;
    };

    const targetHeight = mapValue((30 - volumeConv) + 1);

    const barHeight = useSharedValue(0)

    useEffect(() => {
        barHeight.value = targetHeight
    }, [metricsTime])

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scaleY: barHeight.value }],
        }
    })

    return (
        <Animated.View
            style={[styles.bar, animatedStyle]}
        />
    )
}

const stylesBt = StyleSheet.create({
    Animation: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'blue',
    },

})

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    bar: {
        width: 5,
        backgroundColor: theme.primarycolor,
        marginHorizontal: 2,
        height: 30,
        borderRadius: 45
    },
})