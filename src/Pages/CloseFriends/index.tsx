import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native"
import Header from '../../Components/Header';

import {
    Container,
    SafeAreaViewContainer,
    ContentPage,
    ListSeparator,
    ContentPageExplore,
    Text500
} from '../../Components/elementsComponents';

import {
    TextDetailmentPage,
    ContainerResultSeacrh,
    TextResultTotal,
    UndelineText,
    SeeMoreContainer,
    SugestionText,
    BorderWidth,
    TextDetailmentPageClose
} from './style'

import SearchInput from '../../Components/SearchInput';
import Button from '../../Components/Button';
import { typeTheme } from '../../Config/enumTheme';
// import friendImage from "../../Assets/Image/users.jpg"
import ProfileResultFinders from '../../Components/ProfileResultFinders';
import { getFollowers, getFollowing } from '../../Service/Followers';
import useUserProfile from '../../GlobalState/userProfile.zustand';
import { ProfileUser } from '../../Types/User';
import { addClosedFriend, getClosedFriend, removeClosedFriend } from '../../Service/Profile';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { StackRoutes } from '../../Routes/StackTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fontStyle, theme } from '../../Theme/theme';
import { colors } from 'react-native-elements';
import { ContentCentered } from '../../Components/Informationsform';
import { ScrollView } from 'react-native-gesture-handler';
import { TextRegular12Center } from '../../Components/configurationsElemetsStyle';

interface ListSelectedProfile extends ProfileUser {
    selected: boolean
}



