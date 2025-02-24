import React, { useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';
import { Data, Folder } from '../../Types/savedItems';

interface ItemsGroupCardsProps {
  title: string;
  imageUrl: string
  navigation: () => void;
  folderData: string
}

export default function PostersBottom(props: ItemsGroupCardsProps) {
  const navigation = useNavigation<StackRoutes>()

  useEffect(() => {
    console.log(props.folderData, ' folderData')
  }, [props.folderData])

  return (
    <>
      <TouchableOpacity style={{ marginRight: 3, marginLeft: 3, marginBottom: '1%', alignItems: 'center' }} onPress={props.navigation}>
        <Image style={{ width: 80, height: 80, borderRadius: 15 }} source={{ uri: props.imageUrl }} />
        <Text>{props.title}</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  photo: {
    height: 85,
    width: 85,
  },
});
