import { useEffect, useState } from 'react'
import { Text } from 'react-native'

import { typeTheme } from '../../../../Config/enumTheme'

import {
    StartToFollowContainer,
    UserAddresss,
    NotificationContent,
    NotificationTime,
    LetfContainer,
    ButtonContent,
    TextButton
} from './style'


import UserImageRounded from '../../../../Components/UserImageProfile'
import NavigateToProfile from '../../../../Components/NavigatetoProfile'

import { useNotification } from '../../../../context/notification'
import { deltFollowingProfile, getOtherProfile, postFollowingProfile } from '../../../../Service/Profile'
interface NotificationCardProps {
    user: {
        userId: number
        userNickname: string
        imageUrl: string
        userHasCartaz?: boolean;
    }
    time: string
    isFollowing?: boolean
    fetchProfile?: any
    action?: string
}

export default function StartToFollow(props: NotificationCardProps) {

    const [isFollowing, setIsFollowing] = useState(false)
    const { sendNotificationFollower } = useNotification()

    const addFriend = () => postFollowingProfile(props.user.userId)

    const removeFriend = () => deltFollowingProfile(props.user.userId)


    const handleFollowButton = async () => {
        syncFollower()
    }

    useEffect(() => {
        getOtherProfile(props.user.userNickname)
            .then(res => setIsFollowing(res.data.userFollowing == 0 ? false : true)
            )
            .catch((e) => {
                console.warn('GetOtherProfile - ListUsersCard')
                console.log(e)
            })
    }, [])

    const syncFollower = async () => {
        console.log('Passando aqui', isFollowing)
        if (isFollowing) {
            await removeFriend().then(res => {
                console.log(res.data)
                setIsFollowing(false)

            })
        } else {
            await addFriend().then(res => {
                sendNotificationFollower(props.user.userId)
                console.log(res.data)
                setIsFollowing(true)
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
                            {`${props.action} `}
                            <NotificationTime>
                                {props.time}
                            </NotificationTime>
                        </Text>
                    </NotificationContent>
                </LetfContainer>

                <ButtonContent
                    onPress={handleFollowButton}
                    optionButton={isFollowing ? (typeTheme.light) : (typeTheme.default)}
                >
                    <TextButton optionButton={isFollowing ? (typeTheme.light) : (typeTheme.default)}>
                        {isFollowing ? ('Seguindo') : ('Seguir')}
                    </TextButton>
                </ButtonContent>
            </StartToFollowContainer>
        </NavigateToProfile>
    )
}  