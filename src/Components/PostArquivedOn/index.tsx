import React, { SetStateAction, useEffect, useState } from "react"
import BottomModal from "../BottomModal"
import { Alert, Image, View } from "react-native"
import { OptionText, StoryOptions } from "./style"
import Popout from "../Popout"
import ShareModal from "../ShareModal"
import DenunciaModal from "../DenunciaModal"
import SelectUsesModal from "../SelectUsersModal"
import ConfirmModal from "../ConfirmModal"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"
import Info from "../Info"
import { shareLink } from "../../Utils/share"
import { deleteStorie, getUserStories } from "../../Service/Story"
import useStories from "../../GlobalState/stories.zustand";
import useFeedData from "../../GlobalState/feed.zustand"
import StoryList from "../../Pages/Feed/components/Cartaz"
import useUserProfile from '../../GlobalState/userProfile.zustand';
import { useNavigation } from '@react-navigation/native';
import { deletePost } from '../../Service/Publications';
import { StackRoutes } from "../../Routes/StackTypes";
import { archiveItens } from '../../Service/Profile';
import { bodyArquiveItems, unArquiveItems } from '../../Service/Profile';
import axios from "axios"




interface PostOptionsProps {
    visibleBottonModal: boolean
    setvisibleBottonModal: (postUserId?: number) => void
    spoilerOnDenuncia?: boolean
    onClose?: () => void
    postUserId: number
    followingUser: number
    admin?: boolean
    type?: 'Cartaz' | 'drops'
    onEdit?: () => void
    onDeletePost?: () => void
    postUrl: string
    followEnable: boolean
    onPostDeleted: () => void;
    onDeleteStorie?: () => void;
    postHexId: string
    postId: number
    isArquivaded?: void
};


export default function PostArquivadedOn(props: PostOptionsProps) {
    const [silence, setSilence] = useState(false)
    const [isDenunciaModalOpen, setIsdenunciaModalOpen] = useState(false)
    const [isShareModalOpen, setIsShareModalOpen] = useState(false)
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
    const [isArquive, setIsArquive] = useState(false);
    const [userProfile, setUserProfile] = useState<number>();
    const { user } = useUserProfile()

    useEffect(() => {
    }, [user.userId]);

    useEffect(() => {
        setUserProfile(user.userId);
    }, [user]);

    useEffect(() => {
        setIsArquive(props.isArquivaded);
    }, [props.isArquivaded]);


    const [confirmDeletePost, setConfirmDeletePost] = useState(false)

    // const [confirmDeleteStory, setConfirmDeleteStory] = useState(false)

    const [showSmallPopup, setshowSmallPopup] = useState(false)
    const [popoutText, setPopoutText] = useState("")
    const [isUsersModalOpen, setIsUsersModalOpen] = useState(false)
    const [markedUsers, setMarkedUsers] = useState<{ name: string, address: string }[]>([])


    const [followingUser, setfollowingUser] = useState(props.followingUser)

    const navigation = useNavigation<StackRoutes>();


    const handlePopout = (text: string) => {
        setPopoutText(text)
        props.setvisibleBottonModal()
        setshowSmallPopup(true)
    }

    const addFriend = () => {
        postFolowingProfile(props.postUserId)
        setfollowingUser(1)
    }

    const removeFriend = () => {
        deltFolowingProfile(props.postUserId)
        setfollowingUser(0)
    }

    const deleteMyPost = async () => {
        try {
            await deletePost(props.postHexId)
            setConfirmDeletePost(false)
            navigation.push('MyProfileScreen');

        } catch (error) {
            console.log(error);
        }

    };

    const arquivated = () => {
        let postId = props.postId;
        let userId = user.userId;
        if (isArquive == false) {
            archiveItens(postId, userId)
                .then((response) => {
                })
                .catch((e) => {
                    console.warn('ArchiveItems - PostArquivedOn')
                    console.log(e)
                })
        } else {
            unArquiveItems(postId, userId)
                .then(response => {
                    navigation.push('ArchivedItems');

                })
                .catch((e) => {
                    console.warn('UnArchiveItems - PostArquivedOn')
                    console.log(e)
                })
        }

    }

    return (

        <>
            <BottomModal
                visibleBottonModal={props.visibleBottonModal}
                setvisibleBottonModal={() => {
                    props.onClose && props.onClose()
                    props.setvisibleBottonModal()
                }}
                title=""
                children={
                    <View>

                        <StoryOptions onPress={() => { arquivated(), setIsArquive(!isArquive) }}>
                            {!isArquive ? (
                                <MaterialCommunityIcons
                                    name="archive-check-outline"
                                    color={"#231F20"}
                                    size={23}
                                />
                            ) : (
                                <MaterialCommunityIcons
                                    name="archive-cancel-outline"
                                    color={"#231F20"}
                                    size={23}
                                />
                            )}

                            {!isArquive ? (
                                <OptionText>Arquivar</OptionText>
                            ) : (
                                <OptionText>Desarquivar</OptionText>
                            )}
                        </StoryOptions>

                    </View >
                }
            />

            < ConfirmModal
                isModalVisible={isConfirmModalOpen}
                title="Deixar de seguir"
                text="Você tem certeza? Caso queira seguir novamente, terá que fazer uma nova solicitação."
                onCancel={() => {
                    props.onClose && props.onClose()
                    setIsConfirmModalOpen(false)
                }}
                onConfirm={() => {
                    props.onClose && props.onClose()
                    setIsConfirmModalOpen(false)
                    removeFriend()
                }} postHexId={""}
            />


            <ConfirmModal
                isModalVisible={confirmDeletePost}
                title="Excluir publicação"
                text="Caso exclua essa publicação ela não ficará disponível no seu feed"
                onCancel={() => {
                    setConfirmDeletePost(false)
                }}
                onConfirm={() => {
                    props.onDeletePost && props.onDeletePost()
                    setConfirmDeletePost(true)
                    deleteMyPost()
                }} postHexId={""}
            />

        </>
    )
};