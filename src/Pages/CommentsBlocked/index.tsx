import { useEffect, useState } from 'react';

import {
    Container,
    SafeAreaViewContainer,
    ContentPageBlocked
} from '../../Components/elementsComponents';
import Header from '../../Components/Header';
import SearchInput from '../../Components/SearchInput';
import AccountActionResult from '../../Components/AccountActionResult';
import { FlatList, View } from 'react-native';
import { ProfileUser } from '../../Types/User';
import { addBlockComments, deleteBlockComments, findFriends, getBlockComments } from '../../Service/Profile';


export default function CommentsBlocked() {
    const [usersBlocked, setUsersBlocked] = useState<ProfileUser[]>([])
    const [searchResults, setSearchResults] = useState<ProfileUser[]>([])
    const [inputValue, setInputValue] = useState<string>("")

    const getCommentsBlocked = async () => {
        try {
            const response = await getBlockComments()
            setUsersBlocked(response.data.data.friends)
        } catch (error) {
            console.error('Erro ao buscar itens arquivados', error);
        }
    }

    useEffect(() => {
        getCommentsBlocked()
    }, [usersBlocked])

    const delBlockComment = async (IdUser: number) => {
        try {
            deleteBlockComments(IdUser)
            getCommentsBlocked()
        } catch (error) {
            console.log('Erro ao buscar comentarios bloqueados', error)
        }
    }

    useEffect(() => {
        if (inputValue.length > 0) {
            findFriends(inputValue)
                .then((response) => {
                    setSearchResults(response.data)
                })
                .catch((error) => {
                    console.log('deu erro ao buscar pessoas para bloquear', error);
                });
        } else {

            setSearchResults([])
        }
    }, [inputValue])

    const addBlockCommentsPerson = async (IdUser: number) => {
        try {
            addBlockComments(IdUser)
            setInputValue('')
            getCommentsBlocked()
            setUsersBlocked([])
        } catch (error) {
            console.log('Erro ao bloquear comentario: ', error)
        }
    }

    return (
        <SafeAreaViewContainer>
            <Header titleHeader='Comentários bloqueados' />
            <Container>
                <ContentPageBlocked>
                    <SearchInput
                        value={inputValue}
                        onSetText={setInputValue}
                        marginTop='10px'
                    />
                </ContentPageBlocked>

                {inputValue.length > 0 ? (
                    <FlatList
                        data={searchResults}
                        scrollEnabled={false}
                        keyExtractor={(item) => "userRes" + item.userId}
                        renderItem={({ item }) => (
                            <AccountActionResult
                                borderBottom
                                name={item.userName}
                                userId={item.userId}
                                profilePhoto={item.profileImage}
                                username={item.userNickname}
                                textButton='Bloquear'
                                handlePress={() => addBlockCommentsPerson(item.userId)}
                            />
                        )}
                    />
                ) : (
                    <FlatList
                        data={usersBlocked}
                        keyExtractor={(item) => "user" + item.userId}
                        scrollEnabled={false}
                        renderItem={({ item }) => (
                            <AccountActionResult
                                borderBottom
                                userId={item.userId}
                                name={item.userName}
                                profilePhoto={item.profileImage}
                                username={item.userNickname}
                                textButton='Desbloquear'
                                handlePress={() => delBlockComment(item.userId)}
                            />
                        )}
                    />
                )}
            </Container>
        </SafeAreaViewContainer>
    );
};
