import React from 'react';
import { Dimensions, Image, TouchableOpacity } from 'react-native';

import { TitleCard } from './style';

interface ItemsGroupCardsProps {
  title: string;
  mediaUrl: string;
  navigation: () => void;
  handlePress?: any
}

export default function ItensGroupCard(props: ItemsGroupCardsProps) {
  const { width } = Dimensions.get('screen')
  const sizeWidth = width * 0.40

  return (
    <TouchableOpacity style={{ width: sizeWidth, height: sizeWidth, marginBottom: 30, alignItems: 'center' }} onPress={props.navigation} onLongPress={props.handlePress}>
      <Image style={{ width: '90%', height: '90%', borderRadius: 15 }} resizeMode='cover' source={{ uri: props.mediaUrl }} />
      <TitleCard>{props.title}</TitleCard>
    </TouchableOpacity>
  );
}

