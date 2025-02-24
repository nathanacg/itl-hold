/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, View, FlatList } from 'react-native';

import { theme } from '../../Theme/theme';
import { TopContainer } from './style';

import {
  Container,
  SafeAreaViewContainer,
} from '../../Components/elementsComponents';
import { TextLightGray } from '../../Components/configurationsElemetsStyle';

import { ContainerSearch } from '../Search/style';

import Header from '../../Components/Header';
import RoomCard from '../../Components/RoomCard';
import SearchInput from '../../Components/SearchInput';
import RoomOptionModal from '../../Components/RoomOptionsModal';

import CategoriesFilterPublications from '../../Components/CategoriesFilterPublications';

import { IRoom } from '../../Types/rooms.type';

import useUserProfile from '../../GlobalState/userProfile.zustand';

import { getRoomsList } from '../../Service/Rooms';
import { ContainerPage } from '../CommonQuestions/style';
import useRoom from '../../GlobalState/room.zustand';
import { useFocusEffect } from '@react-navigation/native';

export default function Rooms() {
  const { user } = useUserProfile();

  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [isUserAdmin, setIsUserAdmin] = useState<boolean>(false);

  const [inputValue, setInputValue] = useState('');
  const [optionsModalOpen, setOptionsModalOpen] = useState(false);

  const [roomsList, setRoomsList] = useState<IRoom[]>([]);
  const [filteredRoomsList, setFilteredRoomsList] = useState<IRoom[]>([]);

  const [selectedCategories, setSelectedCategories] = useState<string>('');
  const { populateParticipatingRoomsIds } = useRoom();
  const [isLoading, setIsLoading] = useState(false);

  const getRooms = async () => {
    setIsLoading(true);
    try {
      const response = await getRoomsList();
      setRoomsList(response.data.result.reverse());
      setFilteredRoomsList(response.data.result);
    } catch (error) {
      console.log('Deu ruim ao listar as salas.', error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getRooms();
      populateParticipatingRoomsIds();
    }, []),
  );

  useEffect(() => {
    getRooms();
    populateParticipatingRoomsIds();
  }, []);

  useEffect(() => {
    const filteredList = roomsList.filter(room => {
      return (
        room.room_name.toLowerCase().includes(inputValue.toLowerCase()) ||
        room.description.toLowerCase().includes(inputValue.toLowerCase())
      );
    });

    setFilteredRoomsList(filteredList);
  }, [inputValue, roomsList]);

  useEffect(() => {
    let typesroom: {
      podcasts: string;
      movies: string;
      books: string;
      musics: string;
      series: string;
    } = {
      podcasts: 'Podcasts',
      movies: 'Filmes',
      books: 'Livros',
      musics: 'Músicas',
      series: 'Séries',
    };
    if (selectedCategories === 'Ver todos') {
      setFilteredRoomsList(roomsList);
    } else {
      const filterRoom = roomsList.filter(
        room => typesroom[room.categories.split(',')[0]] == selectedCategories,
      );
      setFilteredRoomsList(filterRoom);
    }
  }, [selectedCategories]);

  return (
    <SafeAreaViewContainer>
      <Container>
        <Header isFromRooms titleHeader="         Salas" />
        <TopContainer>
          <ContainerSearch>
            <SearchInput
              placeholder="Pesquisar..."
              value={inputValue}
              onSetText={setInputValue}
              marginBottom="20px"
            />
          </ContainerSearch>

          <CategoriesFilterPublications
            advancedFiltersButton
            onPressCategoryButton={category => {
              setSelectedCategories(category);
            }}
            styleCategoryContent={{
              minWidth: 15,
              padding: 20,
              height: 32,
            }}
            categories={[
              'Ver todos',
              'Filmes',
              'Séries',
              'Livros',
              'Músicas',
              'Artigos',
              'Podcasts',
            ]}
          />
        </TopContainer>

        {isLoading ? (
          <ActivityIndicator
            style={{ marginTop: '50%' }}
            size={'small'}
            color={theme.primarycolor}
          />
        ) : (
          <ContainerPage>
            <FlatList
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              keyExtractor={item => 'room' + item.room_id}
              contentContainerStyle={{ marginTop: 16, gap: 16 }}
              data={filteredRoomsList}
              extraData={filteredRoomsList}
              renderItem={({ item }) => (
                <RoomCard
                  key={item.room_id}
                  userType={item.userId === user.userId ? 'admin' : 'user'}
                  room={item}
                  openOption={() => {
                    setIsUserAdmin(item.userId == user.userId ? true : false);
                    setSelectedRoomId(item.room_id);
                    setOptionsModalOpen(!optionsModalOpen);
                  }}
                />
              )}
              ListEmptyComponent={
                <>
                  {isLoading && (
                    <View style={{ marginTop: 70 }}>
                      <TextLightGray textAlign={'center'}>
                        Nenhuma sala encontrada.
                      </TextLightGray>
                    </View>
                  )}
                </>
              }
            />
          </ContainerPage>
        )}
      </Container>
      <RoomOptionModal
        salaParticipant
        setvisibleBottonModal={() => setOptionsModalOpen(!optionsModalOpen)}
        visibleBottonModal={optionsModalOpen}
        roomId={selectedRoomId}
        myProfile={isUserAdmin}
      />
    </SafeAreaViewContainer>
  );
}
