import React, { useEffect, useRef } from 'react';
import { Image, StyleSheet, TouchableOpacity, Animated, View, Dimensions, Text } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const dimension = Dimensions.get('screen').width

interface ArquivedCard {
  legend: string
  backgroundColor: string
  fontColor: string
  onPress?: () => void;
  styleType: 'single' | 'double' | 'triple';
  onLongPress?: () => void;
  isPost?: any;
  options?: boolean
}

const ArquivedCardPostColor = (props: ArquivedCard) => {


  return (
    <>
      <TouchableOpacity
        style={[styles.ImageStyle, { backgroundColor: props.backgroundColor }]}
        onPress={props.onPress} onLongPress={props.onLongPress}>
        {props.options && (
          <Entypo
            name='dots-three-vertical'
            color={'#fff'}
            size={16}
            style={{ position: 'absolute', zIndex: 100, right: 5, top: 12 }}
          />
        )}
        <Text
          numberOfLines={3}
          style={{
            fontSize: 10,
            fontWeight: '400',
            textAlign: 'center',
            color: props.fontColor
          }}
        >{props.legend}</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  ImageStyle: {
    width: dimension > 394 ? 142 : 131,
    height: dimension > 394 ? 142 : 131,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#5f5fe811'
  },
});

export default ArquivedCardPostColor;
