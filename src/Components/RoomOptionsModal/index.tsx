import React, { SetStateAction, useState } from 'react';
import { Image, View } from 'react-native';

import { OptionContainer, OptionText } from '../elementsComponents';

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Info from '../Info';
import BottomModal from '../BottomModal';
import DenunciaModal from '../DenunciaModal';
import SelectUsesrModal from '../SelectUsersModal';

import Popout from '../Popout';
import ShareModal from '../ShareModal';
import SelectUsesModal from '../SelectUsersModal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

import { useSocket } from '../../context/socket';
import useRoom from '../../GlobalState/room.zustand';
import SelectUsersModal from '../SelectUsersModal';

interface RoomOptionModalProps {
  visibleBottonModal: boolean;
  setvisibleBottonModal: React.Dispatch<SetStateAction<boolean>>;
  spoilerOnDenuncia?: boolean;
  salaParticipant?: boolean;
  myProfile?: boolean;
  roomId: number | null;
}

export default function RoomOptionModal(props: RoomOptionModalProps) {
  const { sendRoom } = useSocket();

  const { room } = useRoom();

  const [showSmallPopup, setshowSmallPopup] = useState(false);
  const [infoText, setInfoText] = useState('');
  const [isUsersModalOpen, setIsUsersModalOpen] = useState(false);
  const [isDenunciaModalOpen, setIsdenunciaModalOpen] = useState(false);
  const [markedUsers, setMarkedUsers] = useState<
    { name: string; address: string; userId: number }[]
  >([]);

  const handlePopout = (text: string) => {
    setInfoText(text);
    props.setvisibleBottonModal(false);
    setshowSmallPopup(true);
  };

  return (
    <>
      <BottomModal
        visibleBottonModal={props.visibleBottonModal}
        setvisibleBottonModal={() => {
          props.setvisibleBottonModal(false);
        }}
        title=""
        children={
          <View>
            {/*   <OptionContainer onPress={() => handlePopout("Link copiado")} >
                            <Ionicons
                                name="ios-infinite"
                                size={20}
                                color={"#231F20"}
                                style={{ transform: [{ rotate: '-50deg' }] }}
                            />
                            <OptionText>Copiar link</OptionText>
                        </OptionContainer> */}

            {/*   <OptionContainer onPress={() => {
                            props.setvisibleBottonModal()
                            setIsShareModalOpen(true)
                        }}>
                            <Image style={{ width: 22, height: 20 }} source={require("../../Assets/Icons/shareBlack.png")} />
                            <OptionText>Compartilhar em</OptionText>
                        </OptionContainer> */}

            <OptionContainer
              onPress={() => {
                props.setvisibleBottonModal(false);
                setIsUsersModalOpen(true);
              }}>
              <Feather name="send" size={22} color={'#231F20'} />
              <OptionText>Compartilhar com</OptionText>
            </OptionContainer>

            {!props.salaParticipant && (
              <OptionContainer>
                <Image source={require('../../Assets/Icons/calender.png')} />
                <OptionText>Adicionar ao calendário</OptionText>
              </OptionContainer>
            )}

            {/*  <OptionContainer>
                            <MaterialCommunityIcons
                                name="bell-ring-outline"
                                color={"#231F20"}
                                size={23}
                            />
                            <OptionText>Ativar notificações</OptionText>
                        </OptionContainer> */}
            {/*  <OptionContainer onPress={() => handlePopout("Sala silenciada")}>
                            <FontAwesome
                                name="bell-slash-o"
                                color={"#231F20"}
                                size={20}
                            />
                            <OptionText>Silenciar</OptionText>
                        </OptionContainer> */}
            {/*
                        {props.salaParticipant && (
                            <OptionContainer>
                                <MaterialCommunityIcons
                                    name="exit-to-app"
                                    color={"#231F20"}
                                    size={23}
                                />
                                <OptionText>Sair da sala</OptionText>
                            </OptionContainer>
                        )} */}
            {!props.myProfile && (
              <OptionContainer
                onPress={() => {
                  props.setvisibleBottonModal(false);
                  setIsdenunciaModalOpen(true);
                }}>
                <MaterialCommunityIcons
                  name="alert-octagon-outline"
                  color={'#231F20'}
                  size={23}
                />
                <OptionText>Denunciar</OptionText>
              </OptionContainer>
            )}

            {/*   {props.myProfile && (
                            <OptionContainer>
                                <Entypo
                                    name="block"
                                    color={"#231F20"}
                                    size={18}
                                    style={{ marginLeft: 2 }}
                                />
                                <OptionText>Ocultar do perfil</OptionText>
                            </OptionContainer>
                        )} */}
          </View>
        }
      />

      <Info
        setVissible={setshowSmallPopup}
        isVisible={showSmallPopup}
        text={infoText}
      />

      <DenunciaModal
        spoilerOption={props.spoilerOnDenuncia}
        visibleBottonModal={isDenunciaModalOpen}
        setvisibleBottonModal={() => {
          setIsdenunciaModalOpen(false);
        }}
      />

      <SelectUsesrModal
        messageOption
        markedUsers={markedUsers}
        setMarkedUsers={setMarkedUsers}
        visibleBottonModal={isUsersModalOpen}
        setvisibleBottonModal={setIsUsersModalOpen}
        onSend={text => {
          sendRoom(
            markedUsers.map(item => item.userId),
            props.roomId,
            text || null,
            props.roomImage,
          ),
            setMarkedUsers([]);
        }}
      />
    </>
  );
}
