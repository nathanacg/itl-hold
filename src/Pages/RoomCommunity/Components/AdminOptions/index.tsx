import React, { SetStateAction, useState } from 'react';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../../../Routes/StackTypes';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import BottomModal from '../../../../Components/BottomModal';
import SilenceTimeModal from '../../../../Components/SilenceTimeModal';

import ConfirmModal from '../../../../Components/ConfirmModal';
import {
  OptionContainer,
  OptionText,
} from '../../../../Components/elementsComponents';
import DenunciaModal from '../../../../Components/DenunciaModal';
import SelectUsesrModal from '../../../../Components/SelectUsersModal';

import { useSocket } from '../../../../context/socket';
import { desactiveRoom } from '../../../../Service/Rooms';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Image } from 'react-native-elements';
import { IRoom } from '../../../../Types/rooms.type';

interface OptionsModalProps {
  visibleBottonModal: boolean;
  setvisibleBottonModal: React.Dispatch<SetStateAction<boolean>>;
  navigate: () => void;
  room: IRoom;
  roomImage: string;
}

export default function OptionsModal(props: OptionsModalProps) {
  const navigation = useNavigation<StackRoutes>();

  const { sendRoom } = useSocket();

  const [silenceModal, setSilenceModal] = useState(false);
  const [silenceTime, setSilenceTime] = useState('');
  const [denounceModal, setDenounceModal] = useState(false);
  const [isUsersModalOpen, setIsUsersModalOpen] = useState(false);
  const [markedUsers, setMarkedUsers] = useState<
    { name: string; address: string; userId: number }[]
  >([]);

  // const [popoutText, setPopoutText] = useState('');

  const [confirmDelete, setConfirmDelete] = useState(false);

  // const handlePopout = (text: string) => {
  //   setPopoutText(text);
  //   props.setvisibleBottonModal(false);
  //   setshowSmallPopup(true);
  // };
  console.log('Renderizou AdminOptions', confirmDelete);
  async function handleDeleteRoom() {
    try {
      await desactiveRoom(props.room.room_id, 0);
      navigation.navigate('TabNavigation', { screen: 'RoomsList' });
    } catch (error) {
      console.log('erro ao deletar a sala.', error);
    }
  }

  //   const copyToClipboard = () => {
  //     try {
  //       const message = `http://rooms.intellectus.app.br/${props.roomId}`;
  //       Clipboard.setString(message);
  //       props.setvisibleBottonModal(!props.visibleBottonModal);
  //       handlePopout('Link copiado');
  //     } catch (error) {
  //       console.warn('CopyToClipboard - Admin');
  //       console.log(error);
  //       handlePopout('Erro ao copiar o link');
  //     }
  //   };

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
                props.navigate();
                props.setvisibleBottonModal(false);
              }}>
              <Feather name="edit" size={20} color={'#231F20'} />
              <OptionText>Editar sala</OptionText>
            </OptionContainer>

            {/*
                        <OptionContainer onPress={copyToClipboard}>

                            <Ionicons
                                name="ios-infinite"
                                size={20}
                                color={"#231F20"}
                                style={{ transform: [{ rotate: '-50deg' }] }}
                            />
                            <OptionText>Copiar link</OptionText>

                        </OptionContainer> */}

            {/* <OptionContainer>
                            <Image style={{ width: 22, height: 20 }} source={require("../../../../Assets/Icons/shareBlack.png")} />
                            <OptionText>Compartilhar em</OptionText>

                        </OptionContainer>*/}
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
            <OptionContainer
              onPress={() => {
                props.setvisibleBottonModal(false);
                setIsUsersModalOpen(true);
              }}>
              <Feather name="send" size={20} color={'#231F20'} />
              <OptionText>Compartilhar com</OptionText>
            </OptionContainer>

            {/* <OptionContainer>
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
                        </OptionContainer>*/}

            <OptionContainer
              onPress={() => {
                props.setvisibleBottonModal(false);
                setTimeout(() => {
                  setConfirmDelete(true);
                }, 400);
              }}>
              <Ionicons name="trash-outline" color={'#231F20'} size={22} />
              <OptionText>Excluir sala</OptionText>
            </OptionContainer>
          </View>
        }
      />
      {/* <Info
        setVissible={setshowSmallPopup}
        isVisible={showSmallPopup}
        text={popoutText}
      /> */}

      <DenunciaModal
        visibleBottonModal={denounceModal}
        setvisibleBottonModal={setDenounceModal}
      />

      {/*    <ConfirmModal
                setvisibleBottonModal={props.setvisibleBottonModal}
                title={`Você deseja sair da sala?`}
                text="Ao sair da sala, você não terá acesso até solicitar e ser aceito novamente"
                isModalVisible={confirmModal}
                onCancel={() => setConfirmModal(false)}
                onConfirm={() => setConfirmModal(false)}
            />
            */}

      <ConfirmModal
        setvisibleBottonModal={props.setvisibleBottonModal}
        title="Você deseja mesmo deletar a sala?"
        text="Ao sair da sala, você não terá acesso até solicitar e ser aceito novamente"
        isModalVisible={confirmDelete}
        onCancel={() => setConfirmDelete(false)}
        onConfirm={() => {
          setConfirmDelete(false);
          handleDeleteRoom();
        }}
      />

      {/* <Info
        setVissible={setshowSmallPopup}
        isVisible={showSmallPopup}
        text={popoutText}
      /> */}

      <SilenceTimeModal
        visibleBottonModal={silenceModal}
        setvisibleBottonModal={setSilenceModal}
        seletedOption={silenceTime}
        setOption={setSilenceTime}
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
            text || null,
            props.roomImage,
          ),
            setMarkedUsers([]);
        }}
      />
    </>
  );
}
