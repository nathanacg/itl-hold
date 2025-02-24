/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';

import Icon from 'react-native-vector-icons/Ionicons';

import { TextRegular12Light } from '../configurationsElemetsStyle';

import {
  BoldText,
  ColumnDirection,
  Container,
  NormalText,
  NormalTextLight,
  Participants,
  RowDirection,
  SalaButton,
  SalaFooter,
  SalaHeader,
  SalaTitle,
  Shadow,
  UserImage,
} from './style';

import { SalaDesc, WhiteTextRoom } from '../SmallRoomCard/style';

import { IRoom } from '../../Types/rooms.type';
import { ListRoomUsers } from '../../Types/User';

import { getDateRoom } from '../../Utils/handleTime';
import { getRoomDetails, getRoomMembers } from '../../Service/Rooms';

import useUserProfile from '../../GlobalState/userProfile.zustand';
import useRoom from '../../GlobalState/room.zustand';
import { theme } from '../../Theme/theme';
import {
  isAmInTheRoom,
  isParticipatingInRoom,
  useRoomUtils,
} from '../../Utils/room.util';
import { getFollowing } from '../../Service/Followers';

interface RoomCardProps {
  openOption: () => void;
  userType: 'user' | 'admin';
  room: IRoom;
  onProfile?: boolean;
}

