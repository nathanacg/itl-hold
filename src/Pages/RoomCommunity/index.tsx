/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  View,
} from 'react-native';

import { fontStyle, theme } from '../../Theme/theme';
import {
  BoldText,
  ButtonText,
  DateText,
  Header,
  NormalText,
  ParticipantsContainer,
  PublicContainer,
  RoomComunityContainer,
  RowDirection,
  SalaButton,
  Shadow,
  SmallText,
  TextContainer,
} from './style';

import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Post from '../../Components/Post';
import Private from '../../Components/Private';
import UserOptions from './Components/UserOption';
import AdminOptions from './Components/AdminOptions';
import { UserImage } from '../../Components/RoomCard/style';
import ConfirmModalRoom from '../../Components/ConfirmModalRoom';
import { SafeAreaViewContainer } from '../../Components/elementsComponents';
import {
  SemiBoldText,
  TextLightGray,
  TextRegular11,
} from '../../Components/configurationsElemetsStyle';

import useFeedData from '../../GlobalState/feed.zustand';
import useRoom from '../../GlobalState/room.zustand';

import { ListRoomUsers } from '../../Types/User';
import useUserProfile from '../../GlobalState/userProfile.zustand';
import { ListFollowers } from '../MyFollowers/Components/Following';

import { IRoom, RoomType } from '../../Types/rooms.type';
import { AllTypesPostsFeed } from '../../Types/discriminator';

import { getRoomFeed } from '../../Service/Feed';
import { getFollowing } from '../../Service/Followers';
import { getRoomDetails, getRoomMembers } from '../../Service/Rooms';

import { useSocket } from '../../context/socket';
import { StackRoutes } from '../../Routes/StackTypes';
import {
  isAmInTheRoom,
  isParticipatingInRoom,
  useRoomUtils,
} from '../../Utils/room.util';
import { RoomLocationEnum } from '../../enum';

