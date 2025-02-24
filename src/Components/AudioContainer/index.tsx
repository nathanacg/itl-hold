
import { AudioTime, AudioWaves, Container, SubContainer } from "./style"
import Icon from 'react-native-vector-icons/FontAwesome5'
import { theme } from '../../Theme/theme'
import { Image, View } from "react-native"
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { useEffect, useState } from "react";
import SoundBar from "../SoundBar";

interface AudioContainerProps {
  width?: string
  path: string
  post: boolean
  recordingTime: number;
  configAudMetrics: string;
}
const audioRecorderPlayer = new AudioRecorderPlayer();
const audioLength = new AudioRecorderPlayer();


let timerId: NodeJS.Timer

export default function AudioContainer(props: AudioContainerProps) {

  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLength, setTimeLength] = useState(0);
  const [timeLimit, setTimeLimit] = useState(0)
  const [currentTimer, setCurrentTimer] = useState(0);

  const getMetrics = () => {
    try {

      const mtc = JSON.parse(props.configAudMetrics.includes("[") ? props.configAudMetrics : `[${props.configAudMetrics}]` || "[]")
      return redimensionarArray(mtc, 40)
    } catch (error) {
      return []
    }
  }
  const [metrics, setMetrics] = useState(getMetrics());

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
        const path = props.path
        await audioRecorderPlayer.startPlayer(path)
        audioRecorderPlayer.addPlayBackListener((e) => {
          const position = posicaoNoArrayRedimensionado(Math.floor(e.currentPosition / 1000), Math.floor(e.duration / 1000), 40)
          setTimeLength(position)
          setTimeLimit(e.duration)
          if (e.currentPosition === e.duration) {
            setIsPlaying(false)
            audioRecorderPlayer.stopPlayer()
            audioRecorderPlayer.removePlayBackListener()
            audioRecorderPlayer.mmss
          }
        });
        setIsPlaying(true);
      } else {
        await audioRecorderPlayer.stopPlayer();
        await audioRecorderPlayer.removePlayBackListener()
        setCurrentTimer(0)
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Erro ao reproduzir áudio', error);
    }
  };

  function redimensionarArray(array: number[], novoTamanho: number) {
    const tamanhoOriginal = array.length;
    const fatorRedimensionamento = novoTamanho / tamanhoOriginal;
    const arrayRedimensionado = Array.from({ length: novoTamanho }, (_, index) => {
      const indiceOriginal = Math.floor(index / fatorRedimensionamento);
      return array[indiceOriginal];
    });
    return arrayRedimensionado;

  }

  function posicaoNoArrayRedimensionado(tempoAtual: number, duracaoTotal: number, tamanhoArrayRedimensionado: number) {
    const proporcaoTempo = (tempoAtual < 0 ? 0 : tempoAtual) / duracaoTotal;
    const indiceArray = Math.floor(proporcaoTempo * (tamanhoArrayRedimensionado - 1));
    return indiceArray;
  }

  useEffect(() => {
    if (isPlaying && currentTimer >= timeLimit) {
      togglePlaying()
    }
  }, [currentTimer])

  return (
    <Container>
      <SubContainer>
        <View style={{
          width: 30,
          height: 30,
          backgroundColor: '#ededed',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 50,
        }}>
          <Icon
            onPress={togglePlaying}
            name={isPlaying ? 'pause' : 'play'}
            size={15}
            color={theme.textligthGray}
            style={{
              paddingLeft: isPlaying ? 1 : 3,
            }}
          />
        </View>
        <SoundBar metricsTime={metrics} countBar={props.post ? 41 : 45} position={timeLimit} play={isPlaying} />
      </SubContainer>
      <AudioTime>
        {audioLength.mmss(isPlaying ? Math.floor(currentTimer / 1000) : Math.floor(timeLimit / 1000))}
      </AudioTime>
    </Container>
  )
}
