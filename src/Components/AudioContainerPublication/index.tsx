import { useState } from "react";
import { View } from "react-native"

import { AudioTime, AudioWaves, Container } from "./styles"
import Icon from 'react-native-vector-icons/FontAwesome5'
import { theme } from '../../Theme/theme'
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

interface AudioContainerProps {
  width?: string
  path?: string
  recordingTime: number;
  configAudMetrics: string;
}
const audioRecorderPlayer = new AudioRecorderPlayer();

export default function AudioContainerPublication(props: AudioContainerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlaying = async () => {
    try {
      if (!isPlaying) {
        const path = props.path;
        await audioRecorderPlayer.startPlayer(path);
        audioRecorderPlayer.addPlayBackListener((e) => {
          if (e.currentPosition === e.duration) {
            setIsPlaying(false);
            audioRecorderPlayer.stopPlayer();
          }
        });
        setIsPlaying(true);
      } else {
        await audioRecorderPlayer.stopPlayer();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Erro ao reproduzir áudio', error);
    }
  };

  function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  }


  return (
    <Container width={props.width}>
      <View style={{
        width: 30,
        height: 30,
        backgroundColor: '#ededed',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50
      }}>
        <Icon
          onPress={togglePlaying}
          name={isPlaying ? 'pause' : 'play'}
          size={15}
          color={theme.primarycolor}
          style={{
            paddingLeft: isPlaying ? 1 : 3,
          }}
        />
      </View>
      <View style={{ width: '60%', height: 2, backgroundColor: 'blue' }} ></View>
      <AudioTime>
        {formatTime(props.recordingTime)}
      </AudioTime>
    </Container>
  )
}
