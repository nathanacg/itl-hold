import { useEffect, useState } from "react";
import { Image, View } from "react-native";

import { Container, RemoveButton, UserName, OnIcon, UserImageContainer, Name, Info } from './style'
import { typeTheme } from "../../../../Config/enumTheme";

import { deltFollowingProfile, getProfileOuther, getVerfication, postFollowingProfile } from "../../../../Service/Profile";

import NavigateToProfile from "../../../../Components/NavigatetoProfile";
import { ButtonContent, TextButton } from "../../../../Components/ProfileInfo/style";
import UserImageRounded from "../../../../Components/UserImageProfile";
import useUserProfile from "../../../../GlobalState/userProfile.zustand";

import { getSameFollowers } from "../../../../Service/Followers";
import { Verified } from "../../../../Components/Verified";
import useStories from "../../../../GlobalState/stories.zustand";

interface ListFollowers {
    userId: number
    userName: string
    userNickname: string
    profileImage: string
}

interface ToFollowCardProps {
    userId: number
    userName: string
    private_account: number
    user_verified: number
    userNickname: string
    profileImage: string
    buttonText?: string
    buttonAction?: () => void
}

export default function ToFollowCard(props: ToFollowCardProps) {

    const [isFollowing, setIsFollowing] = useState<boolean>(false)
    const [sameUsers, SetSameFollowers] = useState<ListFollowers[]>([])
    const [numSeguidores, setNumSeguidores] = useState<number>(0)

    const [verified, setVerified] = useState()

    const { user: userProfile } = useUserProfile()

    const handleFollowButton = async () => {
        if (isFollowing) {
            deltFollowingProfile(props.userId)
            setIsFollowing(false)
        } else {
            postFollowingProfile(props.userId)
            setIsFollowing(true)
        }
    }

    const sameFollowers = async () => {
        try {
            const response = await getSameFollowers(props.userId, userProfile.userId)
            SetSameFollowers(response.data.result)
        } catch (error) {
            console.log('erro ao exibir os mesmo seguidores.', error)
        }
    }

    function limitNicknameLength(nickname: string, maxLength: number) {
        if (nickname?.length > maxLength) {
            return nickname.slice(0, maxLength) + '...'
        }
        return nickname
    }

    const getVerifiedUser = async () => {
        try {
            const response = await getVerfication(props.userId)
            setVerified(response.data.result[0].user_verified)
        } catch (error) {
            console.warn('GetVerfication - Story')
            console.log(error)
        }
    }

    const otherFollowers = async () => {
        try {
            const response = await getProfileOuther(props.userId)
            setNumSeguidores(response.data.numSeguindo)
        } catch (error) {
            console.log('erro ao exibir os mesmo seguidores.', error)
        }
    }

    useEffect(() => {
        sameFollowers()
        otherFollowers()
        getVerifiedUser()
    }, [])


    return (
        <Container>
            <RemoveButton onPress={props.buttonAction}>
                <Image source={require('../../../../Assets/Icons/close.png')} />
            </RemoveButton>

            <NavigateToProfile userNickName={props.userNickname}>
                <UserImageContainer>
                    <UserImageRounded size={60} url={props.profileImage} />
                </UserImageContainer>
            </NavigateToProfile>
            <NavigateToProfile userNickName={props.userNickname}>
                <UserName>{props.userNickname}</UserName>{verified === 1 && <Verified width={10} height={10} />}
            </NavigateToProfile>
            <View style={{ flex: 1 }}>
                <Name>{limitNicknameLength(props.userName, 14)}</Name>
                {sameUsers.length > 0 ? (
                    <Info>Seguido por {numSeguidores} {numSeguidores > 1 ? 'pessoas' : 'pessoa'} {sameUsers.length > 1 && `e ${sameUsers.length} ${sameUsers.length > 0 ? 'amigos' : 'amigo'} em comum`}</Info>
                ) : (
                    <Info>Sugestão com base em suas atividades.</Info>
                )}
            </View>
            {props.buttonText == "Solicitado" && (
                <ButtonContent optionButton={typeTheme.light}
                    onPress={handleFollowButton} disable>
                    <TextButton optionButton={typeTheme.light}>
                        {props.buttonText}
                    </TextButton>

                </ButtonContent>
            )}
            {props.buttonText != "Solicitado" && (
                <ButtonContent optionButton={isFollowing ? typeTheme.light : typeTheme.default}
                    onPress={handleFollowButton}>
                    <TextButton optionButton={isFollowing ? typeTheme.light : typeTheme.default}>
                        {isFollowing ? 'Seguindo' : 'Seguir'}
                    </TextButton>

                </ButtonContent>
            )}


        </Container >
    )
}