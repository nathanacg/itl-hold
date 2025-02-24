import React, { useEffect, SetStateAction, useState, useRef } from "react";
import { ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View } from "react-native";

import {
    ContainerComent,
    ContainerActionComment,
    UserInfo,
    UserName,
    CommentTime,
    Content,
    CommentInfo,
    Likes,
    Answers,
    AnswersText,
    CommentImage,
    UserImageContainer,
    SeeAnswers,
    MainContainer,
    LikeContainer,
    UserImage
} from "./style";

import Ionicons from "react-native-vector-icons/Ionicons";
import { fontSize, fontStyle, theme } from "../../Theme/theme";
import { deleteCommentLike, getCommentLikes, newCommentLike } from "../../Service/Like";
import useCreateComment from "../../GlobalState/handleComments.zustand";

import { getStoreObject } from "../../Lib/asyncStorage";
import { useNotification } from "../../context/notification";
import NavigateToProfile from "../NavigatetoProfile";

import UserImageRounded from "../UserImageProfile";
import { getVerfication } from "../../Service/Profile";
import { Verified } from "../Verified";
import { SendButton } from "../AddComment/style";
import { colors } from "react-native-elements";
import { newAnswer } from "../../Service/Comment";
interface CommentProps {
    createdAt: string
    content: string
    userImage: string
    isLiked?: boolean
    isAnswer?: boolean
    answerCount?: string
    openAnswer?: () => void
    isAnswerClose?: boolean
    darkLike?: boolean
    setCurrentComment?: () => void
    id: number
    postHexId: string
    userId: number
    onCommentAdd?: () => void
    userNickName: string
    commentedId?: number
    setvisibleBottonModal?: React.Dispatch<SetStateAction<boolean>>
}

