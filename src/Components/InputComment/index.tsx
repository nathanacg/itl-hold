import { useEffect, useRef, useState } from "react";
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
} from "./style";
import { Button, Keyboard, StyleSheet, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackRoutes } from "../../Routes/StackTypes";
import AudioRecorderPlayer, { AVEncoderAudioQualityIOSType, AVEncodingOption, AVModeIOSOption, AudioEncoderAndroidType, AudioSourceAndroidType, RecordBackType } from 'react-native-audio-recorder-player';
import AudioContainer from "../AudioContainer";
import RNFS from 'react-native-fs';
import { useSocket } from "../../context/socket";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withRepeat,
    withTiming,
    Easing,
    runOnUI
} from 'react-native-reanimated';
import VoiceGravationModal from '../VoiceGravationModal';
import { theme } from "../../Theme/theme";
import { Text } from "react-native";
import Icon from "react-native-vector-icons/Foundation";
import { Profile } from "../../Pages/Feed/components/ComentsList";




const audioRecorderPlayer = new AudioRecorderPlayer();
// const initialOffset = 200;


interface InputcommentProps {
    placeholder: string
    setValue?: (text: string) => void
    onSend: (text: string) => void
    onPress?: () => void
    onOpenGalery?: () => void
    paddingBottom?: string
    marcations?: Profile[]
}

let metrics = [0]
let timer = 0
let timerId: NodeJS.Timeout

