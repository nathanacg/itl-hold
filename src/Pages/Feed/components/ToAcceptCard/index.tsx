import { useEffect, useState } from 'react'
import { Alert, Image } from 'react-native'

import { Container, RemoveButton, UserName, OnIcon, UserImageContainer, Name, Info } from './style'
import { typeTheme } from '../../../../Config/enumTheme'

import { deltFollowingProfile, postFollowingProfile, delReqFollowingProfile, postReqFollowingProfile } from '../../../../Service/Profile'

import NavigateToProfile from '../../../../Components/NavigatetoProfile'
import { ButtonContent, TextButton } from '../../../../Components/ProfileInfo/style'
import UserImageRounded from '../../../../Components/UserImageProfile'
import { acceptFriend, getSameFollowers } from '../../../../Service/Followers'
import { useNotification } from '../../../../context/notification'
import useUserProfile from '../../../../GlobalState/userProfile.zustand'


interface ToAcceptCardProps {
    userId: number
    userName: string
    userNickname: string
    profileImage: string
    buttonText?: string
    buttonAction?: () => void
    btnDelete: () => void
}

interface ListFollowers {
    userId: number
    userName: string
    userNickname: string
    profileImage: string
}

export default function ToAcceptCard(props: ToAcceptCardProps) {

    const { sendNotificationFollower } = useNotification()

    const [isFollowing, setIsFollowing] = useState(false)
    const [isAccept, setIsAccept] = useState(false)

    const addFriend = () => {
        sendNotificationFollower(props.userId)
        postFollowingProfile(props.userId)
    }
    const removeFriend = () => {
        deltFollowingProfile(props.userId)
    }

    const acceptingFriend = async () => {
        try {
            await acceptFriend(props.userId, true)
        } catch (error) {
            console.log(`Não foi possivel aceitar a request follow`, error)
        }

    }

    const handleFollowButton = () => {
        if (isFollowing) {
            setIsFollowing(false)
            removeFriend()
        } else {
            setIsFollowing(true)
            addFriend()
        }
    }

    const handleAcceptButton = () => {
        setIsAccept(true)
        acceptingFriend()
        setIsFollowing(false)
    }

    function limitNicknameLength(nickname: string, maxLength: number) {
        if (nickname.length > maxLength) {
            return nickname.slice(0, maxLength);
        }
        return nickname;
    }

    return (
        <Container>
            <RemoveButton onPress={props.btnDelete}>
                <Image source={require('../../../../Assets/Icons/close.png')} />
            </RemoveButton>
            <NavigateToProfile userNickName={props.userNickname}>
                <UserImageContainer>
                    <UserImageRounded userId={props.userId} size={65} url={props.profileImage} />
                </UserImageContainer>
            </NavigateToProfile>
            <NavigateToProfile userNickName={props.userNickname}>
                <UserName>{props.userNickname}</UserName>
            </NavigateToProfile>
            <Name>{limitNicknameLength(props.userName, 18)}</Name>

            {!isAccept ? (
                <ButtonContent optionButton={isAccept ? typeTheme.light : typeTheme.default}
                    onPress={handleAcceptButton}>
                    <TextButton optionButton={isAccept ? typeTheme.light : typeTheme.default}>
                        Aceitar
                    </TextButton>
                </ButtonContent>
            ) : (
                <ButtonContent optionButton={isFollowing ? typeTheme.light : typeTheme.default}
                    onPress={handleFollowButton}>
                    <TextButton optionButton={isFollowing ? typeTheme.light : typeTheme.default}>
                        {!isFollowing ? 'Seguir' : 'Seguindo'}
                    </TextButton>
                </ButtonContent>
            )}
        </Container>
    )
}