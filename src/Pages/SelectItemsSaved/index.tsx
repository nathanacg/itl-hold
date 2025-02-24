import React, { SetStateAction, useEffect, useState } from 'react';
import { TouchableOpacity, FlatList, View, StyleSheet, Image, TextInput, Alert } from 'react-native';

import {
    Container,
    SafeAreaViewContainer
} from '../../Components/elementsComponents';

import Header from '../../Components/Header';
import { ButtonEditImage, ButtonEditTitle, CameraIcon, ContainerImageAlbum, ContainerTitle, OptionText, StoryOptions, TabsContainer, Text, TextTab, Title, Title2 } from './style';
import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';
import { useRoute } from '@react-navigation/native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import BottomModal from '../../Components/BottomModal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { delSaveDrops, delSavePost, deleteFolder, getArquiveItemsGeneral, getArquivePost, getSavedDrops, getSavedPost, updateFolder } from '../../Service/Profile';
import ArquivedCardPost from '../../Components/ArchivedCardPost';
import useOtherProfilePost from '../../GlobalState/otherProfilePosts.zustand';
import { TextNotPublicationsArchiveds } from '../ArchivedPublications/style';
import Fontisto from 'react-native-vector-icons/Fontisto';
import useUserProfile from '../../GlobalState/userProfile.zustand';
import { fontStyle, theme } from '../../Theme/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { IItemFolder } from '../../Types/savedItems';
import { DropSavedCard } from './components/DropSavedCard';
import ArquivedCardPostColor from '../../Components/ArchivedCardPostColor';
import CategoriesFilterPublications from '../../Components/CategoriesFilterPublications';
import { handleSearch } from '../../Utils/search';
import ConfirmModal from '../../Components/ConfirmModal';
import ImagePicker from 'react-native-image-crop-picker'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Description, Wrapper, Wrapper2 } from '../AlbumCreateSaveditems/style';
import ToggleSwitch from '../../Components/ToggleSwitch';
import { ActionsEditProfilePhotoContainer } from '../../Components/Informationsform';
import Entypo from 'react-native-vector-icons/Entypo';
import { updatePrivacyAlbum } from '../../Service/Albuns';

interface ArchivedPublication {
    postId: number,
    postColor?: string,
    postLegend: string,
    postHexId: string,
    postSpoiler: number,
    postEvaluation: string,
    postCategorie: string,
    postEnable: string,
    userId: number,
    postDate: number,
    tmdbMovieId: null,
    userName: string,
    userNickname: string,
    profileImage: string,
    medias: [
        {
            idmedias: number,
            mediaUrl: string,
            mediaName: string,
            mediaSize: string,
            mediaType: string,
            markedUsers: null,
            mediaExtension: string
        }
    ]
}


interface IImage {
    mime: string,
    uri: string,
    fileName: string
}

