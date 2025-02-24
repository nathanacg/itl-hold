import { useState } from "react";
import { Alert, Image, View } from "react-native";

import { Container, RemoveButton, OnIcon, UserImageContainer, Name, Info } from './style'
import { UserInfo, UserName, UserAddress, CardContainer } from "./style";
import { typeTheme } from "../../../../Config/enumTheme";

import { deltFollowingProfile, postFollowingProfile, delReqFollowingProfile, postReqFollowingProfile } from "../../../../Service/Profile";

import NavigateToProfile from "../../../../Components/NavigatetoProfile";
import { ButtonContent, TextButton } from "../../../../Components/ProfileInfo/style";
import UserImageRounded from "../../../../Components/UserImageProfile";
import { acceptFriend } from "../../../../Service/Followers";
import { useNotification } from "../../../../context/notification";


interface ToAcceptCardProps {
    userId: number
    userName: string
    userNickname: string
    userAddress: string
    rightButton?: React.ReactNode
    userHasCartaz?: boolean
    inverted?: boolean
    isFollowing?: number
    borderBottom?: boolean
    btnText?: string
    profileImage?: string
    btnDelete: () => void
}

export default function ToAcceptCardWide(props: ToAcceptCardProps) {

    const { sendNotificationFollower } = useNotification()

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


    const [isFollowing, setIsFollowing] = useState(false)
    const [isAccept, setIsAccept] = useState(false)

    const handleFollowButton = () => {
        if (isFollowing) {
            setIsFollowing(true)
            addFriend()
        } else {
            setIsFollowing(false)
            removeFriend()
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

        <CardContainer>
            <RemoveButton onPress={props.btnDelete}>
                <Image source={require('../../../../Assets/Icons/close.png')} />
            </RemoveButton>
            <NavigateToProfile userNickName={props.userNickname}>
                <UserInfo>
                    <UserImageRounded
                        hasCartaz={props.userHasCartaz}
                        url={props.profileImage}
                    />
                    <View style={{ justifyContent: "center" }}>
                        <UserAddress>{limitNicknameLength(props.userAddress, 21)}</UserAddress>
                        <UserName>{props.userNickname}</UserName>
                    </View>
                </UserInfo>
            </NavigateToProfile>


        </CardContainer>
    )
    return (
        <Container>
            <RemoveButton onPress={props.btnDelete}>
                <Image source={require('../../../../Assets/Icons/close.png')} />
            </RemoveButton>
            <NavigateToProfile userNickName={props.userNickname}>
                <UserImageContainer>
                    <UserImageRounded size={70} url={props.profileImage} />
                </UserImageContainer>
            </NavigateToProfile>
            <NavigateToProfile userNickName={props.userNickname}>
                <UserName>{props.userNickname}</UserName>
            </NavigateToProfile>
            <Name>{limitNicknameLength(props.userName, 18)}</Name>

            <Info>Seguido(a) por intellectus e outras 5 pessoas</Info>

            {!isAccept ? (
                <ButtonContent optionButton={isAccept ? typeTheme.light : typeTheme.default}
                    onPress={handleAcceptButton}>
                    <TextButton optionButton={isAccept ? typeTheme.light : typeTheme.default}>
                        {!isAccept && 'Aceitar'}
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