import { View } from 'react-native'

import { UserInfo, UserName, UserAddress, CardContainer } from './styles'

import UserImageRounded from '../UserImageProfile'

interface LikeCardProps {
    userId: number
    userName: string
    userNickname: string
    profileImage: string
    userHasCartaz?: boolean
    borderBottom?: boolean
    rightButton?: React.ReactNode
}

export default function ListUsersRequests(props: LikeCardProps) {

    function limitNicknameLength(nickname: string, maxLength: number) {
        if (nickname.length > maxLength) {
            return nickname.slice(0, maxLength)
        }
        return nickname
    }

    return (
        <CardContainer border={props.borderBottom}>
            <UserInfo>
                <UserImageRounded
                    hasCartaz={props.userHasCartaz}
                    url={props.profileImage}
                    size={44}
                />
                <View>
                    <UserAddress>{props.userNickname}</UserAddress>
                    <UserName>{limitNicknameLength(props.userName, 24)}</UserName>
                </View>
            </UserInfo>
            {props.rightButton}
        </CardContainer>
    )
}