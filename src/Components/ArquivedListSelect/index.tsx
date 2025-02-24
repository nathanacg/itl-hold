import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Video, { VideoProperties } from 'react-native-video';
import { fontStyle, theme } from '../../Theme/theme';
import { IconViewSelect, IconViewSelectText, PostLegend } from './style';

interface ArquivedCard {
  source: { uri: string };
  onPress: () => void;
  isPost?: any;
  valueId: boolean
  colorPost: string | undefined
  postLegend: string | undefined
  marcados: number
  index: number
}

export default function ArquivedListSelect(props: ArquivedCard) {
  const screenWidth = Dimensions.get('window').width;
  // const isAudio = props.source.uri.split(".")[4]
  const isAudio = props.source.uri ? props.source.uri.split(".")[4] : null;

  const videoRef = useRef<VideoProperties>();
  const pressFunction = () => {
    props.onPress()
  }

  const onLoad = ({ duration }) => {
    videoRef.current?.seek(0)
  }

  return (
    <TouchableOpacity
      style={{
        width: screenWidth * 0.333,
        height: props.isPost ? 160 : 231,
        marginRight: 2,
        marginBottom: 2,
        backgroundColor: props.colorPost != null ? `${props.colorPost.split("&")[0]}` : '#0003',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={pressFunction}
    >
      <>
        {props.colorPost != null ? (
          <View>
            <PostLegend numberOfLines={3} style={{ color: props.colorPost.split("&")[1] }}>
              {props.postLegend}
            </PostLegend>
          </View>
        ) : (
          <>
            {isAudio == 'mp4' ?
              <>
                <Video
                  ref={videoRef}
                  source={{ uri: props.source.uri }}
                  style={{ width: '100%', height: '100%' }}
                  paused
                  onLoad={onLoad}
                />
                <Entypo
                  name='controller-play'
                  size={20}
                  style={{ position: 'absolute', zIndex: 4, top: '88%', left: '75%' }}
                  color={'white'}
                />
              </>
              :
              <Image style={{ width: '100%', height: '100%' }}
                source={{ uri: props.source.uri }} />
            }
          </>
        )}

        {props.marcados > 0 ? (
          <>
            <IconViewSelect>
              <Text style={{ fontSize: 14, color: theme.primarycolor }}>
                {props.marcados}
              </Text>
            </IconViewSelect>
          </>
        ) :
          <>
            <Feather
              name={'circle'}
              size={24}
              color={'white'}
              style={{ zIndex: 4, position: 'absolute', left: '78%', top: '3%' }}
            />
          </>}
      </>
    </TouchableOpacity >
  );
};