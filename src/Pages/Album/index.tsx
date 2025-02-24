import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { FlatList } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';

import {
    ImageContentPress,
    AlbumName,
    ContainerImageACover,
    ImageCover,
    ImageIcon
} from './style';

import {
    OptionText,
    SafeAreaViewContainer
} from '../../Components/elementsComponents';

import Header from '../../Components/Header';
import CategoriesFilterPublications from '../../Components/CategoriesFilterPublications';
import BottomModal from '../../Components/BottomModal';

import { delAlbum } from '../../Service/Albuns';
import { StackRoutes } from '../../Routes/StackTypes';
import useUserProfile from '../../GlobalState/userProfile.zustand';

import { theme } from '../../Theme/theme';
import useCaptureImageStore from '../../GlobalState/zustand.store';
import mime from 'mime';
import ConfirmModal from '../../Components/ConfirmModal';
import { TextRegularSmall } from '../PostPreview/style';
import PostersBottom from '../../Components/PostersBottom';
import { Folder } from '../../Types/savedItems';
import { getUserFolders } from '../../Service/Profile';
import { TabsContainer, TextTab } from '../SelectItemsSaved/style';
import { ArchivedPublication } from '../ArchivedPublications/archivedPublication';
import { deleteAlbumDrops, deleteAlbumPost, getAlbumDrops, getAlbumPost } from '../../Service/ItemsOnAlbum';
import ArquivedCardDrops from '../../Components/ArchivedCardDrops';
import { Post } from './AlbumSelect/albumSelectType';
import ArquivedCardPost from '../../Components/ArchivedCardPost';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import ArquivedCardDropsSelect from '../../Components/ArchivedCardDropsSelect';
import MoviePosts from './MoviePosts';
import SeriesPosts from './SeriesPosts';
import EveryPosts from './EveryPosts';
import useDropsStore from '../../GlobalState/drops.zustand';
import useOtherProfilePost from '../../GlobalState/otherProfilePosts.zustand';
import { typeTheme } from '../../Config/enumTheme';
import Button from '../../Components/Button';


interface setProps {
    mime: string | null,
    uri: string | any,
    fileName: string
}

interface Data {
    folders: Folder[];
    message: string;
}

