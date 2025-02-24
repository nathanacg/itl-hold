
import Icon from 'react-native-vector-icons/FontAwesome5'
import { theme } from "../../../../../Theme/theme"
import { Image, View } from "react-native"
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { useEffect, useState } from "react";
import SoundBar from "../SoundBar";
import { AudioTime, Container } from './style';

interface AudioContainerProps {
  path: string
  recordingTime?: number | string
  configAudMetrics: number[]
  feed?: boolean
  publication?: boolean
  preview?: boolean
  repost?: boolean
}
const audioRecorderPlayer = new AudioRecorderPlayer();
const audioLength = new AudioRecorderPlayer();


let timerId: NodeJS.Timer

export default function AudioContainer(props: AudioContainerProps) {

  const [isPlaying, setIsPlaying] = useState(false)
  const [timeLength, setTimeLength] = useState(0)
  const [timeLimit, setTimeLimit] = useState(0)
  const [currentTimer, setCurrentTimer] = useState(0)

  const [time, setTime] = useState<boolean>(true)


  useEffect(() => {
    if (isPlaying) {
      timerId = setInterval(() => setCurrentTimer(pv => pv + 1000), 1000)
    }
    else {
      clearInterval(timerId)
    }

    return () => {
      clearInterval(timerId)
    }
  }, [isPlaying])




  const togglePlaying = async () => {
    try {
      if (!isPlaying) {

        const path = props.path;
        await audioRecorderPlayer.startPlayer(path);
        audioRecorderPlayer.addPlayBackListener((e) => {
          const position = posicaoNoArrayRedimensionado(Math.floor(e.currentPosition / 1000), Math.floor(e.duration / 1000), 40)
          setTimeLength(position)
          setTimeLimit(e.duration)
          if (e.currentPosition === e.duration) {
            setIsPlaying(false);
            audioRecorderPlayer.stopPlayer();
            audioRecorderPlayer.removePlayBackListener()
            audioRecorderPlayer.mmss
          }
        })

        setTime(false)
        setIsPlaying(true)

      } else {

        await audioRecorderPlayer.stopPlayer()
        await audioRecorderPlayer.removePlayBackListener()
        setCurrentTimer(0)
        setIsPlaying(false)

      }
    } catch (error) {
      console.error('Erro ao reproduzir áudio', error);
    }
  };

  function posicaoNoArrayRedimensionado(tempoAtual: number, duracaoTotal: number, tamanhoArrayRedimensionado: number) {
    const proporcaoTempo = (tempoAtual < 0 ? 0 : tempoAtual) / duracaoTotal;
    const indiceArray = Math.floor(proporcaoTempo * (tamanhoArrayRedimensionado - 1));
    return indiceArray
  }

  useEffect(() => {
    if (isPlaying && currentTimer >= timeLimit) {
      togglePlaying()
    }
  }, [currentTimer])

  return (
    <>
      <Container>
        <View style={{
          width: 30,
          height: 30,
          backgroundColor: '#00000005',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 30
        }}>
          <Icon
            onPress={togglePlaying}
            name={isPlaying ? 'pause' : 'play'}
            size={12}
            color={theme.textligthGray}

          />
        </View>
        <SoundBar metricsTime={props.configAudMetrics} countBar={56} position={timeLimit} play={isPlaying} />
      </Container>

      <AudioTime>
        {audioLength.mmss(isPlaying ? Math.floor(currentTimer / 1000) : Math.floor(timeLimit / 1000))}
      </AudioTime>


    </>
  )
}
