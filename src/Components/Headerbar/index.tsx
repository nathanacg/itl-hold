import { Image, TouchableOpacity } from "react-native";
import { HeaderContainer, UserInfos, HeaderActions } from "./style";
import { Icon } from 'react-native-elements'

import { theme } from "../../Theme/theme";


interface ProfileHeaderProps {
    actionHeaderElement1?: React.ReactNode

    onPress: () => void
}

export default function HeaderBar(props: ProfileHeaderProps) {

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

                <Image
                    style={{ width: 180, marginLeft: 50, resizeMode: 'contain' }}
                    source={require("../../Assets/Image/logo-intellectus.png")}
                />

            </UserInfos>
            <HeaderActions>
                {props.actionHeaderElement1}
            </HeaderActions>
        </HeaderContainer>
    )
}