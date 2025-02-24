/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';

import { theme } from '../../Theme/theme';

import Header from '../../Components/Header';
import SearchInput from '../../Components/SearchInput';
import UserInfoModal from '../../Components/UserInfoModal';
import ListUsersCard from '../../Components/ListUsersCard';
import {
  Container,
  SafeAreaViewContainer,
} from '../../Components/elementsComponents';

import { ListRoomUsers } from '../../Types/User';
import { getRoomMembers } from '../../Service/Rooms';
import useRoom from '../../GlobalState/room.zustand';

export default function RoomParticipants() {
  const { room } = useRoom();

  const [isLoading, setIsLoading] = useState(false);

  const [inputText, setInputText] = useState('');

  const [userInfoModal, setUserInfoModal] = useState(false);

  const [roomMembers, setRoomMembers] = useState<ListRoomUsers[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<ListRoomUsers[]>([]);

  const getMembersRoom = async () => {
    setIsLoading(true);
    try {
      const response = await getRoomMembers(room?.room_id);
      setRoomMembers(response.data.result);
      setFilteredMembers(response.data.result);
    } catch (error) {
      console.log('Erro listar membros da sala.', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMembersRoom();
  }, []);

  useEffect(() => {
    const filtered = roomMembers.filter(member =>
      member.userNickname.toLowerCase().includes(inputText.toLowerCase()),
    );
    setFilteredMembers(filtered);
  }, [inputText, roomMembers]);

  return (
    <SafeAreaViewContainer>
      <Container>
        <Header titleHeader="Participantes" />
        <View style={{ paddingHorizontal: 24 }}>
          <SearchInput
            marginTop="35px"
            marginBottom="20px"
            value={inputText}
            onSetText={setInputText}
          />
        </View>

        {isLoading ? (
          <ActivityIndicator color={theme.primarycolor} />
        ) : (
          <FlatList
            extraData={filteredMembers}
            data={filteredMembers}
            keyExtractor={item => 'participant' + item.userId}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <>
                <ListUsersCard
                  userNickname={item.userNickname}
                  userId={item.userId}
                  borderBottom
                  profileImage={item.profileImage}
                  userName={item.userNickname}
                  isFollowing={item.userId}
                  rightButton
                />
                <UserInfoModal
                  user={item}
                  setvisibleBottonModal={setUserInfoModal}
                  visibleBottonModal={userInfoModal}
                  userType={'participant'}
                />
              </>
            )}
          />
        )}
      </Container>
    </SafeAreaViewContainer>
  );
}