export default function SelectItemsSaved() {

    const { user } = useUserProfile()
    const route = useRoute()
    const params = route.params as { nameFolder: string, folderPublic: number, folderId: number, folderPhoto: string }

    const [option, setOption] = useState<boolean>(false)

    const navigation = useNavigation<StackRoutes>();
    const [postOptionsModal, setPostOptionsModal] = useState(false)
    const [itemsOption, setItemsOption] = useState(false)
    const [publicationsArchiveds, setpublicationsArchiveds] = useState<ArchivedPublication[]>([]);
    const [publicationsDrops, setpublicationsDrops] = useState<IItemFolder[][]>([]);
    const [tabSelected, setTabSelected] = useState<0 | 1>(0)
    const [nameFolder, setNameFolder] = useState(params.nameFolder);
    const idFolder = params.folderId
    const publicationsInRows = [];
    const { setPost } = useOtherProfilePost()
    const [postTemp, setPostTemp] = useState<ArchivedPublication | null>(null)
    const [dropTemp, setDropTemp] = useState<ArchivedPublication | null>(null)
    const [filter, setFilter] = useState(null)
    const [searchPublicationsArchiveds, setSearchPublicationsArchiveds] = useState<ArchivedPublication[]>([]);
    const [albumImage, setAlbumImage] = useState<IImage | null>(null)
    const [confirmDeleteFolder, setConfirmDeleteFolder] = useState(false)
    const [editModeTitle, setEditModeTitle] = useState<boolean>(false)

    const [isPublic, setIsPublic] = useState(params.folderPublic == 1 ? true : false)

    const toggleSwitch = async () => {
        await updatePrivacyAlbum(!isPublic ? 1 : 0, idFolder)
        setIsPublic(!isPublic)
    }


    useEffect(() => {
        if (filter) {
            if (filter == 'Filme') {
                setSearchPublicationsArchiveds(publicationsArchiveds)
            } else {
                setSearchPublicationsArchiveds(handleSearch(filter, publicationsArchiveds, 'postCategorie'))
            }
        }
    }, [filter])

    const fetchArchiveItems = async () => {
        const idFolders = params.folderId;
        try {
            const response = await getSavedPost(idFolders, user.userId)
            const archivedData = response.data.response.data?.post
            setSearchPublicationsArchiveds(archivedData)
            setpublicationsArchiveds(archivedData)
        } catch (error) {
            console.warn('FetchArchiveItems Posts - SelectItemsSaved');
            console.log(error)
        }
        try {

            const response = await getSavedDrops(idFolders, user.userId)
            const dropsAccount = response.data.response.data?.posts
            setpublicationsDrops(dropsAccount)
        } catch (error) {
            console.warn('FetchArchiveItems Drops - SelectItemsSaved');
            console.log(error)
        }
    };

    useEffect(() => {
        fetchArchiveItems()
    }, [])

    const handleDeleteFolder = async () => {
        await deleteFolder(params.folderId)
    }


    const navigateToPost = (postId: number, postHexId: string) => {
        setPostOptionsModal(!postOptionsModal)
        navigation.push("PostScreen", { isAquivaded: false, postId: postId, postHexId: postHexId });
    }

    const handleDeleteDrops = async () => {
        const userId = (user.userId);
        const idFolders = params.folderId;

        try {
            await delSaveDrops(userId, idFolders, dropTemp.postHexId)
            const res = await getSavedDrops(idFolders, user.userId);
            const dropsAccount = res?.data?.response?.dat?.posts || [];
            setDropTemp(null)
            fetchArchiveItems()
            setpublicationsDrops(dropsAccount);
            setPostOptionsModal(!postOptionsModal)
        } catch (error) {
            console.warn('delSaveDrops - SelectItemsSaved')
            console.log(error)
        }
    }

    const handleDeletePost = async () => {
        const userId = user.userId;
        try {
            delSavePost(userId, idFolder, postTemp.postId)
            const response = await getSavedPost(idFolder, user.userId);
            const archivedData = response?.data?.response?.data?.post || [];
            setPostTemp(null)
            fetchArchiveItems()
            setSearchPublicationsArchiveds(archivedData)
            setpublicationsArchiveds(archivedData);
            setPostOptionsModal(!postOptionsModal)
        } catch (error) {
            console.warn('delSavePost - SelectItemsSaved')
            console.log(error)
        }
    }
    const takePhotoFromGalery = async () => {
        try {
            const responsePicker = await ImagePicker.openPicker({
                width: 200,
                maxFiles: 1,
                mediaType: 'photo',
                cropperCancelText: 'Cancelar',
                cropperChooseText: 'Escolher',
                loadingLabelText: 'Carregando...',
                cropperTintColor: 'blue',
                height: 200,
                cropping: true,
            })
            setAlbumImage({
                uri: responsePicker.path,
                fileName: responsePicker.filename || '',
                mime: responsePicker.mime
            })
            savingFolder({
                uri: responsePicker.path,
                fileName: responsePicker.filename || '',
                mime: responsePicker.mime
            })
        } catch (error) {
            console.warn('openPicker - AlbumCreateSavedItems')
            console.log(error)
        }

    }

    const takePhotoFromCamera = async () => {
        try {
            const responseCamera = await ImagePicker.openCamera({
                width: 300,
                writeTempFile: true,
                compressImageQuality: 0.8,
                useFrontCamera: false,
                cropperCancelText: 'Cancelar',
                cropperChooseText: 'Escolher',
                height: 300,
                cropping: true,
            })

            savingFolder({
                uri: responseCamera.path,
                fileName: responseCamera.filename || '',
                mime: responseCamera.mime
            })

            setAlbumImage({
                uri: responseCamera.path,
                fileName: responseCamera.filename || '',
                mime: responseCamera.mime
            })
        } catch {
            console.warn('ImagePicker - Edit Album')
        }
    }

    const savingFolder = async (imageProps?: IImage) => {
        try {
            await updateFolder(idFolder, nameFolder, imageProps)
        } catch (error) {
            console.warn('UpdateFolder - SelectItemsSaved')
            console.log(error)
        }
    }

    useEffect(() => {
        navigation.addListener('blur', () => {
        })

        return () => {
            navigation.removeListener('blur', () => { })
        }
    }, [])



    return (
        <SafeAreaViewContainer>
            <Header
                titleHeader={params.nameFolder}

            />
            <Container style={{ backgroundColor: '#fff' }}
            >
                {!!albumImage ?
                    <ContainerImageAlbum>
                        <Image
                            source={{ uri: albumImage.uri }}
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: 'contain',
                                borderRadius: 5,
                            }}
                        />
                    </ContainerImageAlbum>
                    :
                    <ContainerImageAlbum>
                        <Image
                            source={{ uri: params.folderPhoto }}
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: 'cover',
                                borderRadius: 5,
                            }}
                        />
                    </ContainerImageAlbum>}

                <View style={{ flexDirection: "row", alignItems: 'center', gap: 10, justifyContent: 'center', top: -8 }}>
                    <TouchableOpacity onPress={takePhotoFromCamera}>
                        <Image source={require('../../Assets/Icons/camera.png')}
                            style={{ width: 19.5, height: 19.5, tintColor: '#5D5D5D', resizeMode: 'contain' }} />

                    </TouchableOpacity>
                    <TouchableOpacity onPress={takePhotoFromGalery}>
                        <Image source={require('../../Assets/Icons/galeryGrey.png')}
                            style={{ width: 20, height: 20, tintColor: '#5D5D5D', resizeMode: 'contain' }} />
                    </TouchableOpacity>
                </View>

                {editModeTitle ?
                    <ContainerTitle>
                        <TextInput
                            value={nameFolder}
                            maxLength={20}
                            onChangeText={setNameFolder}
                            style={{
                                fontSize: 16,
                                color: theme.inputTextColor,
                                fontFamily: fontStyle.regular,
                                borderBottomWidth: 1,
                                borderBottomColor: editModeTitle ? theme.inputTextColor : 'none',
                                marginLeft: 10,
                            }}
                        />
                        <ButtonEditTitle
                            onPress={() => {

                                savingFolder()
                                setEditModeTitle(!editModeTitle)
                            }}
                        >
                            <Icon
                                name='check-bold'
                                size={20}
                                color={theme.primarycolor}
                            />
                        </ButtonEditTitle>
                    </ContainerTitle>
                    :
                    <ContainerTitle>
                        <Title>
                            {nameFolder}
                        </Title>
                        <ButtonEditTitle
                            onPress={() => setEditModeTitle(!editModeTitle)}
                        >
                            <Icon
                                name='pencil'
                                size={18}
                                style={{ marginLeft: -2, marginRight: 4 }}
                                color={theme.primarycolor}
                            />
                        </ButtonEditTitle>
                    </ContainerTitle>}

                <Wrapper2>
                    <View style={{ flexDirection: 'column' }}>
                        <Title2>Pasta pública</Title2>
                        <Description>Todos podem visualizar essa pasta</Description>
                    </View>
                    <View style={{ marginTop: -6 }}>
                        <ToggleSwitch
                            value={isPublic}
                            setValue={toggleSwitch}
                        />
                    </View>
                </Wrapper2>



                {tabSelected === 0 && (
                    <CategoriesFilterPublications
                        categories={['Filme', 'Série', 'Livro', 'Música', 'Artigo', 'Podcast']}
                        textStyle={{ fontSize: 12 }}
                        marginLeft={'20px'}
                        styleCategoryContent={{ marginTop: 10, marginRight: 8, minWidth: 100, paddingHorizontal: 6, paddingBottom: 2, paddingTop: 2 }}
                        onPressCategoryButton={setFilter}
                    />)}
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

                {tabSelected === 0 && (
                    <FlatList
                        data={searchPublicationsArchiveds}
                        keyExtractor={(item) =>
                            item.postId ? item.postId.toString() : Math.random().toString()
                        }
                        numColumns={3}
                        scrollEnabled={false}
                        ListEmptyComponent={<TextNotPublicationsArchiveds style={{ alignSelf: 'center' }}>Não há publicações</TextNotPublicationsArchiveds>}
                        style={{ marginTop: 10 }}
                        renderItem={({ item }) => {
                            const mediaUrl = item.medias && item.medias[0] && item.medias[0].mediaUrl;
                            if (mediaUrl) {
                                return (
                                    <ArquivedCardPost
                                        source={{ uri: mediaUrl }}
                                        options={option}
                                        onPress={() => {
                                            setPostOptionsModal(!postOptionsModal)
                                            setPostTemp(item)
                                            setPost(item)
                                        }}
                                        styleType={publicationsInRows.length === 1 ? 'single' : publicationsInRows.length === 2 ? 'double' : 'triple'}
                                    />
                                )
                            }
                            if (item.postColor) {
                                const arrayColor = item.postColor.split('&')
                                return (
                                    <ArquivedCardPostColor
                                        legend={item.postLegend}
                                        options={option}
                                        backgroundColor={arrayColor[0]}
                                        fontColor={arrayColor[1]}
                                        onPress={() => {
                                            setPostOptionsModal(!postOptionsModal)
                                            setPostTemp(item)
                                            setPost(item)
                                        }}
                                        styleType={publicationsInRows.length === 1 ? 'single' : publicationsInRows.length === 2 ? 'double' : 'triple'}
                                    />
                                )
                            }
                        }}
                    />

                )}

                {tabSelected === 1 && (
                    <FlatList
                        data={publicationsDrops}
                        keyExtractor={(item, index) => 'drop' + index}
                        ListEmptyComponent={<TextNotPublicationsArchiveds style={{ alignSelf: 'center' }}>Não há nenhum Drops.</TextNotPublicationsArchiveds>}
                        numColumns={3}
                        scrollEnabled={false}
                        style={{ marginTop: 10 }}
                        renderItem={({ item }) => {
                            if (item.length > 0) {
                                return (
                                    <DropSavedCard
                                        drop={item[0]}
                                        onLongPress={() => {
                                            setPostOptionsModal(!postOptionsModal)
                                            setDropTemp(item[0])
                                        }}
                                    />
                                )
                            }
                            return <></>
                        }}
                    />
                )}

            </Container>
            <BottomModal
                title=''
                setvisibleBottonModal={() => setPostOptionsModal(!postOptionsModal)}
                children={
                    <>
                        <StoryOptions onPress={() => {
                            if (dropTemp) {
                                handleDeleteDrops()
                            } else {
                                handleDeletePost()
                            }
                        }}>
                            <Ionicons
                                name="trash-outline"
                                color={"#231F20"}
                                size={22}
                            />
                            <OptionText>{`Excluir publicação da pasta (${params.nameFolder})`}</OptionText>
                        </StoryOptions>
                        <StoryOptions onPress={() => navigateToPost(postTemp.postId, postTemp.postHexId)}>
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
                        {/*      <StoryOptions onPress={() => {
                            setItemsOption(!itemsOption)
                            setOption(!option)
                            //setConfirmDeleteFolder(!confirmDeleteFolder)
                        }}>
                            <Ionicons
                                name="albums-outline"
                                color={"#231F20"}
                                size={22}
                            />
                            <OptionText>{`Selecionar`}</OptionText>
                        </StoryOptions> */}
                        {/*  <StoryOptions onPress={() => {
                            setItemsOption(!itemsOption)
                            //setConfirmDeleteFolder(!confirmDeleteFolder)
                        }}>
                            <Ionicons
                                name="add"
                                color={"#231F20"}
                                size={22}
                            />
                            <OptionText>{`Adicionar`}</OptionText>
                        </StoryOptions> */}

                        <StoryOptions onPress={() => {
                            setItemsOption(!itemsOption)
                            setConfirmDeleteFolder(!confirmDeleteFolder)
                        }}>
                            <Ionicons
                                name="trash-outline"
                                color={"#231F20"}
                                size={22}
                            />
                            <OptionText>{`Excluir`}</OptionText>
                        </StoryOptions>
                    </>
                }
                visibleBottonModal={itemsOption}
            />
            <ConfirmModal
                title="Excluir pasta?"
                text="Quando você excluir essa pasta, as fotos e os videos continuarão salvos."
                onCancel={() => {
                    setConfirmDeleteFolder(!confirmDeleteFolder)
                }}
                onConfirm={() => {
                    setConfirmDeleteFolder(!confirmDeleteFolder)
                    handleDeleteFolder()
                    navigation.pop()
                }}
                setvisibleBottonModal={setConfirmDeleteFolder}
                isModalVisible={confirmDeleteFolder}
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