export default function Inputcomment(props: InputcommentProps) {

    const navigation = useNavigation<StackRoutes>()
    const inputRef = useRef<TextInput>(null)
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [audioPath, setAudioPath] = useState<string | undefined>(undefined);
    const [isPlaying, setIsPlaying] = useState(false);
    const [onPress, setOnPress] = useState(false);
    const [recordingTimer, setRecordingTimer] = useState<number>(0);
    const [cronometroSegundos, setCronometroSegundos] = useState(0);
    const path = `${RNFS.DocumentDirectoryPath}/audio.mp3`
    const [showCronometro, setShowCronometro] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [metric, setMetric] = useState<number[]>([]);

    const microphoneOpacity = useSharedValue(1);
    const containerAudioAnimation = useSharedValue(1);
    const containerBackgroundColorAnimation = useSharedValue('blue');

    const containerStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { scaleX: containerAudioAnimation.value },
                { scaleY: containerAudioAnimation.value },

            ],
            backgroundColor: containerBackgroundColorAnimation.value,
        };
    })
    const vibrationStrength = 5;


    const { sendAudio } = useSocket()


    const onStartRecord = async () => {
        await audioRecorderPlayer.stopPlayer();
        await audioRecorderPlayer.stopRecorder();
        const result = await audioRecorderPlayer.startRecorder(undefined, {
            AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
            AudioSourceAndroid: AudioSourceAndroidType.MIC,
            AVModeIOS: AVModeIOSOption.spokenaudio,
            AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.max,
            AVNumberOfChannelsKeyIOS: 2,
            AVFormatIDKeyIOS: AVEncodingOption.aac,
        }, true);

        audioRecorderPlayer.addRecordBackListener((e: RecordBackType) => {
            metrics.push(e.currentMetering || 0)
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
        containerBackgroundColorAnimation.value = 'red';
        containerAudioAnimation.value = withSpring(1.5, { damping: 50 });

        setTimeout(() => {
            containerAudioAnimation.value = withTiming(1.8, { duration: 300 });
        }, 0);
    };

    const onStopRecord = async () => {
        const result = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener()
        setIsRecording(false);

        const data = new FormData();
        data.append('file', {
            uri: result,
            name: 'audio.m4a', // Nome que você deseja para o arquivo
            type: 'audio/x-m4a', // Tipo MIME do áudio
        });

        data.append('configAudMetrics', metric);
        data.append('configAudTime', timer);

        sendAudio(data, JSON.stringify(metric), timer)

        setMetric([])
        timer = 0
        stopRecordingTimer();
        setShowCronometro(false);
        containerAudioAnimation.value = 1;
        containerBackgroundColorAnimation.value = 'blue';
        containerAudioAnimation.value = withSpring(1, { damping: 2 });

        setTimeout(() => {
            containerAudioAnimation.value = withTiming(1 + vibrationStrength, { duration: 200 });
            setTimeout(() => {
                containerAudioAnimation.value = withTiming(1, { duration: 200 });
            }, 40);
        }, 0);

    };



    const startRecordingTimer = () => {

        timerId = setInterval(() => {
            setRecordingTimer((prevTimer) => prevTimer + 1);
            setCronometroSegundos((prevSegundos) => prevSegundos + 1); // Atualiza o cronômetro aqui
        }, 1000);
    };

    const stopRecordingTimer = () => {
        clearInterval(timerId);
        setRecordingTimer(0);
        setCronometroSegundos(0); // Atualiza o cronômetro aqui
    };

    const onStartPlay = async () => {
        const path = "file:///data/user/0/com.intellectus/files/audio.mp3";
        await audioRecorderPlayer.stopPlayer();

        const result = await audioRecorderPlayer.startPlayer(audioPath);
        setIsPlaying(true);
    };

    const onStopPlay = async () => {
        await audioRecorderPlayer.stopPlayer();
        setIsPlaying(false);
    };

    const resetCronometro = () => {
        setCronometroSegundos(0);
    };


    const atualizarCronometro = () => {
        setCronometroSegundos(prevSegundos => prevSegundos + 1);
    };

    const formatarTempo = (segundos: any) => {
        const minutos = Math.floor(segundos / 60);
        const segundosRestantes = segundos % 60;
        const formatoMinutos = minutos < 10 ? `0${minutos}` : minutos;
        const formatoSegundos = segundosRestantes < 10 ? `0${segundosRestantes.toFixed(0)}` : segundosRestantes.toFixed(0);
        return `${formatoMinutos}:${formatoSegundos}`;
    };

    const [value, setValue] = useState("")


    useEffect(() => {



        let arrayText = value.split(' ')

        let arroba = arrayText.filter(text => text.includes('@'))

        if (arroba.length > 0 && props.marcations && props.marcations.length > 0) {

            setValue(pv => {
                if (props.marcations) {
                    const index = props.marcations.length - 1
                    return pv.replace(arroba[index], `@${props.marcations[index].userNickname}`)
                } else {
                    return pv
                }
            })
        }


    }, [props.marcations])

    return (
        <InputCommentContainer paddingBottom={props.paddingBottom}>

            {/* <VoiceGravationModal isVisible={showCronometro} recordingTime={recordingTimer} /> */}

            <Input>
                {/*  {showCronometro ?
                    <ConatinerAudioTime>
                        <Icon name="microphone" color={theme.dangerColor} size={20} />
                        <TextTime>
                            {formatarTempo(timer)}
                        </TextTime>
                        <SoundBar metricsTime={metric} />
                    </ConatinerAudioTime>
                    : */}
                <InputText
                    ref={inputRef}
                    placeholder={props.placeholder}
                    multiline={true}
                    scrollEnable={true}
                    value={value}
                    onChangeText={(text: string) => { props.setValue && props.setValue(text); setValue(text) }}
                    placeholderTextColor="#5e5e5e"
                />
                {/*  } */}
            </Input>
            {/*  {value ? ( */}
            <CircleButton onPress={() => {
                props.onSend(value)
                setValue("")
            }}>
                <BlueButtonImage source={require("../../Assets/Icons/sendWhite.png")} />
            </CircleButton>
            {/*       ) : (
                <TouchableOpacity
                    onLongPress={onStartRecord}
                    onPressOut={onStopRecord}>
                    <Animated.View style={[stylesBt.Animation, containerStyle]}>
                        <BlueButtonImage source={require("../../Assets/Icons/microphoneWhite.png")} />
                    </Animated.View>
                </TouchableOpacity>
            )}
 */}
        </InputCommentContainer>
    )
}

const SoundBar = ({ metricsTime = [] }: { metricsTime: number[] }) => {

    return (
        <View style={styles.container}>
            <Bar metricsTime={metricsTime} index={metricsTime.length - 24} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 23} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 22} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 21} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 20} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 19} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 18} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 17} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 16} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 15} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 14} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 13} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 12} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 11} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 10} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 9} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 8} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 7} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 6} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 5} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 4} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 3} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 2} />
            <Bar metricsTime={metricsTime} index={metricsTime.length - 1} />
        </View>
    );
};

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
        /*  barHeight.value = withTiming(targetHeight, {
             duration: 500,
         }) */
    }, [metricsTime])

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scaleY: barHeight.value }],
        };
    },);

    return (
        <Animated.View
            style={[styles.bar, animatedStyle]}
        />
    )
}

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
});



{/* {!value ? (
                    <>
                        <TouchableOpacity onPress={() => navigation.navigate("Camera", { nextGaleryRouteName: '', routeParams: {} })}>
                            <CameraIcon source={require('../../Assets/Icons/cameraGrey.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={props.onOpenGalery}>
                            <ClipIcon source={require('../../Assets/Icons/clip.png')} />
                        </TouchableOpacity>
                    </>
                ) : ''} */}

{/* <CircleButton onPress={() => {
                if (value) {
                    props.onSend(value)
                    setValue("")
                }

            }}>
                <BlueButtonImage source={require("../../Assets/Icons/sendWhite.png")} />
            </CircleButton> */}

{/* {value ? (
                <CircleButton onPress={() => {
                    if (value) {
                        props.onSend(value)
                        setValue("")
                    }
                }}>
                </CircleButton>
            ) : (
                <CircleButton onLongPress={handleLongPress} onPressOut={handlePressOut}>
                    {isRecording ? (
                        <BlueButtonImage source={require("../../Assets/Icons/icon-check.png")} />
                    ) : (
                        isPlaying ? (
                            <BlueButtonImage source={require("../../Assets/Icons/assistance.png")} />
                        ) : (
                            <BlueButtonImage source={require("../../Assets/Icons/microphoneWhite.png")} />
                        )
                    )}
                </CircleButton>
            )} */}