export default function RoomCommunity() {
  const route = useRoute();
  const { user } = useUserProfile();
  const { setRoom, participatingRoomsIds } = useRoom();
  const { handleRequestRoom, handleDenyRequest, handleAddInRoom } =
    useRoomUtils();
  const { loadingFeed } = useFeedData();
  const {
    verifyGroupChat,
    verifyRoomLive,
    listPartipantsLive,
    currentGroupChat,
    handleParticipantId,
  } = useSocket();
  const navigation = useNavigation<StackRoutes>();

  const params = (route.params as {
    from: string;
    UserType: 'admin' | 'user';
    Room: IRoom;
    RoomId: number;
  }) || { RoomId: 0, Room: null };

  const [roomData, setRoomData] = useState(params.Room);
  const [roomDetails, setRoomDetails] = useState<RoomType | null>(null);

  const getDetailRoom = async () => {
    try {
      const response = await getRoomDetails(params.RoomId);
      setRoomDetails(response.data.result);
      setRoomData(response.data.result);
    } catch (error) {
      console.log('Erro ao buscar detalhes da sala.', error);
    }
  };

  const parseDateInit = new Date(
    roomDetails?.duration
      ? roomDetails?.duration[0].start_datetime
      : '0000-00-00T00:00:00.000z',
  );
  const parseDateEnd = new Date(
    roomDetails?.duration
      ? roomDetails?.duration[0].end_datetime
      : '0000-00-00T00:00:00.000z',
  );
  const dateInit = `${
    parseDateInit.getDate() < 10
      ? '0' + parseDateInit.getDate()
      : parseDateInit.getDate()
  }/${
    parseDateInit.getMonth() + 1 < 10
      ? '0' + (parseDateInit.getMonth() + 1)
      : parseDateInit.getMonth() + 1
  }/${parseDateInit.getFullYear().toString().slice(2, 4)}`;
  const dateEnd = `${
    parseDateEnd.getDate() < 10
      ? '0' + parseDateEnd.getDate()
      : parseDateEnd.getDate()
  }/${
    parseDateEnd.getMonth() + 1 < 10
      ? '0' + (parseDateEnd.getMonth() + 1)
      : parseDateEnd.getMonth() + 1
  }/${parseDateEnd.getFullYear().toString().slice(2, 4)}`;
  const hoursInit = `${
    parseDateInit.getHours() < 10
      ? '0' + parseDateInit.getHours()
      : parseDateInit.getHours()
  }:${
    parseDateInit.getMinutes() < 10
      ? '0' + parseDateInit.getMinutes()
      : parseDateInit.getMinutes()
  }`;
  const hoursEnd = `${
    parseDateEnd.getHours() < 10
      ? '0' + parseDateEnd.getHours()
      : parseDateEnd.getHours()
  }:${
    parseDateEnd.getMinutes() < 10
      ? '0' + parseDateEnd.getMinutes()
      : parseDateEnd.getMinutes()
  }`;

  const [optionModal, setOptionModal] = useState(false);
  const [optionModalPart, setOptionModalPart] = useState(false);
  const [memberList, setMemberList] = useState<ListRoomUsers[]>([]);
  const [friends, setFriends] = useState<ListFollowers[]>([]);
  const [listPost, setListPost] = useState<AllTypesPostsFeed[]>([]);
  //   const isPublicationDisabled = Boolean(room);
  const [isPublicationDisabled, setIsPublicationDisabled] =
    useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isPrivateRoomEntrySolicited, setIsPrivateRoomEntrySolicited] =
    useState<boolean>(false);

  const getMembersList = async () => {
    try {
      const response = await getRoomMembers(roomData.room_id);
      setMemberList(response.data.result);
    } catch (error) {
      console.log('Erro ao obter os membros da sala.', error);
    }
  };

  const getFriends = async () => {
    try {
      const response = await getFollowing(user.userId);
      setFriends(response.data.result);
    } catch (error) {
      console.log('Erro ao obter os membros da sala.', error);
    }
  };

  // useEffect(() => {
  //   navigation.addListener('focus', () => {});
  //   return () => {
  //     navigation.removeListener('focus', () => {});
  //   };
  // }, [navigation]);

  // useEffect(() => {
  //   getDetailRoom();
  //   if (roomData && roomData.room_id) {
  //     getFeed();
  //     getInRoom();
  //     getFriends();
  //     getMembersList();
  //     setRoom(roomData);
  //     handleParticipantId(roomData?.room_id);
  //   }
  // }, [roomData?.room_id, navigation, room]);

  const getFeed = async () => {
    const response = await getRoomFeed(roomData.room_id);
    setListPost(response.data);
  };

  function limitTextLength(text: string, maxLength: number) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + ' ...';
    }
    return text;
  }

  const commonFriendsAndMembers = friends.filter(friend =>
    memberList.some(member => member.userId === friend.userId),
  );
  const userParticipates = isParticipatingInRoom(
    participatingRoomsIds,
    roomData.room_id,
  );

  // useEffect(() => {
  //   (async () => {
  //     await populateParticipatingRoomsIds();
  //     setUserParticipates(
  //       isParticipatingInRoom(participatingRoomsIds, roomData.room_id),
  //     );
  //   })()
  // }, [participatingRoomsIds]);

  const totalCommonElements = commonFriendsAndMembers.length;

  const localHandleParticipar = async () => {
    setIsLoading(true);
    try {
      handleAddInRoom(roomData.room_id);
    } catch (error) {
      console.log('deu ruim ao participar da sala.', error);
    } finally {
      setIsLoading(false);
    }
  };

  async function localHandleRequestRoom() {
    try {
      await handleRequestRoom(roomData.room_id);
      setIsPrivateRoomEntrySolicited(true);
    } catch (error) {
      console.log(
        `deu ruim ao enviar solicitaçao para se inserir na sala ${roomData.room_id}`,
        error,
      );
      return;
    }
  }

  async function localHandleDenyRequest() {
    try {
      await handleDenyRequest(roomData.room_id);
      setIsPrivateRoomEntrySolicited(false);
    } catch (error) {
      console.log(
        `deu ruim ao enviar solicitaçao para sair da sala ${roomData.room_id}`,
        error,
      );
    }
  }

  const handleScroll = (event: {
    nativeEvent: { contentOffset: { y: number } };
  }) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const targetPosition = 1600;
    if (
      currentOffset > targetPosition &&
      !userParticipates &&
      !optionModalPart
    ) {
      setOptionModalPart(true);
    } else if (currentOffset < targetPosition && optionModalPart) {
      setOptionModalPart(false);
    }
  };

  function handleBack() {
    if (params?.from === RoomLocationEnum.FROM_POST) {
      navigation.goBack();
    } else if (params?.from === RoomLocationEnum.FROM_ROOM_CREATION) {
      navigation.navigate('TabNavigation', { screen: 'RoomsList' });
    } else {
      navigation.pop();
    }
    setRoom(null);
  }

  function handleOnPressAddPublication() {
    setIsPublicationDisabled(true);
    navigation.push('Publication', { idRoom: roomData.room_id });
  }

  function handleDeletePost() {
    getFeed();
  }

  async function imIn(roomId: number) {
    const response = await isAmInTheRoom(roomId, user.userName);
    setIsPrivateRoomEntrySolicited(response);
  }

  useFocusEffect(
    useCallback(() => {
      setIsPublicationDisabled(false);
      getFeed();
    }, []),
  );

  useEffect(() => {
    getDetailRoom();
    if (roomData) {
      imIn(roomData.room_id);
      getFeed();
      // getInRoom();
      getFriends();
      getMembersList();
      setRoom(roomData);
      handleParticipantId(roomData?.room_id);
      verifyGroupChat(roomData.room_id, roomData.userId);
      if (currentGroupChat) {
        verifyRoomLive(
          parseInt(currentGroupChat.chatRoomId),
          currentGroupChat.userId,
        );
      }
    }
  }, []);

  return (
    <SafeAreaViewContainer>
      <RoomComunityContainer>
        <FlatList
          onScroll={handleScroll}
          refreshControl={
            <RefreshControl
              progressViewOffset={25}
              refreshing={loadingFeed}
              onRefresh={getFeed}
            />
          }
          ListHeaderComponent={
            <>
              <Header source={{ uri: roomData?.image }}>
                <Shadow>
                  <RowDirection>
                    <Entypo
                      onPress={handleBack}
                      name="chevron-left"
                      color={theme.secondaryColor}
                      size={30}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                      }}>
                      {!userParticipates && roomData?.public === 1 ? (
                        <SalaButton
                          style={{ backgroundColor: theme.primarycolor }}
                          onPress={localHandleParticipar}>
                          <ButtonText>
                            {isLoading ? (
                              <ActivityIndicator size={'small'} />
                            ) : (
                              'Participar'
                            )}
                          </ButtonText>
                        </SalaButton>
                      ) : userParticipates ? (
                        <SalaButton
                          style={{
                            backgroundColor:
                              listPartipantsLive.length > 0
                                ? theme.dangerColor
                                : theme.lightGray,
                          }}
                          onPress={() =>
                            navigation.push('RoomLive', { Room: roomData })
                          }>
                          <ButtonText>Live</ButtonText>
                        </SalaButton>
                      ) : (
                        <></>
                      )}

                      {!isPrivateRoomEntrySolicited &&
                      roomData?.public === 0 &&
                      user.userId !== roomData?.userId ? (
                        <SalaButton
                          style={{ backgroundColor: theme.primarycolor }}
                          onPress={localHandleRequestRoom}>
                          <ButtonText>Solicitar</ButtonText>
                        </SalaButton>
                      ) : isPrivateRoomEntrySolicited &&
                        roomData?.public === 0 &&
                        user.userId !== roomData?.userId ? (
                        <SalaButton
                          style={{ backgroundColor: theme.secondaryColor }}
                          onPress={localHandleDenyRequest}>
                          <ButtonText color={theme.primarycolor}>
                            Solicitado
                          </ButtonText>
                        </SalaButton>
                      ) : (
                        <></>
                      )}

                      <Entypo
                        onPress={() => setOptionModal(true)}
                        name="dots-three-vertical"
                        color={theme.secondaryColor}
                        size={25}
                      />
                    </View>
                  </RowDirection>
                  <View>
                    <TextContainer>
                      <View style={{ width: '60%' }}>
                        <BoldText>{roomData.room_name}</BoldText>
                        <NormalText>
                          {limitTextLength(roomData.description, 180)}
                        </NormalText>
                      </View>
                      <View
                        style={{
                          width: 95,
                          marginRight: 10,
                          alignSelf: 'center',
                        }}>
                        {roomDetails?.temporaryRoom === 'true' && (
                          <>
                            <View
                              style={{
                                flexDirection: 'row',
                                gap: 8,
                                justifyContent: 'flex-end',
                              }}>
                              <DateText
                                fontFamily={fontStyle.semiBold}
                                lineHeight={'14px'}>
                                Início
                              </DateText>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                              }}>
                              <DateText>{dateInit}</DateText>
                              <DateText> - {hoursInit}</DateText>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                gap: 8,
                                justifyContent: 'flex-end',
                                marginTop: 10,
                              }}>
                              <DateText
                                fontFamily={fontStyle.semiBold}
                                lineHeight={'14px'}>
                                Fim
                              </DateText>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                              }}>
                              <DateText>{dateEnd}</DateText>
                              <DateText> - {hoursEnd}</DateText>
                            </View>
                          </>
                        )}
                      </View>
                    </TextContainer>
                  </View>
                  <RowDirection>
                    <ParticipantsContainer>
                      <View style={{ marginBottom: 10, gap: 13 }}>
                        <NormalText fontsize="12px" style={{ marginLeft: -6 }}>
                          {memberList.length > 1
                            ? memberList.length + ' participantes'
                            : memberList.length + ' participante'}
                        </NormalText>

                        <ParticipantsContainer>
                          {memberList.slice(0, 4).map(member => (
                            <UserImage
                              key={member.userId}
                              source={{ uri: member.profileImage }}
                            />
                          ))}
                          {totalCommonElements > 0 && (
                            <SmallText style={{ marginLeft: 7, fontSize: 10 }}>
                              {totalCommonElements > 1
                                ? totalCommonElements + ' amigos em comum'
                                : '1 amigo em comum'}
                            </SmallText>
                          )}
                        </ParticipantsContainer>
                      </View>
                    </ParticipantsContainer>
                  </RowDirection>
                </Shadow>
              </Header>

              {(roomData?.userId === user.userId || roomData?.public === 1) &&
                userParticipates && (
                  <PublicContainer>
                    <Pressable
                      disabled={isPublicationDisabled}
                      onPress={handleOnPressAddPublication}>
                      <Ionicons
                        name="add-circle"
                        color={theme.primarycolor}
                        size={40}
                      />
                    </Pressable>
                    <SemiBoldText>Publicar</SemiBoldText>
                  </PublicContainer>
              )}
            </>
          }
          showsVerticalScrollIndicator={false}
          keyExtractor={item => 'post' + item.postHexId}
          data={!userParticipates ? listPost.slice(0, 3) : listPost}
          renderItem={({ item, index }) => (
            <>
              {index === 0 && <View style={{ marginTop: 10 }} />}
              {(roomData?.public === 0 && roomData?.userId === user.userId) ||
              roomData?.public === 1 ? (
                <Post
                  index={index}
                  link={item.link}
                  postColor={item.postColor}
                  isSaved={item.isSaved}
                  repostEnabled={false}
                  Actions
                  hiddenPostLegend={!!item.postColor}
                  mediaImage={item.medias ? item.medias[0]?.mediaUrl : ''}
                  postCategorie={item.postCategorie}
                  isClosed={item.isClosed}
                  userNickname={item.userNickname}
                  profileImage={item.profileImage}
                  roomId={roomData.room_id}
                  postActions
                  postSpoiler={item.postSpoiler}
                  showLikes={!!item.show_likes}
                  markedUsers={item.markedUsers}
                  postDate={item.postDate}
                  onDeleteAfterHandler={handleDeletePost}
                  hasSpoiler={item.postSpoiler === 1}
                  medias={item.medias || ''}
                  postLegend={item.postLegend || ''}
                  avaliationPost={item.postEvaluation}
                  paddingTop={item.postColor ? '10px' : '0px'}
                  postHexId={item.postHexId}
                  userId={item.userId}
                  followingUser={item.followingUser}
                  tmdbMovieId={item.tmdbMovieId}
                  postId={item.postId}
                  isArquivaded={item.isArquived}
                />
              ) : (
                <Private
                  title="Sala fechada"
                  text="Solicite para participar e"
                  textSecond=" tenha acesso ao conteúdo."
                />
              )}
            </>
          )}
          ListEmptyComponent={
            <>
              {(roomData?.public === 0 && roomData?.userId === user.userId) ||
              roomData?.public === 1 ? (
                <View
                  style={{
                    justifyContent: 'center',
                    marginTop: 100,
                    alignItems: 'center',
                  }}>
                  <Icon name="post" size={80} color={theme.textligthGray} />
                  <TextRegular11>Nenhuma publicação</TextRegular11>
                  <TextLightGray>
                    Seja o primeiro a criar conteúdo
                  </TextLightGray>
                </View>
              ) : (
                <Private
                  title="Sala fechada"
                  text="Solicite para participar e"
                  textSecond=" tenha acesso ao conteúdo."
                />
              )}
            </>
          }
        />
      </RoomComunityContainer>
      {user.userId === roomData?.userId ? (
        <AdminOptions
          navigate={() => navigation.navigate('RoomInfo')}
          visibleBottonModal={optionModal}
          roomImage={roomData.image}
          room={roomData}
          setvisibleBottonModal={setOptionModal}
        />
      ) : (
        <UserOptions
          visibleBottonModal={optionModal}
          setvisibleBottonModal={setOptionModal}
          isAmParticipating={userParticipates}
          room={roomData}
        />
      )}

      <ConfirmModalRoom
        setvisibleBottonModal={setOptionModalPart}
        isModalVisible={optionModalPart}
        text="Para ter acesso a todo conteúdo, participe da sala."
        title={'Quer ver mais?'}
        icon={'eye'}
        onCancel={() => setOptionModalPart(false)}
        onConfirm={() => {
          localHandleParticipar();
          setOptionModalPart(false);
        }}
      />
    </SafeAreaViewContainer>
  );
}
