import { Image, TouchableOpacity, View } from "react-native";
import { Container, SafeAreaViewContainer } from "../../Components/elementsComponents";
import {
  ImageAlbum,
  ImageAlbumContainer,
  SetEditSelection,
  TextHeader,
  TextInputTitle,
  TextOptionSelectedBottom
} from "./style";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from "../../Components/Header";
import { ContentainerConfigurations, TextContainer } from "../../Components/configurationsElemetsStyle";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackRoutes } from "../../Routes/StackTypes";
import useDestackInfoStore from "../../GlobalState/destacksInfo.zustand";
import { updateHighlight } from "../../Service/Destack";
import { StoryAndPost } from "../../Service/StoryDestackType";
import useUserProfile from "../../GlobalState/userProfile.zustand";
import { DocumentPickerResponse } from "react-native-document-picker";
import ImagePicker from 'react-native-image-crop-picker'

export default function EditHighlight() {
  const navigation = useNavigation<StackRoutes>();
  const { destackImage, destackName, destackId, setDestackName, setDestackId } = useDestackInfoStore()
  const { user } = useUserProfile()
  const route = useRoute();
  const params = route.params as { imagesStoryPost: StoryAndPost[] }
  const [inputValue, setInputValue] = useState(destackName)
  const [result, setResult] = useState<DocumentPickerResponse[]>([]);

  const takePhotoFromGalery = async () => {
    await ImagePicker.openPicker({
      width: 200,
      cropperCircleOverlay: false,
      maxFiles: 1,
      writeTempFile: true,
      compressImageQuality: 0.8,
      cropperCancelText: 'Cancelar',
      cropperChooseText: 'Escolher',
      loadingLabelText: 'Carregando...',
      cropperTintColor: 'blue',
      height: 200,
      forceJpg: true,
      cropping: true,
    }).then((image) => {
      const timestamp = new Date().getTime();
      const uniqueName = `image_${timestamp}.jpg`;
      return (
        setResult([{
          uri: image.path,
          name: uniqueName,
          type: image.mime,
          fileCopyUri: "",
          size: 0
        }])
      )

    })
      .catch((e) => {
        console.warn('ImagePicker OpenPicker - EditProfile')
        console.log(e)
      })
  }

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 200,
      cropperCircleOverlay: false,
      maxFiles: 1,
      writeTempFile: true,
      compressImageQuality: 0.8,
      useFrontCamera: false,
      cropperCancelText: 'Cancelar',
      cropperChooseText: 'Escolher',
      loadingLabelText: 'Carregando...',
      height: 200,
      forceJpg: true,
      cropping: true,
    }).then((image) => {
      const timestamp = new Date().getTime();
      const uniqueName = `image_${timestamp}.jpg`;
      return (
        setResult([{
          uri: image.path,
          name: uniqueName,
          type: image.mime,
          fileCopyUri: "",
          size: 0
        }])
      )

    })
      .catch((e) => {
        console.warn('ImagePicker - EditProfile')
        console.log(e)
      })
  }

  const updateHighlightEdit = async () => {
    const title = inputValue ? inputValue : destackName;
    const form = new FormData();
    form.append('title', title);

    if (result[0]?.uri) {
      form.append('file', {
        uri: result[0].uri,
        type: result[0].type,
        name: result[0].name,
      });
    } else {
      form.append('file', {
        uri: destackImage.uri,
        type: destackImage.mime,
        name: destackImage.name,
      });
    }

    form.append('highlightId', destackId);

    await updateHighlight(form)
      .then((response) => {
        setDestackId(destackId)
        setDestackName(title)
        navigation.push('StoryDestackComponent', {
          idProfile: user.userId,
          profileImage: user.profileImage
        });
      })
      .catch((e) => {
        console.error(e)
      })

  };

  return (
    <>
      <SafeAreaViewContainer>
        <Container>
          <Header
            titleHeader='Editar destaque'
            actionHeaderElement={
              <TouchableOpacity onPress={() => { updateHighlightEdit() }}>
                <TextHeader>Avançar</TextHeader>
              </TouchableOpacity>
            }
          />

          <ContentainerConfigurations>
            <View>
              <TextContainer>
                <TextOptionSelectedBottom>Título do destaque</TextOptionSelectedBottom>
                <TextInputTitle
                  keyboardType={'default'}
                  onChangeText={(newText: string) => {
                    if (newText.length <= 10) {
                      setInputValue(newText);
                    }
                  }}
                  placeholder={destackName}
                  placeholderTextColor="#c6c6c6"
                  value={inputValue}
                />
              </TextContainer>
            </View>

            <SetEditSelection onPress={() => {
              navigation.push('ListArquivedSelect', {
                isPost: params.imagesStoryPost[0]?.postId != undefined ? true : false
              })
            }}>
              <TextOptionSelectedBottom>Editar Seleção</TextOptionSelectedBottom>
              <AntDesign
                name="right"
                size={18}
                color={'black'}
                style={{ marginTop: 1, marginLeft: 246 }}
              />
            </SetEditSelection>

            {result[0]?.uri != '' && (
              <View>
                <View style={{ flexDirection: 'row', marginBottom: 15, alignItems: 'center', gap: 16, marginTop: -4 }}>
                  <TextOptionSelectedBottom>Selecione a capa</TextOptionSelectedBottom>

                  <TouchableOpacity onPress={() => {
                    setResult([]),
                      takePhotoFromGalery()
                  }}>
                    <Image source={require('../../Assets/Icons/galeryGrey.png')} style={{ width: 20, height: 20, tintColor: '#5D5D5D', resizeMode: 'contain' }} />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => {
                    setResult([]),
                      takePhotoFromCamera()
                  }}>
                    <Image source={require('../../Assets/Icons/camera.png')} style={{ width: 19.5, height: 19.5, tintColor: '#5D5D5D', resizeMode: 'contain' }} />
                  </TouchableOpacity>
                </View>
                <ImageAlbumContainer>
                  <ImageAlbum source={{ uri: result[0]?.uri ? result[0]?.uri : destackImage.uri }} />
                </ImageAlbumContainer>
              </View>
            )}
          </ContentainerConfigurations>
        </Container>
      </SafeAreaViewContainer >
    </>
  );
};