export default function Album() {
    const navigation = useNavigation<StackRoutes>();
    const { user } = useUserProfile()
    const [optionsModal, setOptionsModal] = useState<boolean>(false)
    const [albumImage, setalbumImage] = useState<string>('')
    const [albumTitle, setAlbumTitle] = useState<string>('')
    const [idAlbum, setIdAlbum] = useState<number>(0)
    const [userIdNavigator, setuserIdNavigator] = useState<number>()
    const [data, setData] = useState<Data | null>(null);
    const [openModal, setopenModal] = useState(false)
    const route = useRoute();
    const params = route.params as { titleAlbum: string, imagealbum: string, albumId: number, modal: boolean, userId: number }
    const { setInitialDrop } = useDropsStore()
    const { post } = useOtherProfilePost()
    const [filter, setFilter] = useState<string>()
    const [publicationsAlbums, setpublicationsAlbums] = useState<ArchivedPublication[] | any>([]);
    const [publicationsDrops, setpublicationsDrops] = useState<Post[][]>([]);
    const { captureImage, setCaptureImage } = useCaptureImageStore()
    const [tabSelected, setTabSelected] = useState<0 | 1>(0)
    const [albumImageCapture, setAlbumImageCapture] = useState<setProps>()
    const [confirmModal, setConfirmModal] = useState<boolean>(false)
    const [longPressPostDelete, setLongPressPostDelete] = useState<boolean>(false)
    const [longPressDropsDelete, setLongPressDropsDelete] = useState<boolean>(false)
    const [arrayIds, setArrayIds] = useState<number[]>([])
    const [arrayPostHexIds, setArrayPostHexIds] = useState<string[]>([])
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

    const fetchPostAlbum = async () => {
        try {
            const response = await getAlbumPost(params.albumId, user.userId);
            const albumPosts = response?.data?.response?.data?.post;
            setpublicationsAlbums(albumPosts);
            const res = await getAlbumDrops(params.albumId, user.userId);
            const albumDrops = res?.data?.response?.data?.posts;
            setpublicationsDrops(albumDrops);
        } catch (error) {
            console.error('Erro ao buscar itens arquivados', error);
        }
    }

    const deleteAlbum = async (albumId: number) => {

        try {
            await delAlbum(albumId)

            setIdAlbum(0)
            setalbumImage('')
            setAlbumTitle('')
            setuserIdNavigator(0)

            navigation.goBack()
        } catch (e) {
            console.log('erro to return')
        }

    }

    const selectValueLongPress = (value: boolean) => {
        setLongPressPostDelete(value)
    }

    const handleOpenPaste = (folderName: string, idFolders: number, photoImage: any) => {
        setopenModal(!openModal)
        navigation.navigate('AlbumSelect', {
            folderName: folderName,
            idFolders: idFolders,
            photoImage: photoImage,
            albumId: params.albumId,
            titleAlbum: params.titleAlbum,
            imageAlbum: params.imagealbum,
        });
    };

    const readIdsArrayPosts = (idPubli: number) => {
        if (!arrayIds.includes(idPubli)) {
            setArrayIds((prevNumbers) => [...prevNumbers, idPubli])
        } else {
            setArrayIds((prevNumbers) => prevNumbers.filter((num) => num !== idPubli))
            console.log(arrayIds, 'else')
        }
    }

    const readPostHexIdsArray = (postHexIdPubli: string) => {
        if (!arrayPostHexIds.includes(postHexIdPubli)) {
            setArrayPostHexIds((prevNumbers) => [...prevNumbers, postHexIdPubli])
        } else {
            setArrayPostHexIds((prevNumbers) => prevNumbers.filter((num) => num !== postHexIdPubli))
        }
    }

    const handleNavigate = async (
        userId: number,
        id: number,
        postHexId: string,
        userImage: string,
        userName: string,
        poster: string,
        video: string,
        commentsCount: number,
        likesCount: number,
        viewsCount: number,
        Iliked: number,
        usersLiked: string,
        isSaved: boolean
    ) => {
        setInitialDrop({
            userId: userId,
            idreels: id,
            postHexId: postHexId,
            profileImage: userImage,
            username: userName,
            thumbnail: {
                url: poster
            },
            principalMedia: {
                url: video,
            },
            commentsCount: commentsCount,
            likesCount: likesCount,
            viewsCount: viewsCount,
            Iliked: Iliked,
            usersLiked: usersLiked,
            isSaved: isSaved
        })
        navigation.navigate("DropsScreen", {
            postHexId: post.postHexId,
            index: 0
        })
    }

    async function deleteAlbumPosts() {
        const userId = user.userId;
        const albumId = params.albumId;
        setLongPressPostDelete(false);
        setDeleteLoading(!deleteLoading);
        for (var i = 0; i <= arrayIds.length; i++) {
            if (arrayIds[i] != undefined) {
                await deleteAlbumPost(userId, albumId, arrayIds[i])
                    .then(async (res) => {
                        if (res == undefined) {
                            console.log('erro')
                            setArrayIds([])
                        } else {
                            setArrayIds([])
                            const response = await getAlbumPost(params.albumId, user.userId);
                            const albumPosts = response?.data?.response?.data?.post || [];
                            setpublicationsAlbums(albumPosts);
                        }
                    })
            } else {
                return
            }
        }
    }

    async function deleteAlbumDropsFunc() {
        const userId = user.userId;
        const albumId = params.albumId;
        setLongPressDropsDelete(false);

        setDeleteLoading(!deleteLoading);
        for (var i = 0; i <= arrayPostHexIds.length; i++) {
            if (arrayPostHexIds[i] != undefined) {
                await deleteAlbumDrops(userId, albumId, arrayPostHexIds[i])
                    .then(async (res) => {
                        if (res == undefined) {
                            setArrayPostHexIds([])
                        } else {
                            setArrayPostHexIds([])
                            const res = await getAlbumDrops(params.albumId, user.userId);
                            const albumDrops = res?.data?.response?.data?.posts;
                            setpublicationsDrops(albumDrops);
                        }
                    })
            } else {
                return
            }
        }
    }

    useEffect(() => {
        setIdAlbum(params.albumId)
        setalbumImage(params.imagealbum)
        if (params.titleAlbum) {
            setAlbumTitle(params.titleAlbum)
        }
        setuserIdNavigator(params.userId)
        setDeleteLoading(false)
    }, [params.titleAlbum, params.imagealbum, params.albumId, params.userId])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchPostAlbum()
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        captureImage.length > 0 &&
            setAlbumImageCapture({
                fileName: captureImage[captureImage.length - 1].filename,
                uri: captureImage[captureImage.length - 1].uri,
                mime: mime.getType(captureImage[captureImage.length - 1].uri)
            })
    }, [captureImage.length])

    useEffect(() => {
        for (let i = 0; i < 5; i++) {
            const fetchUsersFolder = async () => {
                try {
                    const response = await getUserFolders(user.userId);
                    setData(response.data);
                } catch (error) {
                    console.error('Error fetching user folders: ', error);
                }
            };
            fetchUsersFolder();
        }
    }, []);

    useEffect(() => {
        fetchPostAlbum();
    }, [])

    useEffect(() => {
        const numberTimeId = arrayIds.length;
        const numberTimePostHexId = arrayPostHexIds.length;
        if (numberTimeId > 0) {
            let time = numberTimeId * 1000;
            const timeout = setTimeout(() => {
                setDeleteLoading(false);
            }, time);
            return () => clearTimeout(timeout);
        }
        if (numberTimePostHexId > 0) {
            let time = numberTimePostHexId * 1000
            const timeout = setTimeout(() => {
                setDeleteLoading(false);
            }, 5000);
            return () => clearTimeout(timeout);
        }
    }, [deleteLoading]);

    const createAlbummSaved = () => {
        setopenModal(!openModal);
        navigation.navigate("SavedItensGroups")
    }




    return (
        <SafeAreaViewContainer>
            <BottomModal
                title=''
                visibleBottonModal={optionsModal}
                setvisibleBottonModal={setOptionsModal}
                children={
                    <>
                        <TouchableOpacity onPress={() => { navigation.navigate('EditAlbum', { albumId: idAlbum, albumTitle: albumTitle, albumImage: albumImage }), setOptionsModal(!optionsModal) }}>
                            <OptionText>Editar</OptionText>
                        </TouchableOpacity>

                        {tabSelected === 0 && (
                            <TouchableOpacity onPress={() => { setOptionsModal(!optionsModal), selectValueLongPress(true) }}>
                                <OptionText>Selecionar</OptionText>
                            </TouchableOpacity>
                        )}

                        {tabSelected === 1 && (
                            <TouchableOpacity onPress={() => { setOptionsModal(!optionsModal), selectValueLongPress(true) }}>
                                <OptionText>Selecionar</OptionText>
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity onPress={(() => { setopenModal(!openModal), setOptionsModal(!optionsModal) })}>
                            <OptionText>Incluir</OptionText>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { setConfirmModal(!confirmModal), setOptionsModal(!optionsModal) }}>
                            <OptionText>Excluir</OptionText>
                        </TouchableOpacity>
                    </>
                }
            />

            <ConfirmModal
                isModalVisible={confirmModal}
                setvisibleBottonModal={setConfirmModal}
                onCancel={() => setConfirmModal(false)}
                onConfirm={async () => {
                    await deleteAlbum(idAlbum);
                    setConfirmModal(false);
                }}

                title='Excluir Álbum'
                text='Deseja excluir este Álbum?' postHexId={''}
            />

            {longPressPostDelete == true && (
                <View style={styles.bottomClose}>
                    <TouchableOpacity style={{ backgroundColor: '#e4e4e4', padding: 5, borderRadius: 50, marginRight: 0 }} onPress={() => { setLongPressPostDelete(false), setArrayIds([]) }}>
                        <AntDesign
                            name='close'
                            color={'white'}
                            size={30}
                        />
                    </TouchableOpacity>
                    {arrayIds.length > 0 && (
                        <TouchableOpacity style={{ backgroundColor: '#e4e4e4', padding: 7, borderRadius: 50, marginLeft: 10 }} onPress={() => { deleteAlbumPosts() }}>
                            <Feather
                                name='trash-2'
                                size={28}
                                color={'red'}
                            />
                        </TouchableOpacity>
                    )}
                </View>
            )}

            {longPressDropsDelete == true && (
                <View style={styles.bottomClose}>
                    <TouchableOpacity style={{ backgroundColor: '#e4e4e4', padding: 5, borderRadius: 50, marginRight: 0 }} onPress={() => { setLongPressDropsDelete(false), setArrayPostHexIds([]) }}>
                        <AntDesign
                            name='close'
                            color={'white'}
                            size={30}
                        />
                    </TouchableOpacity>
                    {arrayPostHexIds.length > 0 && (
                        <TouchableOpacity style={{ backgroundColor: '#e4e4e4', padding: 7, borderRadius: 50, marginLeft: 10 }} onPress={() => { deleteAlbumDropsFunc() }}>
                            <Feather
                                name='trash-2'
                                size={28}
                                color={'red'}
                            />
                        </TouchableOpacity>
                    )}
                </View>
            )}

            {deleteLoading == true && (
                <View style={styles.bottomClose}>
                    <ActivityIndicator size="large" color="blue" />
                </View>
            )}

            <ScrollView showsVerticalScrollIndicator={false} >
                <Header
                    titleHeader={'Álbum'}
                    isFromDestack={true}
                    actionHeaderElement={
                        <>
                            {userIdNavigator == user.userId ? (
                                <Ionicons
                                    onPress={() => setOptionsModal(true)}
                                    name='ellipsis-vertical'
                                    color={theme.secondaryColor}
                                    size={20}
                                />
                            ) : (
                                <></>
                            )
                            }
                        </>
                    }
                />

                <View style={{ alignItems: 'center', marginTop: 15 }}>
                    <ContainerImageACover>
                        {captureImage.length > 0 ? (
                            <ImageCover source={{ uri: captureImage[captureImage.length - 1]?.uri }} />
                        ) : (
                            <ImageCover source={{ uri: albumImage }} />
                        )}
                    </ContainerImageACover>
                </View>
                <AlbumName>{albumTitle}</AlbumName>
                {tabSelected == 0 ? (
                    <CategoriesFilterPublications
                        advancedFiltersButton
                        onPressCategoryButton={setFilter}
                        styleCategoryContent={
                            { minWidth: 80, padding: 13, paddingTop: 7, height: 36, marginRight: 10 }
                        }
                        textStyle={{ fontSize: 12, lineHeight: 18 }}
                        categories={[
                            // 'Mais curtidas',
                            'Todos',
                            'Filme',
                            'Série',
                            'Outros',
                        ]}
                    />) : (
                    <></>
                )}

                <>
                    <TabsContainer>
                        <View style={{ width: 20, borderBottomColor: 'blue', borderBottomWidth: 1, alignSelf: "stretch" }}></View>
                        <TouchableOpacity
                            style={tabSelected === 0 ? styles.SelectedTabButton : styles.TabButton}
                            onPress={() => { setTabSelected(0), setArrayPostHexIds([]) }}
                        >
                            <TextTab style={{ paddingRight: 15, paddingLeft: 42 }} active={tabSelected === 0}>Publicações</TextTab>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={tabSelected === 1 ? styles.SelectedTabButton : styles.TabButton}
                            onPress={() => { setTabSelected(1), setArrayIds([]) }}
                        >
                            <TextTab style={{ paddingRight: 15, paddingLeft: 62 }} active={tabSelected === 1}>Drops</TextTab>
                        </TouchableOpacity>
                        <View style={{ width: 20, borderBottomColor: 'blue', borderBottomWidth: 1, alignSelf: "stretch" }}></View>
                    </TabsContainer>
                </>

                {tabSelected === 0 && (
                    <>
                        {filter == undefined &&
                            <MoviePosts
                                publicationsAlbums={publicationsAlbums}
                                ifAll={true}
                                idSelect={(idArray) => readIdsArrayPosts(idArray)}
                                setSelection={(selection) => selectValueLongPress(selection)}
                                selection={longPressPostDelete}
                            />}

                        {filter == 'Todos' &&
                            <MoviePosts
                                publicationsAlbums={publicationsAlbums}
                                ifAll={true}
                                idSelect={(idArray) => readIdsArrayPosts(idArray)}
                                setSelection={(selection) => selectValueLongPress(selection)}
                                selection={longPressPostDelete}
                            />}
                        {filter == 'Filme' &&
                            <MoviePosts
                                publicationsAlbums={publicationsAlbums}
                                idSelect={(idArray) => readIdsArrayPosts(idArray)}
                                setSelection={(selection) => selectValueLongPress(selection)}
                                selection={longPressPostDelete}
                            />}
                        {filter == 'Série' &&
                            <SeriesPosts
                                publicationsAlbums={publicationsAlbums}
                                idSelect={(idArray) => readIdsArrayPosts(idArray)}
                                setSelection={(selection) => selectValueLongPress(selection)}
                                selection={longPressPostDelete}
                            />}
                        {filter == 'Outros' &&
                            <EveryPosts
                                publicationsAlbums={publicationsAlbums}
                                idSelect={(idArray) => readIdsArrayPosts(idArray)}
                                setSelection={(selection) => selectValueLongPress(selection)}
                                selection={longPressPostDelete}
                            />}
                    </>
                )}

                {tabSelected === 1 && (
                    <FlatList
                        data={publicationsDrops}
                        // keyExtractor={(item) => item.postHexId}
                        numColumns={3}
                        scrollEnabled={false}
                        ListEmptyComponent={
                            <View style={{ alignItems: 'center', justifyContent: 'center', top: 20, height: 60 }}>
                                <Text style={{ color: theme.lightGray }}>
                                    Você não possui Drops no Álbum
                                </Text>
                            </View>
                        }
                        style={{ marginTop: 10 }}
                        renderItem={({ item }) => {
                            const mediaUrl = item[0]?.principalMedia && item[0]?.principalMedia.url && item[0]?.principalMedia.url;
                            if (longPressDropsDelete == false) {
                                if (mediaUrl) {
                                    return (
                                        <>
                                            {item.map((post) => (
                                                <ArquivedCardDrops
                                                    source={mediaUrl}
                                                    key={post.postHexId}
                                                    onLongPress={() => setLongPressDropsDelete(true)}
                                                    onPress={() => {
                                                        handleNavigate(
                                                            post.userId, 1,
                                                            post.postHexId,
                                                            post.profileImage,
                                                            post.username,
                                                            post.thumbnail.url,
                                                            post.principalMedia.url,
                                                            0, 0, 0, 1,
                                                            '',
                                                            false
                                                        )
                                                    }}
                                                />
                                            ))}
                                        </>
                                    );
                                }
                            } else {
                                if (mediaUrl) {
                                    return (
                                        <ArquivedCardDropsSelect
                                            source={mediaUrl}
                                            onPress={() => { readPostHexIdsArray(item[0]?.postHexId) }}
                                            styleType={'single'}
                                        />
                                    );
                                }
                            }
                            return null;
                        }}
                    />
                )}

            </ScrollView>

            <BottomModal
                children={
                    <>
                        <View style={{ alignItems: 'center', justifyContent: 'center', height: 180, }}>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                key={data?.folders.length}
                                data={data?.folders}
                                keyExtractor={(item) => "card" + item.userId.toString()}
                                numColumns={3}
                                ListEmptyComponent={
                                    <>
                                        <TextRegularSmall>Nehuma pasta encontrada.</TextRegularSmall>
                                    </>
                                }
                                renderItem={({ item }) => {
                                    return (
                                        <>
                                            <PostersBottom
                                                folderData={item.cover_url?.mediaUrl}
                                                title={item.foldersName}
                                                navigation={() => {
                                                    {
                                                        handleOpenPaste(item.foldersName, item.idFolders, item.cover_url.mediaUrl)
                                                    }
                                                }}
                                            />
                                        </>
                                    );
                                }}
                            />
                        </View>
                        <View style={{ top: 30 }}>
                            <Button textButton="Criar pasta" typebutton={typeTheme.default} pressFunction={() => createAlbummSaved()} />
                        </View>
                    </>
                }
                title='Incluir no Álbum'
                visibleBottonModal={openModal}
                setvisibleBottonModal={() => { setopenModal(!openModal) }}
            />

        </SafeAreaViewContainer >


    );
};

const styles = StyleSheet.create({
    buttonEditin: {
        width: 200,
        height: 40,
        zIndex: 2,
        backgroundColor: '#081B74',
        position: 'absolute',
        top: 730,
        marginLeft: 105,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'white',
    },
    inputNameEdit: {
        width: '50%',
        height: 40,
        borderWidth: 0.5,
        borderRadius: 15,
        marginTop: 10,
        borderColor: '#CECECE'
    },
    editingButton: {
        width: 100,
        height: 40,
        backgroundColor: '#081B74',
        top: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

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
    },
    bottomClose: {
        alignItems: 'center',
        width: '100%',
        height: 50,
        zIndex: 7,
        position: 'absolute',
        top: 720,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
});