import { Image, KeyboardAvoidingView, TextInput, TouchableOpacity } from "react-native";
import Popout from "../../../Popout";
import { Container, InputStory, SendStory, ShareImage, UserViewImage, UsersViews } from "./style";
import Ionicons from "react-native-vector-icons/Ionicons";
import { theme } from "../../../../Theme/theme";
import { SetStateAction, useEffect, useState } from "react";
import { deleteLike, getLikes, newLike } from "../../../../Service/Like";
import { getStoreObject } from "../../../../Lib/asyncStorage";
import { View } from "react-native";


interface SwipeUpView {
    inputValue: string
    handleInputText: (text: string) => void
    setUserModalOpen: React.Dispatch<SetStateAction<boolean>>
    postHexId: string
}

export default function SwipeUpView(props: SwipeUpView) {
    const [liked, setLiked] = useState(false)
    const [userId, setUserId] = useState()

    const handleLike = async () => {
        if (!liked) {
            const res = await newLike({ postHexId: props.postHexId })
        } else {
            const res = await deleteLike({ postHexId: props.postHexId })
        }
    }

    useEffect(() => {
        getStoreObject("@intellectus:userProfile")
            .then(res => {
                setUserId(res.userId)
            })
            .catch((e) => {
                console.warn('GetStoreObject - SwipeUpView')
                console.log(e)
            })
    }, [])

    useEffect(() => {
        getLikes(props.postHexId)
            .then(res => {
                if (res.data.users.find((item: any) => item.userId == userId)) {
                    setLiked(true)
                } else {
                    setLiked(false)
                }
            })
            .catch((e) => {
                console.warn('GetLikes - SwipeUpView')
                console.log(e)
            })
    }, [userId, props.postHexId])

    return (
        <Container>
            <InputStory>
                <TextInput
                    style={{ flex: 1, fontSize: 20, color: theme.secondaryColor, height: "100%" }}
                    value={props.inputValue}
                    onChangeText={text => props.handleInputText(text)} />
                {props.inputValue && (
                    <SendStory>
                        <Image source={require("../../../../Assets/Icons/send.png")} />
                    </SendStory>
                )}
            </InputStory>

            {!props.inputValue && (
                <View>
                    <TouchableOpacity onPress={() => {
                        handleLike()
                        setLiked(!liked)
                    }}>
                        <Ionicons
                            name={liked ? "heart" : "heart-outline"}
                            color={theme.secondaryColor}
                            size={35}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.setUserModalOpen(true)}>
                        <ShareImage source={require("../../../../Assets/Icons/shareWhite.png")} />
                    </TouchableOpacity>
                </View>
            )}
        </Container>
    )
}