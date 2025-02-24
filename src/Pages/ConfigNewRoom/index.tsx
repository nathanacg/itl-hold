import React, { useState } from 'react';
import { ActivityIndicator, Image, TouchableOpacity } from 'react-native';

import { StackRoutes } from '../../Routes/StackTypes';
import { useNavigation, useRoute } from '@react-navigation/native';

import { ConfigRoomContainer, PublicImage } from './style';

import { SafeAreaViewContainer } from '../../Components/elementsComponents';
import { TextRegular16 } from '../../Components/configurationsElemetsStyle';

import Header from '../../Components/Header';

import {
  ActionsEditProfilePhotoContainer,
  ContentPage,
  ProfilePhotoContainer,
} from '../../Components/Informationsform';

import NewRoomNameInput from '../../Components/NewRoomNameInput';

import { createRoom, getRoomDetails } from '../../Service/Rooms';

import ImagePicker from 'react-native-image-crop-picker';

import { IRoom } from '../../Types/rooms.type';
import useRoom from '../../GlobalState/room.zustand';

import { theme } from '../../Theme/theme';
import Info from '../../Components/Info';
import { RoomLocationEnum } from '../../enum';

interface documentProps {
  mime: string;
  uri: string;
  name: string;
}

export default function ConfigNewRoom() {
  const { setRoom, populateParticipatingRoomsIds } = useRoom();

  const [showSmallPopup, setshowSmallPopup] = useState<boolean>(false);
  const [popoutText, setPopoutText] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const route = useRoute();

  const params = route.params as {
    RoomType: string;
    RoomName: string;
    duration: string;
    category: string;
    startDate?: { data: string; hora: string };
    endDate?: { data: string; hora: string };
  };

  const navigation = useNavigation<StackRoutes>();

  const [description, setDescription] = useState<string>('');

  const [imageRoom, setNewImageRoom] = useState<documentProps>();

  const takePhotoFromGalery = async () => {
    await ImagePicker.openPicker({
      width: 500,
      maxFiles: 1,
      smartAlbums: ['UserLibrary'],
      writeTempFile: true,
      compressImageQuality: 0.8,
      cropperCancelText: 'Cancelar',
      cropperChooseText: 'Escolher',
      loadingLabelText: 'Carregando...',
      cropperTintColor: 'blue',
      height: 250,
      forceJpg: true,
      cropping: true,
    })
      .then(image => {
        const imageSelected: documentProps = {
          uri: image.path,
          name: image.filename || '',
          mime: image.mime,
        };
        setNewImageRoom(imageSelected);
      })
      .catch(e => {
        console.warn('ImagePicker Create Room');
        console.log(e);
      });
  };

  const takePhotoFromCamera = async () => {
    await ImagePicker.openCamera({
      width: 500,
      maxFiles: 1,
      writeTempFile: true,
      compressImageQuality: 0.8,
      useFrontCamera: false,
      cropperCancelText: 'Cancelar',
      cropperChooseText: 'Escolher',
      loadingLabelText: 'Carregando...',
      height: 250,
      forceJpg: true,
      cropping: true,
    })
      .then(image => {
        const imageSelected: documentProps = {
          uri: image.path,
          name: image.filename || '',
          mime: image.mime,
        };
        setNewImageRoom(imageSelected);
      })
      .catch(e => {
        console.warn('ImagePicker - Room Create');
        console.log(e);
      });
  };

  //   function validateUrlHttps(url: string) {
  //     if (/(http(s?)):\/\//i.test(url)) {
  //       return `https://${url}`;
  //     }
  //     return url;
  //   }

  async function handleNewRoom() {
    setIsLoading(true);

    if (!imageRoom || imageRoom.uri.length === 0) {
      setPopoutText('Selecione uma imagem.');
      setshowSmallPopup(true);
      setIsLoading(false);
      return;
    }

    if (description.length === 0) {
      setPopoutText('Insira uma descrição.');
      setshowSmallPopup(true);
      setIsLoading(false);
      return;
    }

    const form = new FormData();

    form.append('file', {
      uri: imageRoom.uri,
      type: imageRoom.mime,
      name: imageRoom?.uri?.split('/').pop(),
    });

    form.append('description', description);
    form.append('roomName', params.RoomName);

    form.append('isPublic', params.RoomType === 'Privada' ? 0 : 1);

    switch (params.category) {
      case 'Filme':
        form.append('movies', 1);
        form.append('books', 0);
        form.append('musics', 0);
        form.append('series', 0);
        form.append('podcasts', 0);
        form.append('articles', 0);
        break;
      case 'Livro':
        form.append('movies', 0);
        form.append('books', 1);
        form.append('musics', 0);
        form.append('series', 0);
        form.append('podcasts', 0);
        form.append('articles', 0);
        break;
      case 'Música':
        form.append('musics', 1);
        form.append('movies', 0);
        form.append('books', 0);
        form.append('series', 0);
        form.append('podcasts', 0);
        form.append('articles', 0);
        break;
      case 'Artigo':
        form.append('articles', 1);
        form.append('musics', 0);
        form.append('movies', 0);
        form.append('books', 0);
        form.append('series', 0);
        form.append('podcasts', 0);
        break;
      case 'Série':
        form.append('series', 1);
        form.append('musics', 0);
        form.append('movies', 0);
        form.append('books', 0);
        form.append('podcasts', 0);
        form.append('articles', 0);
        break;
      case 'Podcast':
        form.append('podcasts', 1);
        form.append('musics', 0);
        form.append('movies', 0);
        form.append('books', 0);
        form.append('series', 0);
        form.append('articles', 0);
        break;
      default:
        break;
    }

    try {
      const resCreateRoom = await createRoom(form);
      const resGetRoom = await getRoomDetails(resCreateRoom.data.room_id);
      const room: IRoom = await resGetRoom.data.result;

      if (room) {
        setRoom(room);
        populateParticipatingRoomsIds();
        /*   if (params.duration === "Temporária") {

                      const partesData = params.startDate?.data ? params.startDate.data.split('/') : []
                      const dia = partesData[0]
                      const mes = partesData[1]
                      const ano = partesData[2]

                      const partesHora = params.startDate?.hora ? params.startDate.hora.split(/[hH]/) : []
                      const hora = partesHora[0]
                      const minuto = partesHora[1]

                      const partesData2 = params.endDate?.data ? params.endDate.data.split('/') : []
                      const dia2 = partesData2[0]
                      const mes2 = partesData2[1]
                      const ano2 = partesData2[2]

                      const partesHora2 = params.endDate?.hora ? params.endDate.hora.split(/[hH]/) : []
                      const hora2 = partesHora2[0]
                      const minuto2 = partesHora2[1]

                      const dataHoraFormatadaInicio = `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')} ${hora.padStart(2, '0')}:${minuto.padStart(2, '0')}:00`
                      const dataHoraFormatadaFim = `${ano2}-${mes2.padStart(2, '0')}-${dia2.padStart(2, '0')} ${hora2.padStart(2, '0')}:${minuto2.padStart(2, '0')}:00`

                      await createRoomDuration(room.room_id, dataHoraFormatadaInicio, dataHoraFormatadaFim)
                  } */
        navigation.push('RoomCommunity', {
          from: RoomLocationEnum.FROM_ROOM_CREATION,
          UserType: 'admin',
          Room: room,
        });
      }
    } catch (error) {
      console.log('Erro ao criar a sala:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaViewContainer>
      <ConfigRoomContainer>
        <Header
          titleHeader="Criar sala"
          actionHeaderElement={
            <>
              {isLoading ? (
                <ActivityIndicator size={15} color={theme.primarycolor} />
              ) : (
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    paddingTop: 3,
                    position: 'absolute',
                    right: 0,
                  }}
                  onPress={handleNewRoom}>
                  <TextRegular16>Avançar</TextRegular16>
                </TouchableOpacity>
              )}
            </>
          }
        />
        {imageRoom ? (
          <PublicImage source={{ uri: imageRoom?.uri }} />
        ) : (
          <PublicImage
            source={require('../../Assets/Image/background_app.png')}
          />
        )}

        <ContentPage>
          <ProfilePhotoContainer>
            <ActionsEditProfilePhotoContainer>
              <TouchableOpacity onPress={takePhotoFromCamera}>
                <Image
                  source={require('../../Assets/Icons/CameraIconRounded.png')}
                  style={{ width: 45, height: 45, resizeMode: 'contain' }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={takePhotoFromGalery}>
                <Image
                  source={require('../../Assets/Icons/galeryIconRounded.png')}
                  style={{ width: 45, height: 45, resizeMode: 'contain' }}
                />
              </TouchableOpacity>
              {imageRoom && (
                <TouchableOpacity
                  onPress={() =>
                    setNewImageRoom({ uri: '', name: '', mime: '' })
                  }>
                  <Image
                    source={require('../../Assets/Icons/deleteIconRounded.png')}
                    style={{ width: 45, height: 45, resizeMode: 'contain' }}
                  />
                </TouchableOpacity>
              )}
            </ActionsEditProfilePhotoContainer>
          </ProfilePhotoContainer>

          <NewRoomNameInput
            maxLength={300}
            setText={setDescription}
            textValue={description}
          />
        </ContentPage>
      </ConfigRoomContainer>
      {/* <InfoError setVissible={setshowSmallPopup} isVisible={showSmallPopup} text={popoutText} /> */}
      <Info
        setVissible={setshowSmallPopup}
        isVisible={showSmallPopup}
        text={popoutText}
      />
    </SafeAreaViewContainer>
  );
}
