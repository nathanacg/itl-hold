import { TouchableOpacity, View } from "react-native";
import { Icon } from 'react-native-elements'
import Ionicons from "react-native-vector-icons/Ionicons"
import { useNavigation } from "@react-navigation/native";


import { HeaderContainer, 
        UserInfos, 
        HeaderImage, 
        HeaderActions, 
        GrayText, 
        BoldText } from "./style";
        
import { theme } from "../../../../Theme/theme";


interface RoomHeaderProps {
    title: string
    image?: any
    participants: number
    onPressMore: () => void
}

export default function RoomHeader(props: RoomHeaderProps) {
    const navigation = useNavigation()
    return (
        <HeaderContainer>
            <UserInfos>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon
                        name='chevron-small-left'
                        type='entypo'
                        color={theme.primarycolor}
                        size={40}
                    />
                </TouchableOpacity>
                {props.image && (
                    <HeaderImage source={props.image} />
                )}
                <View>
                    <BoldText>{props.title}</BoldText>
                    <GrayText>{props.participants} participantes</GrayText>
                </View>

            </UserInfos>
            <HeaderActions>
                <Ionicons
                    onPress={props.onPressMore}
                    name="ellipsis-vertical"
                    color={theme.lightGray}
                    size={20}
                />
            </HeaderActions>
        </HeaderContainer>
    )
}