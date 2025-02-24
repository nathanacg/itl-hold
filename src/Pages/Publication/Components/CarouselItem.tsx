import React from 'react';
import { runOnJS, useDerivedValue } from 'react-native-reanimated';
import { View, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';

interface CarouselItemProps {
  item: {
    url: string;
    type?: string;
  };
  index: number;
  currentItemIndex: Animated.SharedValue<number>;
  onRemove: () => void;
}

export default function CarouselItem({ item, index, currentItemIndex, onRemove }: CarouselItemProps) {
  return (
    <View style={{ flex: 1, marginHorizontal: 2.5 }}>
      {item.type === 'image' ? (
        <Image
          source={{ uri: item.url }}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 8,
          }}
          resizeMode="cover"
        />
      ) : (
        <Video
          source={{ uri: item.url }}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 8,
          }}
          resizeMode="cover"
          muted={true}
          controls
        />
      )}
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          backgroundColor: 'rgba(0,0,0,0.5)',
          borderRadius: 15,
          padding: 5,
        }}
        onPress={onRemove}>
        <Ionicons name="close" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
