import React, { SetStateAction, useEffect, useRef, useState } from "react"
import { ActivityIndicator, FlatList, Image, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, View } from "react-native"

import { AnswerContainer, Container, UserImage, SendButton, UserImageMark } from "./style"

import { newAnswer, newComment } from "../../Service/Comment"
import useCreateComment from "../../GlobalState/handleComments.zustand"

import { theme } from "../../Theme/theme"
import { useNotification } from "../../context/notification"

import Modal from 'react-native-modal'

import { BottomContainer, TopSpace, TopSpaceContainer } from "../BottomModal/style"

import { ListFollowers } from "../../Pages/MyFollowers/Components/Followers"
import { getFollowers } from "../../Service/Followers"
import useUserProfile from "../../GlobalState/userProfile.zustand"
import ListUsersMarcations from "../ListUsersMarcartions"
import { Text } from "react-native-elements"

interface AddCommentProps {
    postHexId: string
    commentId: string
    onFocus: boolean
    profileImage: string
    onCommentAdd: () => void
    setReloadAll: React.Dispatch<SetStateAction<boolean>>
    marcation: () => void
    setModal: React.Dispatch<SetStateAction<boolean>>
}

export default function AddComment(props: AddCommentProps) {

    const inputRef = useRef<TextInput>(null)
    const [value, setValue] = useState('')
    const { commentId, setReloadComment, reloadComments, commentType, setCommentType } = useCreateComment()

    const [loading, setLoading] = useState(false)

    const [followers, setFollowers] = useState<ListFollowers[]>([])

    const [usersMarcations, setUsersMarcations] = useState<boolean>(false)

    const { sendNotificationCommentPost } = useNotification()

    const onChangeText = (text: string) => {
        setValue(text)
    }

    const { user } = useUserProfile()

    const handleNewComment = async () => {
        if (loading) {
            return
        }
        if (commentType == "comentary" && value) {
            setLoading(true)
            try {
                const res = await newComment({ postHexId: props.postHexId, commentText: value, marcations: [] });
                sendNotificationCommentPost(res?.data?.commentId, props.postHexId, false)
                props.onCommentAdd()
            } catch (error) {
            } finally {
                setLoading(false)
            }
        } else if (value) {
            setLoading(true);
            try {
                const res = await newAnswer({ postHexId: props.postHexId, commentText: value, commentedId: commentId });
                sendNotificationCommentPost(res?.data?.commentedId, props.postHexId, true)
                setReloadComment(!reloadComments)
                setCommentType("comentary")
            } catch (error) {
                console.error('Erro ao responder o comentário', error)
            } finally {
                setLoading(false)
            }
        }
        props.setReloadAll(prev => !prev)
        setValue("")
    }

    useEffect(() => {
        (async () => {
            await getFollowers(user.userId).then((res) => {
                setFollowers(res.data.result)
            })
        })()
    }, [])

    const [marked, setMarked] = useState(false)

    useEffect(() => {
        if (value.length < 1) {
            setMarked(false)
        }
        if (value.includes("@") && value.length > 0 && !marked) {
            setUsersMarcations(true)
        } else {
            setUsersMarcations(false)
        }

    }, [value])

    return (
        <Container>
            <AnswerContainer>
                <UserImage source={{ uri: props.profileImage, cache: "reload" }} />
                <TextInput
                    ref={inputRef}
                    style={{ flex: 1, color: theme.inputTextColor }}
                    placeholderTextColor={theme.inputTextColor}
                    onChangeText={text => onChangeText(text)}
                    value={value}
                    placeholder={"Adicionar comentário..."}
                />

                <SendButton onPress={handleNewComment}>

                    {loading ? (
                        <ActivityIndicator size="small" color={theme.primarycolor} />
                    ) : (
                        <Image style={{ width: 21, height: 21, resizeMode: 'contain' }} source={require("../../Assets/Icons/sendBlue.png")} />
                    )}

                </SendButton>
            </AnswerContainer>
            {usersMarcations && (
                <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                    {followers.map((item, index) => (
                        <TouchableOpacity key={index}
                            onPress={() => {
                                setMarked(true)
                                setValue(value + item.userNickname + ' ')
                            }}
                            style={{
                                marginHorizontal: 3,
                                marginVertical: 10,
                                backgroundColor: theme.primarycolor + '20',
                                padding: 10,
                                borderRadius: 6
                            }}
                        >
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                gap: 6,
                            }}>
                                <UserImageMark source={{ uri: item.profileImage }} />
                                <Text style={{ fontSize: 12 }}>{item.userNickname}</Text>
                            </View>
                        </TouchableOpacity>

                    )
                    )}
                </ScrollView>
            )}
        </Container>
    )
}