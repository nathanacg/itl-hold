import React, { useEffect, useState } from 'react';
import { TouchableOpacity, FlatList, View, StyleSheet } from 'react-native';

import {
    Container,
    SafeAreaViewContainer
} from '../../Components/elementsComponents';

import Header from '../../Components/Header';
import { OptionText, StoryOptions, TabsContainer, TextTab } from './style';
import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';
import { useRoute } from '@react-navigation/native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import BottomModal from '../../Components/BottomModal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { delSaveDrops, delSavePost, getSavedDrops, getSavedPost } from '../../Service/Profile';
import ArquivedCardPost from '../../Components/ArchivedCardPost';
import useOtherProfilePost from '../../GlobalState/otherProfilePosts.zustand';
import { TextNotPublicationsArchiveds } from '../ArchivedPublications/style';
import Fontisto from 'react-native-vector-icons/Fontisto';
import useUserProfile from '../../GlobalState/userProfile.zustand';
import { theme } from '../../Theme/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ArchivedPublication, Post } from './selectedTypes';

export default function SelectedItemFromAlbum() {
    const { user } = useUserProfile();
    const route = useRoute();
    const params = route.params as { nameFolder: string, folderId: number, folderPhoto: string }
    const navigation = useNavigation<StackRoutes>();
    const [postOptionsModal, setPostOptionsModal] = useState(false)
    const [itemsOption, setItemsOption] = useState(false)
    const [publicationsArchiveds, setpublicationsArchiveds] = useState<ArchivedPublication[]>([]);
    const [publicationsDrops, setpublicationsDrops] = useState<Post[]>([]);
    const [passPostId, setpassPostId] = useState<number | string>();
    const isSaved = true;
    const [tabSelected, setTabSelected] = useState<0 | 1>(0)
    const [namefolder, setNameFolder] = useState('');
    const [idfolder, setidFolder] = useState<number>();
    const [photoFolder, setPhotoFolder] = useState<string>();

    useState(() => {
        setNameFolder(params.nameFolder)
        setidFolder(params.folderId)
        setPhotoFolder(params.folderPhoto)
    })

    const publicationsInRows = [];
    let row = [];
    for (let i = 0; i < publicationsArchiveds.length; i++) {
        row.navigate(publicationsArchiveds[i]);
        if (row.length === 3 || i === publicationsArchiveds.length - 1) {
            publicationsInRows.navigate(row);
            row = [];
        }
    }

    useEffect(() => {
        const fetchArchiveItems = async () => {
            const idFolders = params.folderId;
            try {
                const response = await getSavedPost(idFolders, user.userId);
                console.log(response)
                const archivedData = response?.data?.response?.data?.post || [];
                setpublicationsArchiveds(archivedData);
                const res = await getSavedDrops(idFolders, user.userId);
                const dropsAccount = res?.data?.response?.data?.posts[1] || [];
                setpublicationsDrops(dropsAccount);
            } catch (error) {
                console.error('Erro ao buscar itens arquivados', error);
            }
        };
        fetchArchiveItems();
    }, []);

    const passParams = (postId: number | string) => {
        setpassPostId(postId);
    }

    const navigateToPost = (postId: any) => {
        navigation.navigate("PostScreen", { postId, isSaved });
    }

    const deleteSavePostandDrops = async (postId: any) => {
        const userId = (user.userId);
        const idFolders = params.folderId;
        if (typeof postId === 'number') {
            try {
                delSavePost(userId, idFolders, postId)
                const response = await getSavedPost(idFolders, user.userId);
                const archivedData = response?.data?.response?.data?.post || [];
                setpublicationsArchiveds(archivedData);
                setPostOptionsModal(!postOptionsModal)
            } catch (error) {
                console.log('Error on pass for delete params', error)
            }
        } else {
            const postHexId = postId;
            try {
                delSaveDrops(userId, idFolders, postHexId)
                const res = await getSavedDrops(idFolders, user.userId);
                const dropsAccount = res?.data?.response?.data?.posts[1] || [];
                setpublicationsDrops(dropsAccount);
                setPostOptionsModal(!postOptionsModal)
            } catch (error) {
                console.log('Error on pass for delete params', error)
            }
        }
    }

    const goToEditfolder = (folderName: string, idFolders: number, imageFolder: any) => {

        navigation.navigate('CreateAndEditFolderSavedItens', {
            foldersname: folderName,
            idfolder: idFolders,
            photoFolder: imageFolder
        });
    };

    return (
        <SafeAreaViewContainer>
            <Header
                titleHeader={params.nameFolder}
                actionHeaderElement={
                    <TouchableOpacity onPress={() => setItemsOption(!itemsOption)}>
                        <SimpleLineIcons
                            name='options-vertical'
                            color={'#0245F4'}
                            size={20}
                            style={{ paddingLeft: 12, paddingRight: 4 }}
                        />
                    </TouchableOpacity>
                }
            />
            <Container style={{ backgroundColor: '#fff' }}
            >
                <>
                    <TabsContainer>
                        <View style={{ width: 20, borderBottomColor: 'blue', borderBottomWidth: 1, alignSelf: "stretch" }}></View>
                        <TouchableOpacity
                            style={tabSelected === 0 ? styles.SelectedTabButton : styles.TabButton}
                            onPress={() => setTabSelected(0)}
                        >
                            <TextTab style={{ paddingRight: 15, paddingLeft: 42 }} active={tabSelected === 0}>Publicações</TextTab>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={tabSelected === 1 ? styles.SelectedTabButton : styles.TabButton}
                            onPress={() => setTabSelected(1)}
                        >
                            <TextTab style={{ paddingRight: 15, paddingLeft: 62 }} active={tabSelected === 1}>Drops</TextTab>
                        </TouchableOpacity>
                        <View style={{ width: 20, borderBottomColor: 'blue', borderBottomWidth: 1, alignSelf: "stretch" }}></View>
                    </TabsContainer>
                </>
                {publicationsArchiveds.length > 0 ? (
                    <>
                        {tabSelected === 0 && (
                            <FlatList
                                data={publicationsArchiveds}
                                keyExtractor={(item) =>
                                    item.postId ? item.postId.toString() : Math.random().toString()
                                }
                                numColumns={3}
                                style={{ marginTop: 10 }}
                                renderItem={({ item }) => {
                                    const mediaUrl = item.medias && item.medias[0] && item.medias[0].mediaUrl;
                                    if (mediaUrl) {
                                        return (
                                            <ArquivedCardPost
                                                source={{ uri: mediaUrl }}
                                                onPress={() => { setPostOptionsModal(!postOptionsModal), passParams(item.postId) }}
                                                styleType={publicationsInRows.length === 1 ? 'single' : publicationsInRows.length === 2 ? 'double' : 'triple'}
                                            />
                                        );
                                    }
                                    return null;
                                }}
                            />

                        )}

                        {tabSelected === 1 && (
                            <FlatList
                                data={publicationsDrops}
                                keyExtractor={(item) => item.postHexId}
                                numColumns={3}
                                style={{ marginTop: 10 }}
                                renderItem={({ item }) => {
                                    const mediaUrl = item.thumbnail && item.thumbnail.url && item.thumbnail.url;
                                    if (mediaUrl) {
                                        return (
                                            <ArquivedCardPost
                                                source={{ uri: mediaUrl }}
                                                onPress={() => { setPostOptionsModal(!postOptionsModal), passParams(item.postHexId) }}
                                                styleType={publicationsInRows.length === 1 ? 'single' : publicationsInRows.length === 2 ? 'double' : 'triple'}
                                            />
                                        );
                                    }
                                    return null;
                                }}
                            />
                        )}
                    </>
                ) : (
                    <TextNotPublicationsArchiveds>Você não tem publicações salvas nesta pasta ainda.</TextNotPublicationsArchiveds>
                )}
            </Container>
            <BottomModal
                title=''
                setvisibleBottonModal={() => setPostOptionsModal(!postOptionsModal)}
                children={
                    <>
                        <StoryOptions onPress={() => deleteSavePostandDrops(passPostId)}>
                            <Ionicons
                                name="trash-outline"
                                color={"#231F20"}
                                size={22}
                            />
                            <OptionText>{`Excluir publicação da pasta (${params.nameFolder})`}</OptionText>
                        </StoryOptions>
                        <StoryOptions onPress={() => navigateToPost(passPostId)}>
                            <Fontisto name="paste" size={20} color={'#231F20'} style={{ marginRight: 0, marginLeft: 5 }} />
                            <OptionText>{'Navegar para a publicação'}</OptionText>
                        </StoryOptions>
                    </>
                }
                visibleBottonModal={postOptionsModal}
            />
            <BottomModal
                title=''
                setvisibleBottonModal={() => setItemsOption(!itemsOption)}
                children={
                    <>
                        {/* <StoryOptions onPress={() => {}}>
                            <Ionicons
                                name="trash-outline"
                                color={"#231F20"}
                                size={22}
                            />CreateAndEditFolderSavedItensCreateAndEditFolderSavedItens
                            <OptionText>{`Excluir pasta (${attribute1})`}</OptionText>
                        </StoryOptions> */}
                        <StoryOptions onPress={() => goToEditfolder(namefolder, idfolder, photoFolder)}>
                            <AntDesign name="edit" size={20} color={'#231F20'} style={{ marginRight: 3, marginLeft: 0 }} />
                            <OptionText>{'Editar pasta'}</OptionText>
                        </StoryOptions>
                    </>
                }
                visibleBottonModal={itemsOption}
            />
        </SafeAreaViewContainer >
    );
}

const styles = StyleSheet.create({
    SelectedTabButton: {
        flex: 1,
        gap: 2,
        paddingVertical: 3,
        paddingHorizontal: 9,
        borderWidth: 1,
        borderColor: theme.primarycolor,
        borderBottomWidth: 0,
        flexDirection: "row",
        alignItems: "flex-end",
        borderRadius: 6,
        borderBottomRightRadius: 1,
        borderBottomLeftRadius: 1,
        // paddingLeft: 10
    },
    TabButton: {
        flex: 1,
        gap: 2,
        paddingVertical: 3,
        borderColor: theme.primarycolor,
        borderBottomWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 6,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
    }
})