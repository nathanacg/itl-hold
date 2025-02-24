import React, { SetStateAction, useState } from 'react';
import { Image, View } from 'react-native';
import BottomModal from '../../../../Components/BottomModal';
import SilenceTimeModal from '../../../../Components/SilenceTimeModal';

import AntDesign from 'react-native-vector-icons/AntDesign';
import ConfirmModal from '../../../../Components/ConfirmModal';
import {
  OptionContainer,
  OptionText,
} from '../../../../Components/elementsComponents';
import DenunciaModal from '../../../../Components/DenunciaModal';
import { StackRoutes } from '../../../../Routes/StackTypes';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Info from '../../../../Components/Info';
import SelectUsesrModal from '../../../../Components/SelectUsersModal';
import { useSocket } from '../../../../context/socket';
import Clipboard from '@react-native-clipboard/clipboard';
import { removeRoomMember } from '../../../../Service/Rooms';
import useUserProfile from '../../../../GlobalState/userProfile.zustand';
import { IRoom } from '../../../../Types/rooms.type';

interface UserOptionsProps {
  visibleBottonModal: boolean;
  room: IRoom;
  setvisibleBottonModal: React.Dispatch<SetStateAction<boolean>>;
  isAmParticipating: boolean;
}

export default function UserOptions(props: UserOptionsProps) {
  const navigation = useNavigation<StackRoutes>();

  const { sendRoom } = useSocket();
  const [markedUsers, setMarkedUsers] = useState<
    { name: string; address: string; userId: number }[]
  >([]);
  const { user } = useUserProfile();

  const [silenceModal, setSilenceModal] = useState(false);
  const [silenceTime, setSilenceTime] = useState('');
  const [denounceModal, setDenounceModal] = useState(false);
  const [isUsersModalOpen, setIsUsersModalOpen] = useState(false);

  const [confirmModal, setConfirmModal] = useState(false);

  const [showSmallPopup, setshowSmallPopup] = useState(false);
  const [popoutText, setPopoutText] = useState('');

  const handlePopout = (text: string) => {
    setPopoutText(text);
    setshowSmallPopup(true);
  };

  const copyToClipboard = () => {
    try {
      const message = `http://rooms.intellectus.app.br/${props.room.roomId}`;
      Clipboard.setString(message);
      props.setvisibleBottonModal(!props.visibleBottonModal);
      handlePopout('Link copiado');
    } catch (error) {
      console.warn('CopyToClipboard - Admin');
      console.log(error);
      handlePopout('Erro ao copiar o link');
    }
  };

  const getOutOfRoom = async (roomId: number, userId: number) => {
    await removeRoomMember(userId, roomId)
      .then(res => {
        console.log('ok saiu da sala.', res.data);
      })
      .catch(error => {
        console.log('erro ao sair da sala.', error.response.data);
      });
  };

  return (
    <>
      <BottomModal
        visibleBottonModal={props.visibleBottonModal}
        setvisibleBottonModal={props.setvisibleBottonModal}
        title=""
        children={
          <View>
            <OptionContainer
              onPress={() => {
                props.setvisibleBottonModal(false);
                navigation.navigate('ViewRoom', { Room: props.room });
              }}>
              <Image
                style={{ width: 18, height: 15, resizeMode: 'contain' }}
                source={require('../../../../Assets/Icons/usersGroup.png')}
              />
              <OptionText>Ver sala</OptionText>
            </OptionContainer>
            <OptionContainer
              onPress={() => {
                props.setvisibleBottonModal(false);
                navigation.navigate('RoomParticipants');
              }}>
              <AntDesign name="user" color={'#231F20'} size={20} />
              <OptionText>Ver participantes</OptionText>
            </OptionContainer>
            {/*     <OptionContainer onPress={copyToClipboard} >
                            <Ionicons
                                name="ios-infinite"
                                size={20}
                                color={"#231F20"}
                                style={{ transform: [{ rotate: '-50deg' }] }}
                            />
                            <OptionText>Copiar link</OptionText>
                        </OptionContainer> */}

            {/*   <OptionContainer>
                            <Image style={{ width: 22, height: 20 }} source={require("../../../../Assets/Icons/shareBlack.png")} />
                            <OptionText>Compartilhar em</OptionText>
                        </OptionContainer>
                        */}
            <OptionContainer
              onPress={() => {
                props.setvisibleBottonModal(false);
                setIsUsersModalOpen(true);
              }}>
              <Feather name="send" size={20} color={'#231F20'} />
              <OptionText>Compartilhar com</OptionText>
            </OptionContainer>
            {/*  <OptionContainer onPress={() => navigation.navigate("InviteRoomFriend")}>
                            <AntDesign
                                name="adduser"
                                size={20}
                                color={"#231F20"}
                            />
                            <OptionText>Convidar amigos</OptionText>
                        </OptionContainer>
 */}

            {/*   <OptionContainer>
                            <MaterialCommunityIcons
                                name="bell-ring-outline"
                                color={"#231F20"}
                                size={23}
                            />
                            <OptionText>Ativar notificações</OptionText>
                        </OptionContainer> */}
            {/* <OptionContainer onPress={() => {
                            setSilenceModal(true)
                            props.setvisibleBottonModal(false)
                        }}>
                            <FontAwesome
                                name="bell-slash-o"
                                color={"#231F20"}
                                size={20}
                            />
                            <OptionText>Silenciar</OptionText>
                        </OptionContainer> */}

            {props.isAmParticipating && (
              <OptionContainer
                onPress={() => {
                  setConfirmModal(true);
                  props.setvisibleBottonModal(false);
                }}>
                <MaterialCommunityIcons
                  name="exit-to-app"
                  color={'#231F20'}
                  size={23}
                />
                <OptionText>Sair da sala</OptionText>
              </OptionContainer>
            )}
            <OptionContainer
              onPress={() => {
                setDenounceModal(true);
                props.setvisibleBottonModal(false);
              }}>
              <MaterialCommunityIcons
                name="alert-octagon-outline"
                color={'#231F20'}
                size={23}
              />
              <OptionText>Denunciar</OptionText>
            </OptionContainer>
          </View>
        }
      />

      <Info
        setVissible={setshowSmallPopup}
        isVisible={showSmallPopup}
        text={popoutText}
      />

      <DenunciaModal
        visibleBottonModal={denounceModal}
        setvisibleBottonModal={setDenounceModal}
      />

      <ConfirmModal
        setvisibleBottonModal={props.setvisibleBottonModal}
        title={`Você deseja mesmo sair da sala ${props.room.room_name}?`}
        text="Ao sair da sala, você não terá acesso até solicitar e ser aceito novamente"
        isModalVisible={confirmModal}
        onCancel={() => setConfirmModal(false)}
        onConfirm={() => {
          setConfirmModal(false);
          getOutOfRoom(props.room.room_id, user.userId);
          navigation.push('TabNavigation', { screen: 'RoomsList' });
        }}
      />

      <SelectUsesrModal
        markedUsers={markedUsers}
        setMarkedUsers={setMarkedUsers}
        visibleBottonModal={isUsersModalOpen}
        setvisibleBottonModal={setIsUsersModalOpen}
        onSend={text => {
          sendRoom(
            markedUsers.map(item => item.userId),
            props.room.room_id,
            text,
            props.room.image,
          ),
            setMarkedUsers([]);
        }}
      />

      <SilenceTimeModal
        visibleBottonModal={silenceModal}
        setvisibleBottonModal={setSilenceModal}
        seletedOption={silenceTime}
        setOption={setSilenceTime}
      />
    </>
  );
}