export default function CloseFriends() {
    const navigation = useNavigation<StackRoutes>();
    // const [searchText, setSearchText] = useState<string>('')

    const [allSelected, setAllselected] = useState<ListSelectedProfile[]>([])
    const [notClose, setNotClose] = useState<ListSelectedProfile[]>([])
    const [followers, setFollowers] = useState<ListSelectedProfile[]>([])
    const [initialState, setInitialState] = useState<ListSelectedProfile[]>([])
    const [compareProfiles, setCompareProfiles] = useState<[]>([])
    const { user, initializeProfile } = useUserProfile()
    const [usersSelected, setUsersSelected] = useState<number[]>([])
    const [inputText, setInputText] = useState<string>('')
    const [btnAdd, setBtnAdd] = useState<boolean>(false)
    const [btnRemove, setBtnRemove] = useState<boolean>(false)




    const handleCheckBoxChange = (userId: number) => {
        setNotClose(prev => {
            const list = [...prev]
            const index = list.findIndex((item) => item.userId == userId)
            if (index > -1) {
                list[index].selected = !list[index].selected
                setBtnAdd(true)
            }
            return list
        })
        setAllselected(prev => {
            const list = [...prev]
            const index = list.findIndex((item) => item.userId == userId)
            if (index > -1) {
                list[index].selected = !list[index].selected
                setBtnRemove(true)
            }
            return list
        })
    };


    const ReloadFriend = async () => {
        let list: ListSelectedProfile[] = [...followers]
        getClosedFriend(user.userId)
            .then((res) => {
                res.map((itemSelected: ProfileUser) => {
                    const userIndex = list.findIndex((item) => item.userId === itemSelected.userId)
                    if (userIndex > -1) {
                        list[userIndex].selected = true
                    }
                })
                setNotClose(list.filter(item => !item.selected))

                setAllselected(list.filter(item => item.selected))

            })
            .catch((error) => {
                console.log('ERRO ao listar seguidores: ', error);
            });
    }

    const removeAll = async () => {
        allSelected.map(async (user) => {
            await removeClosedFriend(user.userId)
        })
        setAllselected([])

    }

    const selectCloseFriend = async () => {
        try {

            setAllselected(prevAllSelected => {
                return prevAllSelected.filter(user => !usersSelected.includes(user.userId));
            });

            setNotClose(prevAllSelected => {
                return prevAllSelected.filter(user => !usersSelected.includes(user.userId));
            });

            const object = [...allSelected, ...notClose]

            object.map(async (item) => {

                if (item.selected) {
                    await addClosedFriend(item.userId);
                } else {

                    await removeClosedFriend(item.userId)
                }
            })

            AsyncStorage.setItem('selectedUsers', JSON.stringify([])).catch(error => {
                console.log('Erro ao salvar usuários selecionados:', error);
            });

            navigation.pop();
        } catch (error) {
            Alert.alert("Erro ao alterar sobre amigos proximos")
        }
    };

    useEffect(() => {
        getFollowers(user.userId)
            .then(res => {
                let list: ListSelectedProfile[] = []
                list = res.data.result.map((item: ProfileUser) => {
                    const data: ListSelectedProfile = {
                        selected: false,
                        ...item
                    }
                    return data
                })
                setFollowers(list)
                setInitialState(list)
            })
            .catch((error) => {
                console.log('ERRO ao listar seguidores: ', error);
            });
    }, []);

    useEffect(() => {
        (async () => {
            if (followers) {
                await ReloadFriend()
            }
        })()
    }, [followers])


    function filteredUsers() {
        const regex = new RegExp(inputText, 'i');
        return notClose.filter(function (pessoa) {
            return regex.test(pessoa.userName) || regex.test(pessoa.userNickname)
        });
    }


    const sortedData = filteredUsers().sort((a, b) => a.userName.localeCompare(b.userName))

    const memoList = useMemo(() => {
        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => "close" + item.userId}
                style={{ marginTop: -5, marginBottom: 10, height: "auto" }}
                data={sortedData}
                scrollEnabled={false}
                ListEmptyComponent={<>
                    {notClose.length == 0 && allSelected.length == 0 && (
                        <Text style={{ marginLeft: 32, marginTop: 35, fontFamily: fontStyle.light, fontSize: 13 }}>Você precisa possuir seguidores para adicionar{'\n'} amigos próximos</Text>
                    )}
                </>
                }
                renderItem={({ item }) => (
                    <ProfileResultFinders
                        name={item.userName}
                        lastName={item.userNickname}
                        userNickname={''}
                        profileImage={item.profileImage}
                        typeAction='cheInFor'
                        check={item.selected}
                        onCheckBoxChange={handleCheckBoxChange}
                        id={item.userId}
                        activeButton={false}
                    />
                )}
            />
        )
    }, [notClose, inputText, allSelected])

    const sortedDataSelected = allSelected.sort((a, b) => a.userName.localeCompare(b.userName))


    const memoClose = useMemo(() => {
        return (
            <>{
                allSelected.length > 0 && (
                    < FlatList
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => "close" + item.userId
                        }
                        scrollEnabled={false}
                        style={{ marginTop: 5, marginBottom: 10, height: "auto" }}
                        data={sortedDataSelected}
                        ListEmptyComponent={
                            < Text style={{ marginLeft: 38, marginTop: 20, fontFamily: fontStyle.light, fontSize: 13 }}> Sem amigos próximos para adicionar.</Text >
                        }
                        renderItem={({ item }) => (
                            <ProfileResultFinders
                                name={item.userName}
                                lastName={item.userNickname}
                                userNickname={''}
                                profileImage={item.profileImage}
                                typeAction='cheInFor'
                                check={item.selected}
                                onCheckBoxChange={handleCheckBoxChange}
                                id={item.userId}
                                activeButton={false}
                            />
                        )}
                    />
                )
            }</>
        )
    }, [allSelected])
    const cleanData = useCallback(() => {
        setNotClose(prevAllSelected => {
            return initialState.map(key => {
                return {
                    ...key,
                    selected: false
                }
            })
        });
    }, [initialState])

    const cleanAddAllData = useCallback(() => {
        setAllselected(prevAllSelected => {
            return initialState.map(key => {
                return {
                    ...key,
                    selected: true
                }
            })
        });
        setNotClose([]);
    }, [initialState])

    return (
        <SafeAreaViewContainer >
            <Header
                titleHeader='Amigos próximos'
            />
            <ContentCentered>
                <>
                    <TextDetailmentPageClose>
                        Somente estes amigos podem ver a publicação e sabem o que fazem parte desta sua lista, pois a postagem estará diferenciada. Eles não conseguem visualizar os integrantes, somente você sabe.
                    </TextDetailmentPageClose>
                    <SearchInput
                        marginTop='17px'
                        onSetText={setInputText}
                        value={inputText}
                    />
                </>

                {allSelected.length > 0 && (
                    <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                        <TextDetailmentPage>
                            {allSelected.length} {allSelected.length > 1 ? 'pessoas' : 'pessoa'}
                        </TextDetailmentPage>
                        <TouchableOpacity onPress={async () => {
                            await removeAll()
                            cleanData()
                        }}>
                            <TextDetailmentPage style={{
                                color: theme.textDark
                            }}>
                                Remover tudo
                            </TextDetailmentPage>
                        </TouchableOpacity>

                    </View>
                )}


            </ContentCentered>


            <ScrollView showsVerticalScrollIndicator={false}>
                {memoClose}
                <View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: "space-between",
                        alignItems: 'center'
                    }}>
                        {notClose.length > 0 && (
                            <>
                                <TextRegular12Center marginBottom={3} marginTop={15}>Sugestões</TextRegular12Center>
                                <TouchableOpacity
                                    style={{
                                        marginBottom: 10,
                                        marginTop: 13,
                                        marginRight: 30
                                    }}
                                    onPress={async () => {
                                        cleanAddAllData()
                                    }}>
                                    <TextDetailmentPage style={{
                                        color: theme.textDark
                                    }}>
                                        Selecionar todos
                                    </TextDetailmentPage>
                                </TouchableOpacity>
                            </>
                        )}

                    </View>
                </View>
                {memoList}
            </ScrollView>



            <Button pressFunction={() => selectCloseFriend()} textButton={"Concluir"} typebutton={typeTheme.default} />



            {/* {!buttonActive && <Button pressFunction={() => selectCloseFriend()} textButton={"Ver Melhores Amigos"} typebutton={typeTheme.default} />} */}
        </SafeAreaViewContainer >
    );
};
