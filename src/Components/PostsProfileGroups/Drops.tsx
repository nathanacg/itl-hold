import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons"

import { DropOptionsButton, OptionTitle } from './style';
import { deleteDrop, getDrop, getDropNav, getDropsList } from '../../Service/Drop';
import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';
import useDropsStore from '../../GlobalState/drops.zustand';
import { View } from 'react-native';
import BottomModal from '../BottomModal';
import Video, { VideoProperties } from 'react-native-video';
import { AddText, TextNotPublicationsArchiveds } from '../AlbumCard/style';
import { DropList } from '../../Types/drop.type';
import { theme } from '../../Theme/theme';

interface DropProps {
  userId: number;
}

export interface reels {
  userId: number
  likesCount: number
  viewsCount: number
  idreels: number,
  /*  docMedia: {
   url: string
     fileName: string;
     usage_media: string;
     position: {
         x: number;
         y: number;
     };
     scale: number;
   } */
  profileImage: string,
  username: string,
  userNickname: string
  postHexId: string,
  commentsCount: number,
  Iliked: number
  isSaved: boolean
  usersLiked: string
  thumbnail: {
    url: string
    scale?: number
    fileName?: string
    position?: {
      x: number
      y: number
    },
    usage_media?: string
  },
  principalMedia: {
    url: string
    scale?: number
    fileName?: string
    position?: {
      x: number
      y: number
    },
    usage_media?: string
  },
}

export default function Drops(props: DropProps) {
  const { setDropsList } = useDropsStore()
  const [profileDrops, setProfileDrops] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchDrop = () => {
    setIsLoading(true)
    getDropsList(props.userId).then((res) => {
      setProfileDrops(res.data)
      setDropsList(res.data)
    }).catch((e) => {
      console.warn('GetDropsList - PostsProfileGroupsMyProfile')
      console.log(e)
    }).finally(() => {
      setIsLoading(false)
    })
  }
  useEffect(() => {
    fetchDrop()
  }, [])


  if (isLoading) {
    return <ActivityIndicator size={'small'} color={theme.primarycolor} style={{ marginTop: 40 }} />;
  }

  return (
    <>
      <FlatList
        data={profileDrops}
        scrollEnabled={false}
        numColumns={3}
        ListEmptyComponent={<TextNotPublicationsArchiveds>Não há nenhum Drops</TextNotPublicationsArchiveds>}
        keyExtractor={(item, index) => "drop" + item.postHexId}
        renderItem={({ item, index }) => <DropItem item={item} />}
      />
    </>
  );
}



export const DropItem = ({ item }: { item: DropList }) => {
  const navigation = useNavigation<StackRoutes>()
  const [modalDropsEdit, setModalDropsEdit] = useState<boolean>(false)
  const [userId, setUserId] = useState<DropProps>()
  const { setDropsList } = useDropsStore()

  const videoRef = useRef<VideoProperties>();

  const handleNavigateToDropScreen = async () => {
    setDropsList([item])
    navigation.push("DropsScreen", { postHexId: item.postHexId, userId: item.userId })
  }

  const onLoad = ({ duration }) => {
    videoRef.current?.seek(0)
  }

  const actionDeleteDrop = () => {
    deleteDrop(item.postHexId)
      .then((res) => {
        setModalDropsEdit(false)
        // Alert.alert('Deletado o Drop com sucesso')
        navigation.push("MyProfileScreen")
      })
      .catch((error) => {
        // Alert.alert('Erro ao deletar o Drop, tente mais tarde')
      })
  }
  const handleDeleteDrop = () => {
    Alert.alert(
      'Aviso',
      'Quer deletar o Drop?',
      [
        {
          text: 'Não',
          onPress: () => { },
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => actionDeleteDrop(),
        },
      ],
      { cancelable: false },
    );
  }

  return (
    <>
      <TouchableOpacity onPress={handleNavigateToDropScreen}
        style={
          { width: '33%', height: 231, marginRight: 2, marginBottom: 1 }
        }>
        {/* <Image source={{ uri: encodeURI(item.principalMedia.url) }} style={{ width: '100%', height: 231 }} resizeMode='cover' /> */}
        <Video
          ref={videoRef}
          source={{ uri: item.principalMedia.url }}
          style={{ zIndex: 0, width: '100%', height: 231 }}
          paused
          resizeMode="cover"
          onLoad={onLoad}
        />

      </TouchableOpacity>

      <BottomModal
        title=''
        setvisibleBottonModal={setModalDropsEdit}
        visibleBottonModal={modalDropsEdit}
        children={
          <View>
            <DropOptionsButton onPress={handleDeleteDrop}>
              <Icon
                name="trash-outline"
                color={"#231F20"}
                size={22}
              />
              <OptionTitle>Deletar</OptionTitle>
            </DropOptionsButton>
          </View>
        }
      />

    </>
  )
}