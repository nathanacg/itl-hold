import { TouchableOpacity } from "react-native";
import { HeaderContainer, UserInfos, HeaderUser, HeaderActions, UserName } from "./style";
import { Icon } from 'react-native-elements'
import { useNavigation } from "@react-navigation/native";

import Ionicons from "react-native-vector-icons/Ionicons";
import { ProfilePhoto } from "../../../Components/HeaderPost/style";
import { theme } from "../../../Theme/theme";


interface ProfileHeaderProps {
    title?: string
    userImage?: string
    onPress: () => void
    actionHeaderElement1?: React.ReactNode
    actionHeaderElement2?: React.ReactNode
    actionHeaderElement3?: React.ReactNode
}

export default function RepostHeader(props: ProfileHeaderProps) {

    return (
        <HeaderContainer>
            <UserInfos>
                <TouchableOpacity onPress={() => props.onPress()}>
                    <Icon
                        name='chevron-small-left'
                        type='entypo'
                        color={theme.primarycolor}
                        size={40}
                    />
                </TouchableOpacity>

                <ProfilePhoto source={{ uri: props?.userImage }} />

                <UserName>{props.title}</UserName>
            </UserInfos>
            <HeaderActions>
                {props.actionHeaderElement1}
                {props.actionHeaderElement2}
                {props.actionHeaderElement3}
            </HeaderActions>
        </HeaderContainer>
    )
}