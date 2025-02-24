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
import { acceptFriend } from "../../Service/Followers";
import { useNotification } from "../../context/notification";
import { ProfileUser } from "../../Types/User";
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
    userRequest?: boolean
    userProfile: ProfileUser
}

export default function ListUsersFind(props: LikeCardProps) {

    const { sendNotificationFollower } = useNotification()

    const [verified, setVerified] = useState(0)

    function limitNicknameLength(nickname: string, maxLength: number) {
        if (nickname.length > maxLength) {
            return nickname.slice(0, maxLength) + '...'
        }
        return nickname;
    }

    const { user: userProfile } = useUserProfile()

    const [isFollowing, setIsFollowing] = useState<number>(0)

    const addFriend = () => {
        setIsFollowing(1)
        sendNotificationFollower(props.userId)
        postFollowingProfile(props.userId)
    }
    const removeFriend = () => {
        setIsFollowing(0)
        deltFollowingProfile(props.userId)
    }

    useEffect(() => {
        getOtherProfile(props.userName)
            .then(res => {
                //setIsFollowing(res.data.userFollowing)
            })
            .catch((e) => {
                console.warn('getOtherProfile - ListUsersFind')
                console.log(e)
            })
    }, [])

    const getUserVerify = async () => {
        await getVerfication(props.userId)
            .then((response) => {
                const verified = response.data.result[0].user_verified
                setVerified(verified)
            })
            .catch((e) => {
                console.warn('GetVerification - DropFeed')
                console.log(e)
            })
    }

    useEffect(() => {
        getUserVerify()
    })


    return (
        <CardContainer onPress={props.onPress} border={props.borderBottom}>
            <NavigateToProfile userNickName={props.userNickname}>
                <UserInfo>
                    <UserImageRounded
                        hasCartaz={props.userHasCartaz}
                        url={props.profileImage}
                        size={42}
                    />
                    <View style={{ justifyContent: "center" }}>
                        <UserAddress>{props.userNickname} {verified == 1 && <Verified width={10} height={21} />}</UserAddress>
                        <UserName>{limitNicknameLength(props.userName, 20)}</UserName>
                    </View>
                </UserInfo>
            </NavigateToProfile>

            {
                props.userId !== userProfile.userId &&
                <>
                    {
                        isFollowing == 0 ? (
                            <DarkButton onPress={addFriend} title={"Seguir"} size="sm" />
                        ) : (
                            <LigthButton onPress={removeFriend} title={'Seguindo'} size="sm" />
                        )
                    }
                </>
            }

        </CardContainer >
    )
}