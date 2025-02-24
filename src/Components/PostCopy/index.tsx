import React, { SetStateAction, memo, useEffect, useRef, useState } from "react";
import { Text, Image, View, TouchableOpacity, TextInput, KeyboardAvoidingView } from "react-native";
import PostImage from "../PostImage";
import PostFooter from "../PostFooter";
import HeaderPublication from "../HeaderPost";

import {
    Container,
    PostLegend,
    AvaliationConteiner,
    AvaliationText,
    Likes,
    MaskSpoiler,
    MarkText,
    MaskButtonText,
    Bold,
    TimerPublicationContent,
    TimerPublication
} from "./style";
import PostComment from "../PostComment";
import AudioContainer from "../AudioContainer";
import { medias } from "../../Types/feedProps";
import { deleteLike, getLikes, newLike } from "../../Service/Like";
import { getComments } from "../../Service/Comment";
import useCreatePostCurrent from "../../GlobalState/currentPost.zustand";
import PostOptions from "../PostOptions";
import { deletePost, getMovie, updatePost } from "../../Service/Publications";
import DocumentCard from "../DocumentCard";
import useFeedData from "../../GlobalState/feed.zustand";
import Toast from "react-native-toast-notifications/lib/typescript/toast";
import { theme } from "../../Theme/theme";
import { emojiFace } from "../../Utils/emojiFaceAvaliation";
import { getStoreObject } from "../../Lib/asyncStorage";
import BottomModal from "../BottomModal";
import ComentsList from "../../Pages/Feed/components/ComentsList";
import SearchInput from "../SearchInput";
import LikesList from "../../Pages/Feed/components/LikesList";
import { useNotification } from "../../context/notification";
import SelectedMovie from "../SelectedMovie";
import { MovieProps } from "../../Types/postProps";
import PostArquivadedOn from "../PostArquivedOn";
import { useNavigation } from "@react-navigation/native";
import { StackRoutes } from "../../Routes/StackTypes";

