import { useEffect, useState } from "react";
import { Alert, Modal, View } from "react-native";

import { UserInfo, UserName, UserAddress, CardContainer, Container, ModalContainer } from "./style";

import DarkButton from "../DarkButton";
import LigthButton from "../LigthButton";
import Ionicons from "react-native-vector-icons/Ionicons";

import UserImageRounded from "../UserImageProfile";

import { deltFollowingProfile, getOtherProfile, getVerfication, isUserFollowingMe, postFollowingProfile } from "../../Service/Profile";

import useUserProfile from "../../GlobalState/userProfile.zustand";
import NavigateToProfile from "../NavigatetoProfile";
import { acceptFriend } from "../../Service/Followers";
import { useNotification } from "../../context/notification";
import { Verified } from "../Verified";

interface LikeCardProps {
    userId: number
    userName: string
    userNickname: string
    rightButton?: React.ReactNode
    userHasCartaz?: boolean
    inverted?: boolean
    isFollowing?: number
    borderBottom?: boolean
    btnText?: string
    profileImage?: string
    onPress?: () => void
    isShare?: boolean
    actionElement?: React.ReactNode
}

export default function ListUsersShare(props: LikeCardProps) {


    function limitNicknameLength(nickname: string, maxLength: number) {
        if (nickname.length > maxLength) {
            return nickname.slice(0, maxLength) + '...'
        }
        return nickname;
    }


    return (
        <CardContainer onPress={props.onPress} border={props.borderBottom}>
            <UserInfo>
                <UserImageRounded
                    hasCartaz={props.userHasCartaz}
                    url={props.profileImage}
                    size={44}
                />
                <View style={{ justifyContent: "center" }}>
                    <UserAddress>{props.userNickname}</UserAddress>
                    <UserName>{limitNicknameLength(props.userName, 25)}</UserName>
                </View>
            </UserInfo>
            {props.rightButton}
        </CardContainer>
    )
}