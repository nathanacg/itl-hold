import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from "react-native"
import Header from '../../../Components/Header';
import {
    Container,
    SafeAreaViewContainer,
    ContentPage,
    ListSeparator,
    ContentPageExplore
} from '../../../Components/elementsComponents';

import {
    TextDetailmentPage,
    ContainerResultSeacrh,
    TextResultTotal,
    UndelineText,
    SeeMoreContainer,
    SugestionText
} from './style'

import SearchInput from '../../../Components/SearchInput';
import Button from '../../../Components/Button';
import { typeTheme } from '../../../Config/enumTheme';
// import friendImage from "../../Assets/Image/users.jpg"
import ProfileResultFinders from '../../../Components/ProfileResultFinders';
import { getFollowers } from '../../../Service/Followers';
import useUserProfile from '../../../GlobalState/userProfile.zustand';
import { ProfileUser } from '../../../Types/User';
import { getClosedFriend, removeClosedFriend } from '../../../Service/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface ListSelectedProfile extends ProfileUser {
    selected: boolean
}

export default function CloseFriendsLocked() {
    const [searchText, setSearchText] = useState<string>('')

    const [allSelected, setAllselected] = useState<ListSelectedProfile[]>([])
    const { user, initializeProfile } = useUserProfile()
    const [usersSelected, setUsersSelected] = useState<number[]>([])
    const [closedFriends, setclosedFriends] = useState<[]>([])
    const [buttonActive, setButtonActive] = useState<boolean>(false)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getClosedFriend(user.userId);
                if (Array.isArray(response)) {
                    setAllselected(response);
                } else {
                    console.log('Dados da resposta estão indefinidos ou no formato incorreto.');
                }
            } catch (error) {
                console.log('Erro ao listar seguidores:', error);
            }
        };

        fetchData();


    }, [user.userId]);




    const handleCheckBoxChange = (userId: number) => {


        setUsersSelected(prevUsersSelected => {
            const userIndex = prevUsersSelected.indexOf(userId);
            if (userIndex !== -1) {
                const updatedUsersSelected = [...prevUsersSelected];
                updatedUsersSelected.slice(userIndex, 1);
                return updatedUsersSelected;
            } else {
                return [...prevUsersSelected, userId];
            }
        });
    };

    const selectCloseFiend = async () => {

        try {

            for (let i = 0; i < usersSelected.length; i++) {
                await removeClosedFriend(usersSelected[i]);
            }

            setUsersSelected([]);
            setAllselected([])
            AsyncStorage.setItem('selectedUsers', JSON.stringify([])).catch(error => {
                console.log('Erro ao salvar usuários selecionados:', error);
            });
        } catch (error: any) {
            console.warn("close friend", error)
        } finally {
            const response = await getClosedFriend(user.userId);
            setAllselected(response)
            // setAllselected(prevAllSelected => {
            //     return prevAllSelected.filter(user => !usersSelected.includes(user.userId));
            // });
        }
    };

    return (
        <SafeAreaViewContainer>
            <Header
                titleHeader='Amigos próximos'
            />
            <ContentPageExplore>
                <TextDetailmentPage>
                    Somente estes amigos podem ver a publicação e sabem que fazem parte desta sua lista, pois a postagem estará diferenciada.
                    Eles não conseguem visualizar os integrantes, somente você sabe.
                </TextDetailmentPage>
            </ContentPageExplore>
            <FlatList
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={

                    <Text style={{ marginLeft: 28 }}>Sem amigos próximos para adicionar.</Text>

                }
                data={allSelected}
                renderItem={({ item }) => (
                    <ProfileResultFinders
                        userNickname={item.userNickname}
                        activeButton={false}
                        name={item.userName}
                        lastName={item.userNickname}
                        profileImage={item.profileImage}
                        typeAction='cheInFor'
                        check={item.selected}
                        onCheckBoxChange={handleCheckBoxChange}
                        id={item.userId}
                    />
                )}
            />
            {usersSelected.length > 0 && < Button pressFunction={() => selectCloseFiend()} textButton="Remover" typebutton={typeTheme.default} />}
        </SafeAreaViewContainer>
    );
};