export default function Comment(props: CommentProps) {
    const [isLiked, setIsliked] = useState(false)
    const [likes, setLikes] = useState<any[]>([])

    const { setCommentId, setCommentType, setReloadComment, reloadComments } = useCreateComment()

    const { sendNotificationLikeComment } = useNotification()

    const [verified, setVerified] = useState<number>(0)
    const [loadLikesComments, setLoadLikesComments] = useState<boolean>(true)
    const [resComment, setResComment] = useState<boolean>()
    const [value, setValue] = useState<string>('')
    const [valueRes, setValueRes] = useState<string>('@' + props.userNickName + '')
    const [loading, setLoading] = useState<boolean>(false)
    const inputRef = useRef<TextInput>(null)


    const { sendNotificationCommentPost } = useNotification()


    useEffect(() => {
        getVerfication(props.userId)
            .then((response) => {
                const verified = response.data.result[0].user_verified
                setVerified(verified)
            })
            .catch((e) => {
                console.warn('GetVerfication - Comment')
                console.log(e)
            })
    }, [])

    const handleLike = (async () => {
        if (!isLiked) {
            await newCommentLike(props.id)
            sendNotificationLikeComment(props.id, props.isAnswer || false)

            getLikes()
        }
        else if (isLiked) {
            await deleteCommentLike(props.id)
            const response = await getCommentLikes(props.id)
            setLikes(response.data.users)
        }
    })

    const getLikes = () => {
        getCommentLikes(props.id)
            .then(res => {
                setLikes(res.data ? res.data.users : []);
            })
            .catch((e) => {
                console.warn('GetCommentLikes - Comment')
                console.log(e)
            }).finally(() => {
                setLoadLikesComments(false)

            })
    }
    useEffect(() => {
        getLikes();
    }, [])

    useEffect(() => {
        getStoreObject("@intellectus:userProfile")
            .then(res => {

                const filteredLikes: any[] = likes.find(like => like.userNickname == res.userNickname)
                setIsliked(filteredLikes)
            })
            .catch((e) => {
                console.warn('GetStoreObject - Comment')
                console.log(e)
            })
    }, [loadLikesComments])


    function contemApenasUmEmoji(text: string) {
        const emojiRegex = /[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}]/ug;

        const emojisEncontrados = text.match(emojiRegex);

        if (!emojisEncontrados || emojisEncontrados.length !== 1) {
            return false;
        }

        return true;
    }

    const formatText = () => {
        const parts = props.content.split(' ');

        if (props.content.includes('@')) {
            return parts.map((part, mark) => {

                if (part.includes('@')) {
                    return (
                        <NavigateToProfile
                            key={mark}
                            onPress={() => props.setvisibleBottonModal && props.setvisibleBottonModal(false)}
                            userNickName={part.slice(1)}
                            setvisibleBottonModal={props.setvisibleBottonModal}
                        >
                            <Text style={{ fontSize: 13.4, color: '#081B74' }}>
                                {`${part} `}
                            </Text>
                        </NavigateToProfile>
                    )
                } else {
                    return (
                        <Text key={mark} style={{ fontSize: 13.4 }}>
                            {`${part} `}
                        </Text>
                    )
                }
            })
        } else {
            return (
                <Text style={{
                    fontSize: contemApenasUmEmoji(props.content) ? 23 : 13.4,
                    color: `${theme.textDark}`,
                }}>
                    {props.content}
                </Text>
            )
        }
    };

    const sendAwnser = async () => {
        try {
            setLoading(true)

            const res = await newAnswer({ postHexId: props.postHexId, commentText: value, commentedId: props.id })

            sendNotificationCommentPost(res?.data?.commentedId, props.postHexId, true)
            setReloadComment(!reloadComments)

            setResComment(false)
        } catch (err) {
            console.warn("responderComentario", err)
        } finally {
            setLoading(false)
        }
    }

    const onChangeText = (text: string) => {
        setValueRes(text);
    }

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
                setCommentType("comentary")
            }}>
            <>
                <ContainerComent style={props.isAnswer ? { width: 302 } : ''}>
                    <UserImageContainer>
                        <UserImageRounded url={props.userImage} size={props.isAnswer ? 35 : 40} />
                    </UserImageContainer>
                    <MainContainer>
                        <UserInfo>
                            <NavigateToProfile onPress={() => props.setvisibleBottonModal && props.setvisibleBottonModal(false)} userNickName={props.userNickName}>
                                <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 3 }}>
                                    <UserName>{props.userNickName}</UserName>
                                    {verified === 1 && <Verified width={10} height={10} />}
                                </View>
                                <CommentTime>{props.createdAt}</CommentTime>
                            </NavigateToProfile>
                        </UserInfo>

                        <Content>
                            {formatText()}
                        </Content>

                    </MainContainer>
                    <LikeContainer onPress={() => {
                        handleLike()
                        setIsliked(!isLiked)
                    }}>
                        {props.darkLike ? (
                            <Ionicons
                                name={isLiked ? "heart" : "heart-outline"}
                                size={25}
                                color={"#000"}
                            />
                        ) : (
                            <Ionicons
                                name={isLiked ? "ios-heart" : "ios-heart-outline"}
                                size={25}
                                color={theme.primarycolor}
                            />
                        )}
                    </LikeContainer>
                </ContainerComent>
                <ContainerActionComment>
                    <CommentInfo>
                        <Likes>{likes.length <= 1 ? `${likes.length} curtida` : `${likes.length}  curtidas`} </Likes>
                        <Answers onPress={() => {
                            props.isAnswer && props.commentedId ? setCommentId(props.commentedId) : setCommentId(props.id)
                            setResComment(true)
                        }}>
                            <CommentImage source={require("../../Assets/Icons/comment-small-gray.png")} />
                            <AnswersText>responder</AnswersText>
                        </Answers>

                    </CommentInfo>

                    {resComment && <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '90%',
                        borderBottomWidth: 0.9,
                        borderColor: colors.grey3
                    }}>

                        <UserImage source={{ uri: props.userImage, cache: "reload" }} />

                        <TextInput
                            ref={inputRef}
                            style={{ flex: 1, padding: 10, color: theme.inputTextColor }}
                            placeholderTextColor={theme.inputTextColor}
                            onChangeText={(text) => onChangeText(text)}
                            value={valueRes}
                            placeholder={'Responder comentário...'}
                        />

                        <SendButton onPress={sendAwnser}>

                            {loading ? (
                                <ActivityIndicator size="small" color={theme.primarycolor} />
                            ) : (
                                <Image style={{ width: 21, height: 21, resizeMode: 'contain' }} source={require("../../Assets/Icons/sendBlue.png")} />
                            )}
                        </SendButton>
                    </View>}
                    {props.answerCount && props.isAnswerClose && (
                        <SeeAnswers onPress={props.openAnswer}>
                            Ver {props.answerCount} {props.answerCount.length > 1 ? 'respostas' : 'resposta'}
                        </SeeAnswers>
                    )}
                </ContainerActionComment>
            </>
        </TouchableOpacity>
    )
}