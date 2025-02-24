import { useEffect, useState } from "react";
import { View } from "react-native";

import { UserInfo, UserName, UserAddress, CardContainer } from "./style";

import DarkButton from "../DarkButton";
import LigthButton from "../LigthButton";
import Ionicons from "react-native-vector-icons/Ionicons";

import UserImageRounded from "../UserImageProfile";

import { deltFollowingProfile, getOtherProfile, getVerfication, isUserFollowingMe, postFollowingProfile } from "../../Service/Profile";

import useUserProfile from "../../GlobalState/userProfile.zustand";
import NavigateToProfile from "../NavigatetoProfile";
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
}

export default function ListUsersCardChat(props: LikeCardProps) {

    const [verified, setVerified] = useState()

    const getVerified = async () => {
        await getVerfication(props.userId)
            .then((response) => {
                const verified = response.data.result[0].user_verified
                setVerified(verified)
            })
            .catch((e) => {
                console.warn('GetVerfication - Comment')
                console.log(e)
            })
    }

    useEffect(() => {
        getVerified()
    }, [])

    return (
        <CardContainer onPress={props.onPress} border={props.borderBottom}>

            <UserInfo>
                <UserImageRounded
                    hasCartaz={props.userHasCartaz}
                    url={props.profileImage}
                    size={48}
                />
                <View style={{ justifyContent: "center" }}>
                    <UserAddress>{props.userNickname} {verified === 1 && <Verified width={10} height={10} />}</UserAddress>
                    <UserName>{props.userName}</UserName>
                </View>
            </UserInfo>
        </CardContainer>
    )
}