import { SetStateAction, useEffect, useState } from "react"
import { Image, TouchableOpacity, View, FlatList } from "react-native"

import { useNavigation } from "@react-navigation/native";
import { StackRoutes } from "../../Routes/StackTypes";

import {
    CloseScationContainer,
    Container,
    SocialActions
} from "./style"

import { theme } from "../../Theme/theme";
import SelectUsesrModal from "../SelectUsersModal";
import { getStoreObject } from "../../Lib/asyncStorage";
import Ionicons from "react-native-vector-icons/Ionicons";

import useCreateComment from "../../GlobalState/handleComments.zustand";

import { useSocket } from "../../context/socket";
import useUserProfile from "../../GlobalState/userProfile.zustand";
import { getUserFolders, saveDrops, savePostItem, unsaveDrops, unsavePostItem } from "../../Service/Profile";
import BottomModal from "../BottomModal";

import PostersBottom from "../PostersBottom";
import Button from "../Button";
import { CardImageCreateAlbum, TextRegularSmall } from "../../Pages/PostPreview/style";
import { typeTheme } from "../../Config/enumTheme";
import useCreatePost from "../../GlobalState/createPost.zustand";
import useDropsStore from "../../GlobalState/drops.zustand";

interface PostFooterProps {
    postHexId: string
    liked?: boolean
    setLiked: React.Dispatch<SetStateAction<boolean>>
    saved?: boolean
    // onCommentPress: () => void
    updateLikes: () => void
    userId: number
    likeList: { likeId: number; userId: number; postHexId: string; profileImage: string; userName: string; userNickname: string; }[]
    openComment: () => void
    handleLike: () => void
    postId?: number
    mediaImage: string
    isSaved: boolean
    userImage: string
    userNickname: string
    time?: any
}

interface Folder {
    idFolders: number;
    userId: number;
    foldersName: string;
    story_saved: any;
    post_saved: any;
    reels_saved: any;
    cover_url: {
        mediaUrl: string;
    };
}

interface Data {
    folders: Folder[];
    message: string;
}

export default function PostFooterDrop(props: PostFooterProps) {
    const navigation = useNavigation<StackRoutes>()
    const [liked, setLiked] = useState<boolean>()
    const [saved, setSaved] = useState(props.isSaved)
    const [openModal, setopenModal] = useState(false)
    const [messageText, setMessageText] = useState<string>("")
    const { user } = useUserProfile();
    const { setCommentType } = useCreateComment()

    const [shareModal, setShareModal] = useState(false)
    const [selectedUsers, setSelectedUsers] = useState<{ name: string; address: string; userId?: number }[]>([])
    const [data, setData] = useState<Data | null>(null);
    const [requestCount, setRequestCount] = useState(0);
    const { setPostHexId } = useCreatePost()

    const { sendPost } = useSocket()

    useEffect(() => {
        getStoreObject("@intellectus:userProfile")
            .then(res => {
                const like = props.likeList ? props.likeList.find(item => item.userId == res.userId) : null
                if (like) {
                    props.setLiked(true)
                } else {
                    props.setLiked(false)
                }
            })
            .catch((e) => {
                console.warn('GetStoreObject - PostFooterDrop')
                console.log(e)
            })
    }, [props.likeList])

    useEffect(() => {
        const fetchUsersFolder = async () => {
            try {
                const response = await getUserFolders(user.userId);
                setData(response.data);
                setRequestCount(requestCount + 1);
            } catch (error) {
                console.warn('fetchUsersFolder - PostFooterDrop')
                console.error(error);
            }
        };
        fetchUsersFolder();

    }, [openModal]);

    const saveItems = async (idFolders: number) => {
        setSaved(!saved)
        setopenModal(!openModal)
        const postId = (props.postHexId);
        const userId = (user.userId);

        if (saved == false) {
            try {
                await saveDrops(userId, idFolders, postId);
            } catch (error) {
                console.warn('saveItems - PostFooterDrop')
                console.error(error);
            }
        } else {
            unsaveDrops(userId, idFolders, postId);
        }

    }


    return (
        <>
            <Container>
                <SocialActions>
                    <TouchableOpacity onPress={() => {
                        props.handleLike()
                        props.setLiked(!liked)
                    }}>
                        <Ionicons
                            name={props.liked ? "ios-heart" : "ios-heart-outline"}
                            size={28}
                            color={theme.primarycolor}
                            style={{ marginRight: -2 }}
                            adjustsFontSizeToFit
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setCommentType("comentary")
                        props.openComment()
                    }}>
                        <Image style={{ width: 25, height: 25, resizeMode: "contain" }} source={require("../../Assets/Icons/comment.png")} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setShareModal(true)}>
                        <Image style={{ width: 24, height: 25, resizeMode: "contain" }} source={require("../../Assets/Icons/share.png")} />
                    </TouchableOpacity>
                </SocialActions>
                <CloseScationContainer>
                    <TouchableOpacity onPress={() => { setopenModal(!openModal) }}>
                        <Image style={{ width: 20, height: 25, resizeMode: "contain" }} source={saved ? require("../../Assets/Icons/saveButtonFill.png") : require("../../Assets/Icons/saveButton.png")} />
                    </TouchableOpacity>
                </CloseScationContainer>

            </Container>
            <SelectUsesrModal
                visibleBottonModal={shareModal}
                setvisibleBottonModal={setShareModal}
                markedUsers={selectedUsers}
                setMarkedUsers={setSelectedUsers}
                messageOption
                setMessageText={setMessageText}
                onSend={(text) => sendPost(selectedUsers.map(item => item.userId || 0), props.postHexId, text || null)}
                mediaImage={props.mediaImage}
            />
            <BottomModal
                children={
                    <View style={{ alignItems: 'center', justifyContent: 'center', height: 180 }}>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={data?.folders || []}
                            keyExtractor={(item, index) => `${item.idFolders}${index}`}
                            contentContainerStyle={{ marginTop: 16, gap: 3 }}
                            ListHeaderComponent={
                                <CardImageCreateAlbum onPress={() => {
                                    setopenModal(!openModal)
                                    setPostHexId(props.postHexId)
                                    navigation.push("AlbumCreateSaveditems")
                                }}>
                                    <Ionicons
                                        name='add-circle'
                                        size={32}
                                        style={{ marginLeft: 5 }}
                                        color={"#0245F4"}
                                    />
                                </CardImageCreateAlbum>
                            }

                            renderItem={({ item }) => {
                                return (
                                    <PostersBottom
                                        imageUrl={item.cover_url.mediaUrl}
                                        title={item.foldersName}
                                        navigation={() => {
                                            {
                                                saveItems(item.idFolders)
                                            }
                                        }}
                                    />
                                )
                            }}
                        />
                    </View>
                }
                title='Salvar na pasta'
                visibleBottonModal={openModal}
                setvisibleBottonModal={() => { }}
            />
            {/* <ShareModal
                postUrl={props.postHexId}
                setvisibleBottonModal={setShareModal}
                visibleBottonModal={shareModal}
            /> */}
        </>

    )
}