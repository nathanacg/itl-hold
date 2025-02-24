import React, { useEffect, useState } from 'react';
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
} from '../../../Components/elementsComponents';
import {
     ContentainerConfigurations,
     TextContainer,
} from '../../../Components/configurationsElemetsStyle';
import Header from '../../../Components/Header';
import { fontStyle, theme } from '../../../Theme/theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackRoutes } from '../../../Routes/StackTypes';
import useCaptureImageStore from '../../../GlobalState/zustand.store';
import mime from 'mime';
import { updateAlbum } from '../../../Service/Albuns';
import useUserProfile from '../../../GlobalState/userProfile.zustand';

interface setProps {
     mime: string | null,
     uri: string | any,
     fileName: string
}

export default function EditAlbum() {
     const navigation = useNavigation<StackRoutes>();
     const { user } = useUserProfile();
     const route = useRoute();
     const params = route.params as { albumId: number }
     const [showSelectOppenMedia, setShowSelectOppenMedia] = useState<boolean>(false)
     const { captureImage, setCaptureImage } = useCaptureImageStore()
     const [editTitle, seteditAlbumTitle] = useState<string>('')
     const [albumImage, setAlbumImage] = useState<setProps>()

     const selectImage = () => {
          navigation.navigate("Galery", { nextRouteName: 'EditAlbum', routeParams: { albumId: params.albumId } })
     }

     const editAlbum = async () => {
          const title = editTitle;
          if (albumImage) {
               const form = new FormData();
               form.append('title', title);
               form.append('file', {
                    uri: albumImage?.uri,
                    type: albumImage?.mime,
                    name: albumImage?.fileName + `${mime.getType(albumImage?.uri)?.split("/").pop()}` + ".jpg",
               });
               form.append('albumId', params.albumId);

               await updateAlbum(form).then((response) => {
                    navigation.navigate('Album', {
                         titleAlbum: title,
                         imagealbum: albumImage?.uri,
                         albumId: params.albumId,
                         userId: user.userId
                    });
                    seteditAlbumTitle('')
                    setCaptureImage({
                         fileName: '',
                         uri: '',
                         mime: ''
                    })
               })
                    .catch(err => {
                         console.log("Error on push params-information:", err, err.response.data)
                    })
          }
     };

     useEffect(() => {
          captureImage.length > 0 &&
               setAlbumImage({
                    fileName: captureImage[captureImage.length - 1].filename,
                    uri: captureImage[captureImage.length - 1].uri,
                    mime: mime.getType(captureImage[captureImage.length - 1].uri)
               })
     }, [captureImage.length])

     return (
          <SafeAreaViewContainer>
               <Container>
                    <Header
                         titleHeader={"Editar álbum"}
                         actionHeaderElement={
                              <TouchableOpacity style={{ alignItems: "center", paddingTop: 5 }} onPress={() => {
                                   editAlbum()
                              }
                              }>
                                   <TextHeader>{"Editar"}</TextHeader>
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
                                             onChangeText={(text: string) => seteditAlbumTitle(text)}
                                             placeholder={''}
                                             placeholderTextColor="#c6c6c6"
                                        />
                                   </TextContainer>
                              </View>

                              <View>
                                   <TextOptionSelectedBottom>Selecione a capa</TextOptionSelectedBottom>
                                   {captureImage.length > 0 ? (
                                        <ImageAlbumContainer>
                                             <TouchableOpacity onPress={() => setShowSelectOppenMedia(!showSelectOppenMedia)}>
                                                  <>
                                                       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <ImageAlbum source={{ uri: captureImage[captureImage.length - 1]?.uri }}
                                                            />
                                                       </View>
                                                  </>
                                             </TouchableOpacity>
                                             <TouchableOpacity onPress={() => selectImage()}>
                                                  <CameraIcon source={require('../../../Assets/Icons/cameraBlue.png')} />
                                             </TouchableOpacity>
                                        </ImageAlbumContainer>
                                   ) : (
                                        <ImageAlbumContainerFlex>
                                             <TouchableOpacity style={{ marginTop: -10 }} onPress={() => selectImage()}>
                                                  <CameraIcon source={require('../../../Assets/Icons/cameraBlue.png')} />
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