import { useEffect, useState } from "react";
import { View } from "react-native";

import { Icon, Text } from "react-native-elements";

import {
    StartToFollowContainer,
    UserAddresss,
    NotificationContent,
    NotificationTime,
    LetfContainer,
    ButtonContent,
    TextButton,
    TextButton2,
    ButtonContent2
} from "./style";
import { typeTheme } from "../../../../Config/enumTheme";
import UserImageRounded from "../../../../Components/UserImageProfile";
import { acceptFriend, handleRequestNotification } from "../../../../Service/Followers";
import { deltFollowingProfile, postFollowingProfile } from "../../../../Service/Profile";
import { useNotification } from "../../../../context/notification";
import NavigateToProfile from "../../../../Components/NavigatetoProfile";
import { theme } from "../../../../Theme/theme";
import { UserAccept } from "../..";

interface NotificationCardProps {
    user: {
        userId: number
        userNickname: string
        imageUrl: string
        userHasCartaz?: boolean;
    }
    time: string
    isFollowing?: boolean
    fetchProfile?: () => void
    action?: string
    private?: boolean
    notificationId: number
    removeFollowers?: React.Dispatch<React.SetStateAction<UserAccept[]>>
}

export default function FollowRequest(props: NotificationCardProps) {

    const [isAccepted, setIsAccepted] = useState(props.isFollowing)

    const { sendNotificationFollower } = useNotification()

    const [isFollowing, setIsFollowing] = useState(props.isFollowing)

    const [notifyId, setNotifyId] = useState(props.notificationId)

    const addFriend = async () => {
        setIsAccepted(true)
        await acceptFriend(1, props.user.userId)
        console.log(props.notificationId)
        await handleRequestNotification(1, notifyId)
        props.removeFollowers && props.removeFollowers(
            prevUsersSelected => {
                const filter = prevUsersSelected.filter(user =>
                    user.userRequestId != props.user.userId
                );
                return filter;
            }
        )

    }
    const removeFriend = async () => {
        setIsAccepted(false)
        await acceptFriend(props.user.userId, 0)
        await handleRequestNotification(0, props.notificationId)
        props.removeFollowers && props.removeFollowers(
            prevUsersSelected => {
                const filter = prevUsersSelected.filter(user =>
                    user.userRequestId != props.user.userId
                );
                return filter;
            }
        )
    }

    const handleFollowButton = async () => {
        setIsFollowing(pv => !pv)
        syncFollower()
    }

    const syncFollower = async () => {
        if (isFollowing) {
            await removeFriend()
        } else {
            await addFriend().then(res => {
                sendNotificationFollower(props.user.userId)
            })
        }
        props.fetchProfile && props.fetchProfile()
    }

    return (
        <NavigateToProfile userNickName={props.user.userNickname}>
            <StartToFollowContainer>
                <LetfContainer>
                    <UserImageRounded size={45} hasCartaz={props.user.userHasCartaz} url={props.user.imageUrl} />
                    <NotificationContent>
                        <Text>
                            <UserAddresss>{props.user.userNickname} </UserAddresss>
                            {!isAccepted ? props.action + ' ' : 'começou a te seguir. '}
                            <NotificationTime>
                                {props.time}
                            </NotificationTime>
                        </Text>
                    </NotificationContent>
                </LetfContainer>

                {isAccepted && (<ButtonContent2
                    onPress={handleFollowButton}
                    optionButton={isFollowing ? (typeTheme.light) : (typeTheme.default)}
                >
                    <TextButton2 optionButton={isFollowing ? (typeTheme.light) : (typeTheme.default)}>
                        {isFollowing ? ('Seguindo') : ('Seguir')}
                    </TextButton2>
                </ButtonContent2>)}
                {!isAccepted && (
                    <View style={{ gap: 7, flexDirection: 'row' }}>

                        <ButtonContent
                            onPress={addFriend}
                            optionButton={typeTheme.default}
                        >
                            <Icon
                                name="check"
                                size={19}
                                color={theme.secondaryColor}
                            />
                        </ButtonContent>
                        <ButtonContent
                            onPress={removeFriend}
                            optionButton={typeTheme.light}
                        >
                            <Icon
                                name="close"
                                size={20}
                                color={theme.primarycolor}
                            />
                        </ButtonContent>

                    </View>
                )}

            </StartToFollowContainer>
        </NavigateToProfile>
    )
}  