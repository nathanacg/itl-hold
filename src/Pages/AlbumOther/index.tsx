import React, { useEffect, useState } from 'react';
import { ScrollView, View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import {
    ImageContentPress,
    AlbumName,
    ContainerImageACover,
    ImageCover,
    ImageIcon
} from './style';

import {
    SafeAreaViewContainer
} from '../../Components/elementsComponents';

import Header from '../../Components/Header';
import CategoriesFilterPublications from '../../Components/CategoriesFilterPublications';
import BottomModal from '../../Components/BottomModal';

import { StackRoutes } from '../../Routes/StackTypes';
import useUserProfile from '../../GlobalState/userProfile.zustand';

import { theme } from '../../Theme/theme';
import useCaptureImageStore from '../../GlobalState/zustand.store';
import mime from 'mime';
import { TextRegularSmall } from '../PostPreview/style';
import PostersBottom from '../../Components/PostersBottom';
import { Folder } from '../../Types/savedItems';
import { getUserFolders } from '../../Service/Profile';
import { TabsContainer, TextTab } from '../SelectItemsSaved/style';
import { ArchivedPublication } from '../ArchivedPublications/archivedPublication';
import { getAlbumDrops, getAlbumPost } from '../../Service/ItemsOnAlbum';
import { Post } from './AlbumSelect/albumSelectType';
import ArquivedCardPost from '../../Components/ArchivedCardPost';
import ArquivedCardDrops from '../../Components/ArchivedCardDrops';
import MoviePostsOther from './MoviePostsOther';
import SeriesPostsOther from './SeriesPostsOther';
import EveryPostsOther from './EveryPostsoOther';
import useDropsStore from '../../GlobalState/drops.zustand';


interface setProps {
    mime: string | null,
    uri: string | any,
    fileName: string
}

interface Data {
    folders: Folder[];
    message: string;
}

export default function AlbumOther() {
    const navigation = useNavigation<StackRoutes>();
    const { user } = useUserProfile()
    const [albumImage, setalbumImage] = useState<string>('')
    const [albumTitle, setAlbumTitle] = useState<string>('')
    const [idAlbum, setIdAlbum] = useState<number>()
    const { setInitialDrop } = useDropsStore()
    const [userIdNavigator, setuserIdNavigator] = useState<number>()
    const [data, setData] = useState<Data | null>(null);
    const route = useRoute();
    const params = route.params as { titleAlbum: string, imagealbum: string, albumId: number, modal: boolean, userId: number }
    const [publicationsAlbums, setpublicationsAlbums] = useState<ArchivedPublication[]>([]);
    const [publicationsDrops, setpublicationsDrops] = useState<Post[]>([]);
    const { captureImage, setCaptureImage } = useCaptureImageStore()
    const [tabSelected, setTabSelected] = useState<0 | 1>(0)
    const [albumImageCapture, setAlbumImageCapture] = useState<setProps>()
    const [filter, setFilter] = useState<string>()

    const selectImage = () => {
        navigation.navigate("Galery", { nextRouteName: 'Album', routeParams: {} })
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

    const handleOpenPaste = (folderName: string, idFolders: number, photoImage: any) => {
        navigation.navigate('AlbumSelect', {
            folderName: folderName,
            idFolders: idFolders,
            photoImage: photoImage,
            albumId: params.albumId,
            titleAlbum: params.titleAlbum,
            imageAlbum: params.imagealbum,
        });
    };

    useEffect(() => {
        setIdAlbum(params.albumId)
        setalbumImage(params.imagealbum)
        setAlbumTitle(params.titleAlbum)
        setuserIdNavigator(params.userId)
    }, [params.titleAlbum, params.imagealbum, params.albumId, params.userId])

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
        const fetchPostAlbum = async () => {
            try {
                const response = await getAlbumPost(params.albumId, params.userId);
                const albumPosts = response?.data?.response?.data?.post || [];
                setpublicationsAlbums(albumPosts);

                const res = await getAlbumDrops(params.albumId, params.userId);
                const albumDrops = res?.data?.response?.data?.posts[1] || [];
                setpublicationsDrops(albumDrops);
            } catch (error) {
                console.error('Erro ao buscar itens arquivados', error);
            }
        }
        fetchPostAlbum();
    }, [])

    return (
        <SafeAreaViewContainer>

            <ScrollView showsVerticalScrollIndicator={false}>
                <Header
                    titleHeader={'Álbum'}
                    isFromDestack={true}
                    actionHeaderElement={
                        <>
                        </>
                    }
                />

                <View style={{ alignItems: 'center', marginTop: 15 }}>
                    <ContainerImageACover>
                        <ImageCover source={{ uri: albumImage }} />
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
                    />
                ) : (
                    <></>
                )}


                <>
                    <TabsContainer>
                        <View style={{ width: 20, borderBottomColor: 'blue', borderBottomWidth: 1, alignSelf: "stretch" }}></View>
                        <TouchableOpacity
                            style={tabSelected === 0 ? styles.SelectedTabButton : styles.TabButton}
                            onPress={() => { setTabSelected(0) /* setArrayIds([]), setSrrayPostHexIds([]) */ }}
                        >
                            <TextTab style={{ paddingRight: 15, paddingLeft: 42 }} active={tabSelected === 0}>Publicações</TextTab>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={tabSelected === 1 ? styles.SelectedTabButton : styles.TabButton}
                            onPress={() => { setTabSelected(1)/* , setArrayIds([]), setSrrayPostHexIds([])  */ }}
                        >
                            <TextTab style={{ paddingRight: 15, paddingLeft: 62 }} active={tabSelected === 1}>Drops</TextTab>
                        </TouchableOpacity>
                        <View style={{ width: 20, borderBottomColor: 'blue', borderBottomWidth: 1, alignSelf: "stretch" }}></View>
                    </TabsContainer>
                </>



                {tabSelected === 0 && (
                    <>
                        {filter == undefined &&
                            <MoviePostsOther
                                publicationsAlbums={publicationsAlbums}
                                ifAll={true}
                            />}

                        {filter == 'Todos' &&
                            <MoviePostsOther
                                publicationsAlbums={publicationsAlbums}
                                ifAll={true}
                            />}
                        {filter == 'Filme' &&
                            <MoviePostsOther
                                publicationsAlbums={publicationsAlbums}
                            />}
                        {filter == 'Série' &&
                            <SeriesPostsOther
                                publicationsAlbums={publicationsAlbums}
                            />}
                        {filter == 'Outros' &&
                            <EveryPostsOther
                                publicationsAlbums={publicationsAlbums}
                            />}
                    </>
                )}


                {tabSelected === 1 && (
                    <FlatList
                        data={publicationsDrops}
                        // keyExtractor={(item) => item.postHexId}
                        numColumns={3}
                        ListEmptyComponent={
                            <View style={{ alignItems: 'center', justifyContent: 'center', top: 20, height: 60 }}>
                                <Text style={{ color: theme.lightGray }}>
                                    Não há Drops no Álbum
                                </Text>
                            </View>
                        }
                        style={{ marginTop: 10 }}
                        renderItem={({ item }) => {
                            const mediaUrl = item[0]?.principalMedia && item[0]?.principalMedia.url && item[0]?.principalMedia.url;
                                if (mediaUrl) {
                                    return (
                                        <>
                                            {item.map((post) => (
                                                <ArquivedCardDrops
                                                    source={mediaUrl}
                                                    key={post.postHexId}
                                                    // onLongPress={() => setLongPressDropsDelete(true)}
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
                            return null;
                        }}
                    />
                )}

            </ScrollView>
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
    }
});