export default function RoomCard({
  onProfile,
  openOption,
  room,
  userType,
}: RoomCardProps) {
  const navigation = useNavigation<StackRoutes>();

  const [members, setMembers] = useState<ListRoomUsers[]>([]);
  const [friends, setFriends] = useState<ListRoomUsers[]>([]);

  const { participatingRoomsIds, setRoom } = useRoom();
  const { handleRequestRoom, handleDenyRequest, handleAddInRoom } =
    useRoomUtils();
  const [participei, setParticipei] = useState<boolean>(false);
  const [buttonRequest, setButtonRequest] = useState<boolean>(false);

  const [roomDetails, setRoomDetails] = useState<IRoom>();

  const { user } = useUserProfile();

  const getFriends = async () => {
    try {
      const response = await getFollowing(user.userId);
      setFriends(response.data.result);
    } catch (error) {
      console.log('Erro ao obter os membros da sala.', error);
    }
  };

  const getMembers = async () => {
    try {
      const response = await getRoomMembers(room?.room_id);
      setMembers(response.data.result);
    } catch (error) {
      console.log('Erro ao obter os membros da sala.', error);
    }
  };

  const getRoomDetail = async () => {
    try {
      const response = await getRoomDetails(room?.room_id);
      setRoomDetails(response.data.result);
    } catch (error) {
      console.log('Erro ao obter os detalhes da sala.', error);
    }
  };

  const commonFriendsAndMembers = friends.filter(friend =>
    members.some(
      member =>
        member.userId === friend.userId && member.userId !== user.userId,
    ),
  );
  const totalCommonElements = commonFriendsAndMembers.length;

  const userParticipates = isParticipatingInRoom(
    participatingRoomsIds,
    room.room_id,
  );

  function limitTextLength(text: string, maxLength: number) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + ' ...';
    }
    return text;
  }

  function handleNavigateToRoom() {
    setRoom(room);
    navigation.push('RoomCommunity', {
      Room: room,
      RoomId: room.room_id,
      UserType: userType,
    });
  }

  async function localHandleAddInRoom() {
    try {
      handleAddInRoom(room.room_id);
      setParticipei(true);
      handleNavigateToRoom();
    } catch (error) {
      console.log('deu ruim ao me incluir na sala.', error);
    }
  }

  async function localHandleRequestRoom() {
    try {
      await handleRequestRoom(room.room_id);
      setButtonRequest(true);
    } catch (error) {
      console.log(
        `deu ruim ao enviar solicitaçao para entrar na sala ${room.room_id}`,
        error,
      );
    }
  }

  async function localHandleDenyRequest() {
    try {
      await handleDenyRequest(room.room_id);
      setButtonRequest(false);
    } catch (error) {
      console.log(
        `deu ruim ao enviar solicitaçao para sair da sala ${room.room_id}`,
        error,
      );
    }
  }

  function limitNicknameLength(nickname: string, maxLength: number) {
    if (nickname?.length > maxLength) {
      return nickname.slice(0, maxLength) + '...';
    }
    return nickname;
  }

  async function imIn() {
    const response = await isAmInTheRoom(room.room_id, user.userName);
    setButtonRequest(response);
  }

  useFocusEffect(
    useCallback(() => {
      imIn();
    }, []),
  );

  useEffect(() => {
    getRoomDetail();
    getFriends();
    getMembers();
    imIn();
  }, []);

  return (
    <TouchableOpacity onPress={handleNavigateToRoom}>
      <Container source={{ uri: room?.image }}>
        <Shadow>
          <SalaHeader>
            <RowDirection style={{ gap: 12 }}>
              <RowDirection style={{ gap: 40, alignItems: 'flex-start' }}>
                <ColumnDirection style={{ marginRight: -15 }}>
                  <TextRegular12Light>Criador</TextRegular12Light>
                  <NormalTextLight style={{ lineHeight: 13 }}>
                    {getDateRoom(room?.created_at)}
                  </NormalTextLight>
                </ColumnDirection>

                <UserImage source={{ uri: room?.profileImage }} />
                <View style={{ marginLeft: -28 }}>
                  <BoldText>@{room?.userNickname}</BoldText>
                  <NormalText style={{ lineHeight: 15 }}>
                    {limitNicknameLength(room?.userName, 18)}
                  </NormalText>
                </View>
              </RowDirection>
            </RowDirection>
            <RowDirection style={{ gap: 10, alignItems: 'center' }}>
              {room?.public === 0 ? (
                <Image
                  defaultSource={require('../../Assets/Icons/roomlock.png')}
                  source={require('../../Assets/Icons/roomlock.png')}
                  style={{ width: 30, height: 30 }}
                />
              ) : (
                <Image
                  defaultSource={require('../../Assets/Icons/roomunlock.png')}
                  source={require('../../Assets/Icons/roomunlock.png')}
                  style={{ width: 30, height: 30 }}
                />
              )}
              {!onProfile && (
                <Icon
                  onPress={openOption}
                  name="ellipsis-vertical"
                  color={'#fff'}
                  size={20}
                  style={{ marginRight: -7 }}
                />
              )}
            </RowDirection>
          </SalaHeader>
          <View>
            <RowDirection>
              <View style={{ width: '68%' }}>
                <SalaTitle>{room?.room_name}</SalaTitle>
                <SalaDesc>{limitTextLength(room?.description, 60)}</SalaDesc>
              </View>
              <View style={{ width: 100 }}>
                {roomDetails?.temporaryRoom === 'true' && (
                  <>
                    <NormalText style={{ textAlign: 'right', marginTop: 8 }}>
                      {getDateRoom(roomDetails?.duration[0].start_datetime)}
                    </NormalText>
                    <NormalText
                      style={{
                        textAlign: 'right',
                        marginTop: 0,
                        marginBottom: 10,
                      }}>
                      até {'\n'}
                      {getDateRoom(roomDetails?.duration[0].end_datetime)}
                    </NormalText>
                  </>
                )}
              </View>
            </RowDirection>
            <SalaFooter>
              <View>
                <NormalText>{`${
                  /* totalCommonElements + 1 */ members.length
                } participante${totalCommonElements ? 's' : ''}`}</NormalText>
                <RowDirection marginTop={'8px'}>
                  {members
                    .filter(member => member.userId !== user.userId)
                    .slice(0, 4)
                    .map(member => (
                      <Participants
                        key={member.userId}
                        source={{ uri: member.profileImage, cache: 'reload' }}
                      />
                    ))}

                  {totalCommonElements >= 0 && room.userId !== user.userId && (
                    <NormalText style={{ marginLeft: 15, fontSize: 11 }}>
                      {!onProfile && totalCommonElements >= 1
                        ? `${totalCommonElements} amigo${
                            totalCommonElements > 1 ? 's' : ''
                          } em comum`
                        : 'Nenhum amigo em comum'}
                    </NormalText>
                  )}

                  {!onProfile && room.userId === user.userId && (
                    <NormalText
                      style={{
                        marginLeft: totalCommonElements === 0 ? 15 : 0,
                        fontSize: 11,
                      }}>
                      {totalCommonElements >= 1
                        ? `${totalCommonElements} amigo${
                            totalCommonElements > 1 ? 's' : ''
                          } em comum`
                        : 'Nenhum amigo em comum'}
                    </NormalText>
                  )}
                </RowDirection>
              </View>

              {!userParticipates &&
                room.public === 1 &&
                room.userId !== user.userId && (
                  <SalaButton
                    onPress={
                      !participei ? localHandleAddInRoom : handleNavigateToRoom
                    }>
                    <WhiteTextRoom>
                      {participei ? 'Entrar' : 'Participar'}
                    </WhiteTextRoom>
                  </SalaButton>
                )}

              {userParticipates ||
                (room.userId === user.userId && (
                  <SalaButton onPress={handleNavigateToRoom}>
                    <WhiteTextRoom>Entrar</WhiteTextRoom>
                  </SalaButton>
                ))}

              {room?.public === 0 &&
                !userParticipates &&
                room.userId !== user.userId && (
                  <SalaButton
                    color={buttonRequest && theme.secondaryColor}
                    onPress={
                      buttonRequest
                        ? localHandleDenyRequest
                        : localHandleRequestRoom
                    }>
                    <WhiteTextRoom color={buttonRequest && theme.primarycolor}>
                      {buttonRequest ? 'Solicitado' : 'Solicitar'}
                    </WhiteTextRoom>
                  </SalaButton>
                )}

              {userParticipates && room.userId !== user.userId && (
                <SalaButton onPress={handleNavigateToRoom}>
                  <WhiteTextRoom>Entrar</WhiteTextRoom>
                </SalaButton>
              )}
            </SalaFooter>
          </View>
        </Shadow>
      </Container>
    </TouchableOpacity>
  );
}
