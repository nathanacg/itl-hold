import React, { useRef } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import Video, { VideoProperties } from 'react-native-video';

interface ArquivedCard {
  source: string;
  onPress?: () => void;
  styleType?: 'single' | 'double' | 'triple';
  onLongPress?: any;
}

const ArquivedCardDrops = (props: ArquivedCard) => {

  const videoRef = useRef<VideoProperties>();
  const haveJPG = props.source && props.source.toLowerCase().endsWith('.jpg');
  const haveJPEG = props.source && props.source.toLowerCase().endsWith('.jpeg');

  const onLoad = ({ duration }) => {
    videoRef.current?.seek(0)
  }

  return (
    <>
      {props.source && (
        <>
          <TouchableOpacity
            style={{
              width: `33.1%`,
              height: 131,
              marginRight: 2,
              marginBottom: 2
            }}
            onPress={props.onPress} onLongPress={props.onLongPress}
          >
            {haveJPG ? (
              <Image
                source={{ uri: props.source }}
                style={{
                  width: '100%',
                  height: '100%'
                }}
              />
            ) : haveJPEG ? (
              <Image
                source={{ uri: props.source }}
                style={{
                  width: '100%',
                  height: '100%'
                }}
              />
            ) : (
              <Video
                paused={false}
                ref={videoRef}
                resizeMode={'contain'}
                repeat={true}
                source={{ uri: props.source }}
                onLoad={onLoad}
                style={{
                  width: '100%',
                  height: '100%'
                }}
              />
            )}
          </TouchableOpacity>
        </>
      )}
    </>
  );
};

export default ArquivedCardDrops;
