import { useRef } from 'react'
import { Dimensions } from 'react-native'
import { StyleSheet, TouchableOpacity } from 'react-native'

import Video, { VideoProperties } from 'react-native-video'

interface SearchCardProps {
  source: { uri: string }
  onPress: () => void
}

const dimension = Dimensions.get('screen').width

export function ExploreCardDrops(props: SearchCardProps) {

  const videoRef = useRef<VideoProperties>(null)


  return (
    <TouchableOpacity style={styles.VideoStyle}
      onPress={props.onPress}>
      <Video
        ref={videoRef}
        resizeMode='cover'
        paused
        source={props.source}
        style={{
          width: '100%',
          height: '100%',
          borderColor: '#fff',
          backgroundColor: '#00000011'
        }}
      />
    </TouchableOpacity>

  )
}

const styles = StyleSheet.create({

  VideoStyle: {
    borderWidth: 1,
    borderColor: '#fff',
    width: dimension > 394 ? 141 : 131,
    height: 260,
  }
})