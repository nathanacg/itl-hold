import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Video from 'react-native-video';

interface ArquivedCard {
  source: string;
  onPress: () => void;
  styleType?: 'single' | 'double' | 'triple';
  onLongPress?: any;
}

const ArquivedCardDropsSelect = (props: ArquivedCard) => {

  const [stateSelect, setStateSelect] = useState(false)

  const pressFunction = () => {
    props.onPress()
    setStateSelect(!stateSelect)
  }

  return (
    <>
      {stateSelect == true ? (
        <>
          <TouchableOpacity style={{
            width: `33.1%`,
            height: 242,
            marginRight: 2,
            marginBottom: 2
          }} onPress={pressFunction} onLongPress={props.onLongPress}>
            <Feather
              name='check-circle'
              size={20}
              color={'white'}
              style={{ zIndex: 4, position: 'absolute', left: 98, top: 10 }}
            />
            <Video
              paused={true}
              resizeMode='contain'
              repeat={true}
              source={{ uri: props.source }}
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#0001'
              }}
            />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity style={{
            width: `33.1%`,
            height: 242,
            marginRight: 2,
            marginBottom: 2
          }} onPress={pressFunction} onLongPress={props.onLongPress}>
            <Feather
              name='circle'
              size={20}
              color={'white'}
              style={{ zIndex: 4, position: 'absolute', left: 98, top: 10 }}
            />
            <Video
              paused={true}
              resizeMode='contain'
              repeat={true}
              source={{ uri: props.source }}
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#0001'
              }}
            />
          </TouchableOpacity>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  touchableOpacity: {
    marginRight: 1.1,
    marginBottom: 2,
  },
  ImageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
});

export default ArquivedCardDropsSelect;