interface postProps {
    userNickname: string
    profileImage: string
    followingUser: number
    medias: medias[],
    postLegend: string,
    avaliationPost?: string,
    postActions: boolean
    hasSpoiler?: boolean
    // handleOpenBottomModal?: (type: 'comments' | 'likes') => void
    paddingTop?: string
    postHexId: string
    userId: number
    postDate: string
    tmdbMovieId: number | null
    postId: number
    isArquivaded?: void
}
const PostCopy = memo((props: postProps) => {

    const inputRef = useRef<TextInput>(null)
    const [newLegend, setNewLegend] = useState(props.postLegend)
    // const { setPostId } = useCreatePostCurrent()
    const [hideSpoiler, setHideSpoiler] = useState<boolean>()
    // const [isLiked, setIsLiked] = useState(false)
    const [likes, setLikes] = useState([])
    const [postOptionsModal, setPostOptionsModal] = useState(false)
    const [isUserAdmin, setIsUserAdmin] = useState(false)
    const [onEdit, setOnEdit] = useState(false)
    const [userImage, setUserImage] = useState("")
    const docExtension = ["txt", "doc", "docx", "pdf", "xlsx", "xls", "ppt", "pptx", "csv", "rtf", "odt", "ods", "odp"]

    const [visibleBottonModal, setvisibleBottonModal] = useState<boolean>(false)
    // const [titleBottomModal, setTitleBottomModal] = useState<string>('')
    const [typeBottonModal, setTypeButtonModal] = useState<'Comentários' | 'Curtidas'>('Comentários')
    const { sendNotificationLikedPost } = useNotification()
    const [liked, setLiked] = useState<boolean>(false)
    const [likeCount, setLikeCount] = useState(likes.length)

    const [movie, setMovie] = useState<MovieProps>()

    const { initializeFeed } = useFeedData()

    const navigation = useNavigation<StackRoutes>()

    const handleEdit = () => {
        setPostOptionsModal(false)
        setOnEdit(!onEdit)
        inputRef.current?.focus()
    }

    const updateLikes = () => {
        getLikes(props.postHexId)
            .then(res => {
                setLikes(res.data.users)
            })
            .catch((e) => {
                console.warn('UpdateLikes - PostCopy')
                console.log(e)
            })
    }

    const setUpdatePost = async () => {
        const res = await updatePost(
            {
                postHexId: props.postHexId,
                postLegend: newLegend,
                marked_users: []
            })

        setOnEdit(false)
    }

    const deleteMyPost = async () => {
        deletePost(props.postHexId)
            .then(res => {
                if (navigation.canGoBack()) {
                    navigation.goBack()
                }
                initializeFeed()
            })
            .catch((e) => {
                console.warn('DeletePost - PostCopy')
                console.log(e)
            })
    }

    useEffect(() => {
        props.hasSpoiler && setHideSpoiler(true)
        if (props.tmdbMovieId) {
            getMovie(props.tmdbMovieId).then(res => {
                setMovie(res.data)
            })
                .catch((e) => {
                    console.warn('GetMovie - PostCopy')
                    console.log(e)
                })
        }
    }, [])

    useEffect(() => {
        updateLikes()
    }, [])

    useEffect(() => {
        getStoreObject("@intellectus:userProfile")
            .then(res => {
                props.userId == res.userId ? setIsUserAdmin(true) : setIsUserAdmin(false)
                setUserImage(res.profileImage)
            })
            .catch((e) => {
                console.warn('GetStoreObject - PostCopy')
                console.log(e)
            })
    }, [])

    useEffect(() => {
        if (inputRef.current && onEdit === true) {
            setTimeout(() => {
                inputRef.current?.blur();
                inputRef.current?.focus()
            }, 100);
        }
    }, [onEdit])

    const handleBottonModal = (type: 'Comentários' | 'Curtidas') => {
        setvisibleBottonModal(!visibleBottonModal)
        // if (type === "comments") {
        //   setTitleBottomModal('Comentários')
        // } else if (type === "likes") {
        //   setTitleBottomModal('Curtidas')
        // }
        setTypeButtonModal(type)
    }

    const handleLike = async (notUnLiked?: boolean) => {
        if (!liked) {
            const res = await newLike({ postHexId: props.postHexId })
            setLikeCount(pv => pv + 1)
            updateLikes()
            sendNotificationLikedPost(props.postHexId)
            setLiked(true)

        } else if (!notUnLiked) {
            const res = await deleteLike({ postHexId: props.postHexId })
            setLikeCount(pv => pv - 1)
            updateLikes()
            setLiked(false)
        }
    }

    const inputStyle = {
        margin: 14,
        backgroundColor: '#fbfbfb',
        fontSize: 16,
        border: 1,
        color: theme.inputTextColor,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        borderColor: '#0245F4',
        borderWidth: 0.5,
        borderRadius: 6
    };


    return (
        <View>
            <HeaderPublication
                userId={props.userId}
                postDate={props.postDate}
                onEdit={onEdit}
                onSave={setUpdatePost}
                userNickname={props.userNickname}
                profileImage={props.profileImage}
                hasSpoiler={props.hasSpoiler}
                showSpoiler={!hideSpoiler}
                action={() => setPostOptionsModal(!postOptionsModal)}
            />
            <Container paddingTop={props.paddingTop}>

                {hideSpoiler && (
                    <MaskSpoiler>
                        <Image source={require("../../Assets/Icons/spoilerIcon.png")} />
                        <MarkText>Publicação ocultada por conter <Bold>spoiler.</Bold></MarkText>
                        <TouchableOpacity onPress={() => setHideSpoiler(false)}>
                            <MaskButtonText>Ver spoiler</MaskButtonText>
                        </TouchableOpacity>
                    </MaskSpoiler>
                )}
                {onEdit ? (
                    <TextInput
                        style={inputStyle}
                        ref={inputRef}
                        value={newLegend}
                        onChangeText={setNewLegend}
                        autoFocus
                    />
                ) : (
                    <PostLegend>{newLegend}</PostLegend>
                )}

                {
                    props.medias?.forEach(midia => (
                        docExtension.some(word => midia.mediaExtension.includes(word)) &&
                        <DocumentCard
                            position={{ x: 0, y: 0 }}
                            docInfos={{ name: midia.mediaName || '', url: midia.mediaUrl, size: midia.mediaSize }}
                            scale={1}
                            absolute={false}
                        />

                    ))
                }

                {props.avaliationPost && (
                    <AvaliationConteiner>
                        <AvaliationText>Avaliou como
                            <Text style={props.avaliationPost == "Excelente" ? { color: '#44AB1B' } :
                                props.avaliationPost == "Bom" ? { color: '#B6CE3A' } :
                                    props.avaliationPost == "Nada mal" ? { color: '#F9C900' } :
                                        props.avaliationPost == "Ruim" ? { color: '#F28A19' } :
                                            props.avaliationPost == "Muito ruim" && { color: '#EA3106' }
                            }>
                                {` ${props.avaliationPost}`}
                            </Text></AvaliationText>
                        {props.avaliationPost && <Image style={{ width: 20, height: 20 }} source={emojiFace.find((item) => item.name === props.avaliationPost)?.selectedImage} />}

                        {/* <AvaliationText>Avaliou como <Text style={{ color: '#44AB1B' }}>{props.avaliationPost}</Text></AvaliationText>
                        <Image source={require("../../Assets/Icons/avaliationEmoji.png")} /> */}
                    </AvaliationConteiner>
                )}
                <PostImage handleLike={handleLike} medias={props.medias?.filter(media => media.mediaExtension == "jpeg" || media.mediaExtension == "png" || media.mediaExtension == "jpg")} />
                {movie &&
                    <View style={{
                        margin: 10
                    }}>
                        <SelectedMovie
                            name={movie.movieTitle}
                            description={movie.movieOverview}
                            ImageUrl={movie?.movieImagens?.poster_sizes?.w342} />
                    </View>
                }
                {props.postActions && (
                    <>
                        <PostFooter
                            openComment={() => handleBottonModal('Comentários')}
                            likeList={likes} userId={props.userId}
                            updateLikes={updateLikes}
                            liked={liked}
                            postHexId={props.postHexId}
                            handleLike={handleLike}
                            setLiked={setLiked}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                            <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => {
                                // setPostId(props.postHexId)
                                handleBottonModal('Curtidas')
                            }}>
                                <Likes>{likes.length} curtidas</Likes>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </Container>
            {props.postActions && (
                <PostComment createdAt={props.postDate} profileImage={userImage} postHexId={props.postHexId} openComment={() => handleBottonModal('Comentários')} />
            )}

            <PostArquivadedOn
                followEnable
                postUrl={`https://post.intellectus.app.br/${props.postHexId}`}
                visibleBottonModal={postOptionsModal}
                setvisibleBottonModal={() => setPostOptionsModal(!postOptionsModal)}
                admin={isUserAdmin}
                onEdit={handleEdit}
                onDeletePost={deleteMyPost}
                postUserId={props.userId}
                followingUser={props.followingUser === 1} onPostDeleted={function (): void {
                    throw new Error("Function not implemented.");
                }} postHexId={""}
                postId={props.postId}
                isArquivaded={props.isArquivaded}
            />

            <BottomModal
                visibleBottonModal={visibleBottonModal}
                setvisibleBottonModal={setvisibleBottonModal}
                title={typeBottonModal}
                marginLeftRight='0'
                children={
                    <View>
                        {typeBottonModal === "Comentários" && (
                            <ComentsList setvisibleBottonModal={setvisibleBottonModal} postId={props.postHexId} />
                        )}
                        {typeBottonModal === "Curtidas" && (
                            <>
                                {/* <View style={{ paddingLeft: '6%', paddingRight: '6%' }}>
                                    <SearchInput
                                        marginTop='12px'
                                        onSetText={setSearchText}
                                        value={searchText}
                                    />
                                </View> */}
                                <LikesList postId={props.postHexId} />
                            </>
                        )}
                    </View>
                }
            />
        </View>
    )
})


export default PostCopy