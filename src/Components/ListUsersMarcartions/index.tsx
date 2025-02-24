
import { UserInfo, UserName, UserAddress, CardContainer } from './style'

import { Column } from '../../Pages/MoreDetails/style'

import UserImageRounded from '../UserImageProfile'


interface MarcationsCardProps {
    userId: number
    userName: string
    userNickname: string
    borderBottom?: boolean
    profileImage: string
}

export default function ListUsersMarcations(props: MarcationsCardProps) {

    return (
        <CardContainer border={props.borderBottom}>
            <UserInfo>
                <UserImageRounded
                    url={props.profileImage}
                    size={40}
                />
                <Column>
                    <UserAddress>{props.userNickname}</UserAddress>
                    <UserName>{props.userName}</UserName>
                </Column>
            </UserInfo>
        </CardContainer>
    )
}