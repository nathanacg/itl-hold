import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import {
  TextHeader,
  TextOptionSelectedBottom,
  CameraIcon,
  ImageAlbum,
  ImageAlbumContainer,
  ImageAlbumContainerFlex
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
import { useNavigation, useRoute } from '@react-navigation/native';
import { RootStackRoutes, StackRoutes } from '../../Routes/StackTypes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import useCaptureImageStore from '../../GlobalState/zustand.store';
import mime from 'mime';
import useUserProfile from '../../GlobalState/userProfile.zustand';
import { createAlbumAdd } from '../../Service/Albuns';
import { DocumentPickerResponse } from 'react-native-document-picker';

type paramsProps = NativeStackScreenProps<RootStackRoutes, 'AlbumCreateAndEdit'>;

interface setProps {
  mime: string | null,
  uri: string | any,
  fileName: string
}


export default function AlbumCreateAndEdit() {
  const navigation = useNavigation<StackRoutes>();
  const route = useRoute();
  const params = route.params as { newAlbum: boolean, isEditAlbum: boolean }

  const [publicFolder, setPublicFolder] = useState<boolean>(true)
  const [showSelectOppenMedia, setShowSelectOppenMedia] = useState<boolean>(false)
  const { captureImage, setCaptureImage } = useCaptureImageStore()
  const [result, setResult] = useState<DocumentPickerResponse[]>([]);
  const [foldersName, setFoldersName] = useState('');
  const { user } = useUserProfile();

  const [albumCreate, setAlbumCreate] = useState<any>(false)
  const [albumImage, setAlbumImage] = useState<setProps>({ fileName: '', uri: '', mime: '' })
  const [isForEditing, setIsForEditing] = useState<boolean>()
  const [albumId, setAlbumId] = useState<boolean>()

  const functionNavigate = () => {
    setAlbumImage({
      fileName: '',
      uri: '',
      mime: ''
    })
    navigation.navigate("Galery", { nextRouteName: 'AlbumCreateAndEdit', routeParams: { newAlbum: params.newAlbum, isEditAlbum: params.isEditAlbum } })
  }

  useEffect(() => {
    if (params.newAlbum) {
      setAlbumCreate(params.newAlbum);
      setAlbumId(albumId)
    }

  }, [params.newAlbum, captureImage.length])

  const renderImage = useCallback(() => {
    if (!!captureImage[0]?.uri) {

      setAlbumImage({
        fileName: captureImage[captureImage.length - 1].filename,
        uri: captureImage[captureImage.length - 1].uri,
        mime: mime.getType(captureImage[captureImage.length - 1].uri)
      })
    }
  }, [captureImage.length])

  useEffect(() => {
    if (!!captureImage[0]?.uri) {
      renderImage()
    }
  }, [!!captureImage[0]?.uri])


  const callForm = async () => {

    const title = foldersName;

    if (albumImage) {
      const form = new FormData();
      form.append('title', title);
      form.append('file', {
        uri: albumImage?.uri,
        type: albumImage.mime,
        name: albumImage.fileName + `${mime.getType(albumImage.uri)?.split("/").pop()}` + ".jpg",
      });

      await createAlbumAdd(form).then((response) => {
        setFoldersName('')
        setAlbumCreate(false)
        setCaptureImage([])

        setAlbumImage({
          fileName: '',
          uri: '',
          mime: ''
        })
        navigation.navigate("Album", {
          titleAlbum: title,
          imagealbum: albumImage?.uri,
          albumId: response?.data.result.insertId,
          userId: user.userId
        });
      })
        .catch(err => {
          console.log("Error on push params-information:", err, err.response.data)
        })
    }
  }
  return (
    <SafeAreaViewContainer>
      <Container>
        <Header
          titleHeader={"Novo álbum"}
          actionHeaderElement={
            <TouchableOpacity style={{ alignItems: "center", paddingTop: 5 }} onPress={() => {
              callForm();
            }
            }>
              <TextHeader>{albumCreate ? "Criar" : "Avançar"}</TextHeader>
            </TouchableOpacity>
          }
        />

        <ContentainerConfigurations>
          <>
            <View>
              <TextContainer>
                <TextOptionSelectedBottom>Título do álbum</TextOptionSelectedBottom>
                <TextInput
                  keyboardType={'default'}
                  style={[styles.input]}
                  onChangeText={(text: string) => setFoldersName(text)}
                  placeholder={''}
                  placeholderTextColor="#c6c6c6"
                />
              </TextContainer>
            </View>

            <View>
              <TextOptionSelectedBottom>Selecione a capa</TextOptionSelectedBottom>
              {albumImage?.uri ? (
                <ImageAlbumContainer>
                  <TouchableOpacity onPress={() => setShowSelectOppenMedia(!showSelectOppenMedia)}>
                    <>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <ImageAlbum source={{ uri: albumImage?.uri }}
                        />
                      </View>
                    </>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => functionNavigate()}>
                    <CameraIcon source={require('../../Assets/Icons/cameraBlue.png')} />
                  </TouchableOpacity>
                </ImageAlbumContainer>
              ) : (
                <ImageAlbumContainerFlex>
                  <TouchableOpacity style={{ marginTop: -10 }} onPress={() => functionNavigate()}>
                    <CameraIcon source={require('../../Assets/Icons/cameraBlue.png')} />
                  </TouchableOpacity>
                </ImageAlbumContainerFlex>
              )}
            </View>
          </>
        </ContentainerConfigurations>
      </Container>
    </SafeAreaViewContainer>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 240,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 10,
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
    paddingHorizontal: 12
  }
});
