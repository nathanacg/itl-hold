import { useEffect, useState } from 'react'

import AlbumCard from '../AlbumCard'

import {
    FlatList,
    View,
    Image
} from "react-native"

import {
    AddAlbun,
    AddText,
    Container
} from '../AlbumCard/style';

import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';
import useUserProfile from '../../GlobalState/userProfile.zustand';
import { getUserFolders } from '../../Service/Profile';
import { Data } from '../../Types/savedItems';
import { TextNotPublicationsArchiveds } from '../../Pages/ArchivedPublications/style';

const albunsList = [
    {
        icon: require('../../Assets/Icons/tag.png'),
        title: 'Novo Álbum'
    },
]

interface UserID {
    userId: number
}

export default function AlbunsList(props: UserID) {

    const navigation = useNavigation<StackRoutes>()

    const { user: userProfile } = useUserProfile()

    const [albuns, setAlbuns] = useState<Data | null>(null)
    const [albumSecond, setAlbumSecond] = useState<Data | null>(null)


    const handleOpenPaste = (folderName: string, isPublic: number, idFolders: number, photoImage: any) => {
        navigation.push('SelectItemsSaved', {
            nameFolder: folderName,
            folderId: idFolders,
            folderPublic: isPublic,
            folderPhoto: photoImage
        });
    };

    const fetchUsersFolder = async () => {
        try {
            const response = await getUserFolders(props.userId)
            if (props.userId == userProfile.userId) {
                const filtered = response.data.folders.filter((item, index) => index !== 0)
                setAlbumSecond(response.data)
                setAlbuns({ folders: filtered })

            } else {
                const filtered = response.data.folders.filter((item: { isPublic: number }) => item.isPublic == 1)
                setAlbuns({ folders: filtered })
            }
        } catch (error) {
            console.warn('fetchUsersFolder - Albuns')
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUsersFolder();
    }, [navigation]);

    useEffect(() => {
        navigation.addListener('focus', () => {
            fetchUsersFolder();
        })

        return () => {
            navigation.removeListener('focus', () => { })
        }
    }, [])

    return (
        <>
            {props.userId == userProfile.userId && (
                <View style={{ paddingLeft: 12, paddingRight: 12, }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Container onPress={() => navigation.push('AlbumCreateSaveditems')}>
                            <AddAlbun>
                                <Image style={{ width: 50, height: 50, resizeMode: 'contain' }} source={require('../../Assets/Icons/tag.png')} />
                                <AddText>{albunsList[0].title}</AddText>
                            </AddAlbun>
                        </Container>
                        {albumSecond?.folders.length > 0 && (
                            <AlbumCard
                                image={albumSecond?.folders[0].cover_url.mediaUrl}
                                title={albumSecond?.folders[0].foldersName}
                                onPress={() => handleOpenPaste(albumSecond?.folders[0].foldersName, 1, albumSecond?.folders[0].idFolders, albumSecond?.folders[0].cover_url.mediaUrl)}
                            />
                        )}
                    </View>
                </View>
            )}
            {props.userId != userProfile.userId && albuns?.folders.length == 0 && (
                <View style={{ paddingLeft: 12, paddingRight: 12, }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <TextNotPublicationsArchiveds>Não existe nenhum Álbum</TextNotPublicationsArchiveds>
                    </View>
                </View>
            )}
            <FlatList
                scrollEnabled={false}
                data={albuns?.folders.filter(folder => folder.isPublic === 1)}
                numColumns={2}
                keyExtractor={(item) => 'idFolders' + item.foldersName}
                //ListEmptyComponent={<TextNotPublicationsArchiveds>Não existe nenhum Álbum</TextNotPublicationsArchiveds>}
                renderItem={({ item, index }) => {
                    return (
                        <AlbumCard
                            image={item.cover_url?.mediaUrl}
                            title={item.foldersName}
                            onPress={() => {
                                handleOpenPaste(item.foldersName, 1, item.idFolders, item.cover_url.mediaUrl)
                            }}
                        />
                    )
                }}
            />
        </>
    )
}