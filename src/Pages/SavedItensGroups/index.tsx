import React, { useEffect, useState } from 'react'

import { FlatList, TouchableOpacity } from 'react-native'

import { theme } from '../../Theme/theme'

import { useNavigation } from '@react-navigation/native'
import { StackRoutes } from '../../Routes/StackTypes'

import Ionicons from 'react-native-vector-icons/Ionicons';

import {
    GroupCardsContainer,
    Container,
    StoryOptions,
    OptionText
} from './style'

import { SafeAreaViewContainer } from '../../Components/elementsComponents'

import Header from '../../Components/Header'

import BottomModal from '../../Components/BottomModal'
import ItensGroupCard from '../../Components/ItensGroupCard'

import useUserProfile from '../../GlobalState/userProfile.zustand'

import { deleteFolder, getUserFolders } from '../../Service/Profile'
import { SavedItensGroupsProps, Data } from '../../Types/savedItems'

const SavedItensGroups: React.FC<SavedItensGroupsProps> = () => {

    const { user } = useUserProfile()
    const navigation = useNavigation<StackRoutes>()
    const [data, setData] = useState<Data | null>(null)
    const [delePaste, setdelePaste] = useState(false)
    const [foldersId, setfoldersId] = useState<number>(0)
    const [requestCount, setRequestCount] = useState(0)

    const fetchUsersFolder = async () => {
        try {
            const response = await getUserFolders(user.userId);
            setData(response.data);
            setRequestCount(requestCount + 1)
        } catch (error) {
            console.error('Error fetching user folders: ', error);
        }
    };

    useEffect(() => {
        navigation.addListener('blur', () => { })
        return () => {
            navigation.removeListener('blur', () => { })
        }
    }, [navigation])

    const handleAvancarPress = () => {
        navigation.push('AlbumCreateSaveditems')
    };

    const handleOpenPaste = (folderName: string, idFolders: number, photoImage: any, isPublic: number) => {
        navigation.push('SelectItemsSaved', {
            nameFolder: folderName,
            folderId: idFolders,
            folderPhoto: photoImage,
            folderPublic: isPublic
        });
    };

    const handlePress = (idFolders: number) => () => {
        setdelePaste(!delePaste)
        setfoldersId(idFolders)
    }

    const delFolder = async (idfolder: number) => {
        try {

            deleteFolder(idfolder)
            const response = await getUserFolders(user.userId)
            setData(response.data)
            setRequestCount(requestCount + 1)
            setdelePaste(!delePaste)

        } catch (error) {
            console.log('Error on the id for delete folder')
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchUsersFolder()
        })

        return unsubscribe
    }, [navigation])

    useEffect(() => {

        fetchUsersFolder()

    }, [])

    return (
        <SafeAreaViewContainer>
            <Container>
                <Header
                    titleHeader="Itens salvos"
                    actionHeaderElement={
                        <TouchableOpacity onPress={handleAvancarPress}>
                            <Ionicons name="add" color={theme.primarycolor} size={32} />
                        </TouchableOpacity>
                    }
                />
                <GroupCardsContainer>
                    <FlatList
                        data={data?.folders || []}
                        keyExtractor={(item) => "card" + item.idFolders}
                        numColumns={2}
                        renderItem={({ item }) => {
                            return (
                                <ItensGroupCard
                                    mediaUrl={item.cover_url?.mediaUrl}
                                    title={item.foldersName}
                                    navigation={() => handleOpenPaste(item.foldersName, item.idFolders, item.cover_url.mediaUrl, item.isPublic)}
                                    handlePress={handlePress(item.idFolders)}
                                />
                            )
                        }}
                    />
                </GroupCardsContainer>
            </Container>

            <BottomModal
                title=''
                setvisibleBottonModal={() => setdelePaste(!delePaste)}
                children={
                    <>
                        <StoryOptions onPress={() => delFolder(foldersId)}>
                            <Ionicons
                                name="trash-outline"
                                color={"#231F20"}
                                size={22}
                                style={{ marginBottom: 5 }}
                            />
                            <OptionText>Excluir</OptionText>
                        </StoryOptions>
                    </>
                }
                visibleBottonModal={delePaste}
            />
        </SafeAreaViewContainer>
    )
}

export default SavedItensGroups