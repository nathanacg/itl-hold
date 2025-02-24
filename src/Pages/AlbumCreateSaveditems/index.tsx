import React, { useState } from 'react';

import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"

import {
  TextHeader,
  CameraIcon,
  ImageAlbum,
  ImageAlbumContainer,
  ImageAlbumContainerFlex,
  Title,
  Description,
  Wrapper,
  SubContainer,
  TextError,
  TextErrorName
} from "./style"

import {
  SafeAreaViewContainer,
  Container
} from '../../Components/elementsComponents';

import {
  ContentainerConfigurations,
  TextContainer,
} from '../../Components/configurationsElemetsStyle';
import Header from '../../Components/Header';
import { fontStyle, theme } from '../../Theme/theme';
import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';
import useCaptureImageStore from '../../GlobalState/zustand.store';
import mime from 'mime';
import { createFolder, saveDrops, savePostItem } from '../../Service/Profile';
import useUserProfile from '../../GlobalState/userProfile.zustand';
import ToggleSwitch from '../../Components/ToggleSwitch';
import ImagePicker from 'react-native-image-crop-picker'
import useCreatePost from '../../GlobalState/createPost.zustand';

interface setProps {
  mime: string | null,
  uri: string | any,
  fileName: string
}

export default function AlbumCreateSaveditems() {

  const navigation = useNavigation<StackRoutes>()

  const [showSelectOppenMedia, setShowSelectOppenMedia] = useState<boolean>(false)
  const [albumImage, setAlbumImage] = useState<setProps | undefined>(undefined)

  const [foldersName, setFoldersName] = useState('')
  const { user } = useUserProfile()
  const { postId, setPostId, postHexId, setPostHexId } = useCreatePost()

  const [errorAlbum, setErrorAlbum] = useState<boolean>(false)
  const [errorNameAlbum, setErrorNameAlbum] = useState<boolean>(false)


  const [isPublic, setIsPublic] = useState(true)

  const takePhotoFromGalery = async () => {
    try {
      const responsePicker = await ImagePicker.openPicker({
        width: 200,
        maxFiles: 1,
        mediaType: 'photo',
        cropperCancelText: 'Cancelar',
        smartAlbums: ['UserLibrary'],
        cropperChooseText: 'Escolher',
        loadingLabelText: 'Carregando...',
        cropperTintColor: 'blue',
        height: 200,
        cropping: true,
      })
      setAlbumImage({
        uri: responsePicker.path,
        fileName: responsePicker.filename || '',
        mime: responsePicker.mime
      })

      errorAlbum && setErrorAlbum(false)

    } catch (error) {
      console.warn('openPicker - AlbumCreateSavedItems')
      console.log(error)
    }

  }

  const takePhotoFromCamera = async () => {
    try {
      const responsePicker = await ImagePicker.openCamera({
        width: 200,
        maxFiles: 1,
        cropperCancelText: 'Cancelar',
        cropperChooseText: 'Escolher',
        cropperTintColor: 'blue',
        height: 200,
        forceJpg: true,
        cropping: true,
      })
      setAlbumImage({
        uri: responsePicker.path,
        fileName: responsePicker.filename || '',
        mime: responsePicker.mime
      })

      errorAlbum && setErrorAlbum(false)

    } catch (error) {
      console.warn('openPicker - AlbumCreateSavedItems')
      console.log(error)
    }

  }

  const inSearch = async () => {
    if (foldersName.length < 1) {
      setErrorNameAlbum(true)
      return
    }

    if (!albumImage?.uri) {
      setErrorAlbum(true)
      return
    }
    if (albumImage) {

      const form = new FormData()

      form.append('file', {
        uri: albumImage.uri,
        type: albumImage.mime,
        name: albumImage.fileName + `${mime.getType(albumImage.uri)?.split("/").pop()}` + ".jpg",
      })
      form.append('isPublic', isPublic ? 1 : 0)
      form.append('userId', user.userId)
      form.append('foldersName', foldersName)
      try {
        const response = await createFolder(form)
        setFoldersName('')
        if (postId) {
          await savePostItems(response.data.folderId, postId)
          setPostId(null)
        }
        if (postHexId) {
          await saveDropsItems(response.data.folderId, postHexId)
          setPostHexId(null)
        }
        navigation.push('SavedItensGroups')

      } catch (error) {
        console.warn('CreateFolder - AlbumCreateSavedItems')
        console.log(error.response.data)
      }
    }
  }

  const savePostItems = async (idFolders: number, postId: number) => {
    try {
      await savePostItem(user.userId, idFolders, postId);
    } catch (error) {
      console.warn('savePostItems - AlbumCreateSavedItems')
      console.error(error);
    }
  }

  const saveDropsItems = async (idFolders: number, postHexId: string) => {
    try {
      await saveDrops(user.userId, idFolders, postHexId);
    } catch (error) {
      console.warn('saveDropsItems - AlbumCreateSavedItems')
      console.error(error);
    }
  }

  return (
    <SafeAreaViewContainer>
      <Container>
        <Header
          titleHeader={"      Criar pasta"}
          actionHeaderElement={
            <TouchableOpacity style={{ alignItems: "center", paddingTop: 5 }} onPress={() => { inSearch() }}>
              <TextHeader>{`Avançar`}</TextHeader>
            </TouchableOpacity>
          }
        />
        <ContentainerConfigurations>
          <>
            <SubContainer>
              <Wrapper>
                <Title>Pasta pública</Title>
                <Description>Todos podem visualizar essa pasta</Description>
              </Wrapper>
              <ToggleSwitch
                value={isPublic}
                setValue={() => setIsPublic(!isPublic)}
              />
            </SubContainer>


            <View>
              <TextContainer>

                <Title>Título</Title>
                <TextInput
                  keyboardType={'default'}
                  style={[styles.input]}
                  onChangeText={(text: string) => setFoldersName(text)}
                  placeholder={''}
                  placeholderTextColor="#c6c6c6"
                />

              </TextContainer>
              {
                errorNameAlbum && <TextErrorName>Adicione um título</TextErrorName>
              }
            </View>




            <View>
              <Title>Selecione uma capa</Title>
              <ImageAlbumContainerFlex>

                <TouchableOpacity onPress={takePhotoFromCamera}>
                  <CameraIcon source={require('../../Assets/Icons/CameraIconRounded.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={takePhotoFromGalery}>
                  <CameraIcon source={require('../../Assets/Icons/galeryIconRounded.png')} />
                </TouchableOpacity>
              </ImageAlbumContainerFlex>
              {albumImage?.uri && (
                <ImageAlbumContainer>
                  <TouchableOpacity onPress={() => setShowSelectOppenMedia(!showSelectOppenMedia)}>
                    <>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <ImageAlbum source={{ uri: albumImage?.uri }}
                        />
                      </View>
                    </>
                  </TouchableOpacity>
                </ImageAlbumContainer>
              )}



              {
                errorAlbum && <TextErrorName>Adicione uma capa</TextErrorName>
              }
            </View>
          </>
        </ContentainerConfigurations>


      </Container>
    </SafeAreaViewContainer>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 300,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 23,
    paddingBottom: 2,
    marginBottom: 20,
    position: "relative",
    color: theme.inputTextColor,
    fontSize: 14,
    fontFamily: fontStyle.regular,
    borderColor: '#ababab',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    paddingHorizontal: 2
  }
});
