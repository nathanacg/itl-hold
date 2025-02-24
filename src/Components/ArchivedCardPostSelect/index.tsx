import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

interface ArquivedCard {
  source: { uri: string };
  onPress: () => void;
  styleType: 'single' | 'double' | 'triple';
  onLongPress?: any;
  isPost?: any;
}

const ArquivedCardPostSelect = (props: ArquivedCard) => {
  const [stateSelect, setStateSelect] = useState(false)

  const pressFunction = () => {
    props.onPress()
    setStateSelect(!stateSelect)
  }

  return (
    <>
      {stateSelect == true ? (
        <>
          <TouchableOpacity
            style={{
              width: '33.1%',
              height: props.isPost ? 142 : 242,
              marginRight: 2,
              marginBottom: 2
            }} onPress={pressFunction} onLongPress={props.onLongPress}>
            <Feather
              name='check-circle'
              size={20}
              color={'white'}
              style={{ zIndex: 4, position: 'absolute', left: 98, top: 10 }}
            />
            <Image style={styles.ImageStyle} source={{ uri: props.source.uri }} />
          </TouchableOpacity>

        </>
      ) : (
        <>
          <TouchableOpacity
            style={{
              width: '33.1%',
              height: props.isPost ? 142 : 242,
              marginRight: 2,
              marginBottom: 2
            }} onPress={pressFunction} onLongPress={props.onLongPress}>
            <Feather
              name='circle'
              size={20}
              color={'white'}
              style={{ zIndex: 4, position: 'absolute', left: 98, top: 10 }}
            />
            <Image style={styles.ImageStyle} source={{ uri: props.source.uri }} />
          </TouchableOpacity>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  ImageStyle: {
    width: '100%',
    height: '100%',
    backgroundColor: '#0001'
  },
});

export default ArquivedCardPostSelect;
