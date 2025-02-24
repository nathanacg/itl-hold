import { Text, Image, TouchableOpacity, Share } from "react-native";

import {
    CloseScationContainer,
    Container,
    SocialActions
} from "./style";
import { SetStateAction, useEffect, useState } from "react";
import { theme } from "../../Theme/theme";
import SelectUsesrModal from "../SelectUsersModal";
import { useNavigation } from "@react-navigation/native";
import { StackRoutes } from "../../Routes/StackTypes";
import Ionicons from "react-native-vector-icons/Ionicons";
import { deleteLike, newLike } from "../../Service/Like"
import useCreateComment from "../../GlobalState/handleComments.zustand";
import { getStoreObject } from "../../Lib/asyncStorage";
import { useNotification } from "../../context/notification";
import ShareModal from "../ShareModal";
import { useSocket } from "../../context/socket";

interface PostFooterProps {
    postHexId?: string
    liked?: boolean
    setLiked?: React.Dispatch<SetStateAction<boolean>>
    saved?: boolean
    // onCommentPress: () => void
    updateLikes?: () => void
    userId?: number
    // likeList: { likeId: number; userId: number; postHexId: string; profileImage: string; userName: string; userNickname: string; }[]
    openComment?: () => void
    handleLike?: () => void
    repost?: string
}

export default function PostFooterPrev(props: PostFooterProps) {



    return (

        <Container>
            <SocialActions>
                <Ionicons
                    name={props.liked ? "ios-heart" : "ios-heart-outline"}
                    size={28}
                    color={theme.primarycolor}
                    style={{ marginRight: -2 }}
                    adjustsFontSizeToFit
                />
                <Image style={{ width: 25, height: 25, resizeMode: "contain" }} source={require("../../Assets/Icons/comment.png")} />
                <Image style={{ width: 24, height: 25, resizeMode: "contain" }} source={require("../../Assets/Icons/share.png")} />
            </SocialActions>
            <CloseScationContainer>
                <Image style={{ resizeMode: "contain", width: 30, height: 32, tintColor: theme.primarycolor }}
                    source={require("../../Assets/Icons/repost-4.png")} />
                <Image style={{ width: 20, height: 25, resizeMode: "contain" }} source={require("../../Assets/Icons/saveButton.png")} />
            </CloseScationContainer>

        </Container>




    )
}