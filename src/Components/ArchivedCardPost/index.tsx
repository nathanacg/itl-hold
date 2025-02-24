import React, { useEffect, useRef } from 'react';
import { Image, StyleSheet, TouchableOpacity, Animated, View, Dimensions } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { theme } from '../../Theme/theme';

const dimension = Dimensions.get('screen').width

interface ArquivedCard {
  source?: { uri: string } | any;
  onPress?: () => void;
  styleType: 'single' | 'double' | 'triple';
  onLongPress?: () => void;
  isPost?: any;
  options?: boolean
}

const ArquivedCardPost = (props: ArquivedCard) => {
  const lazyAnim = useRef(new Animated.Value(0)).current;
  const lazyLoad = () => {
    Animated.timing(lazyAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      <TouchableOpacity
        style={{
          width: dimension > 394 ? 142 : 132,
          height: dimension > 394 ? 142 : 132,

        }} onPress={props.onPress} onLongPress={props.onLongPress}>
        <View style={[styles.ImageStyle, { backgroundColor: '#d3d3d3' }]} />
        {props.options && (
          <>

            <Feather
              name='check-circle'
              color={'#fff'}
              size={16}
              style={{ position: 'absolute', zIndex: 100, right: 5, top: 12 }}
            />


          </>
        )}
        <Animated.Image style={[styles.ImageStyle, { position: 'absolute', opacity: lazyAnim }]} source={{ uri: props.source.uri }} onLoad={lazyLoad} />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  ImageStyle: {
    borderWidth: 1,
    borderColor: '#5f5fe811',
    margin: 1,
    width: dimension > 394 ? 142 : 131,
    height: dimension > 394 ? 142 : 131,
  },
});

export default ArquivedCardPost;
