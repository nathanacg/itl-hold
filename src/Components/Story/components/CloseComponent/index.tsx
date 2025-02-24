import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { theme } from "../../../../Theme/theme";
import { CloseStory } from "./style";


interface CloseComponentProps{
    openOptionsModal: () => void
    closeFunction: () => void
}

export default function CloseComponent(props: CloseComponentProps) {

    return (
        <CloseStory style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={props.openOptionsModal}>
                <Icon
                    name="ellipsis-vertical"
                    color={theme.secondaryColor}
                    size={25}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={props.closeFunction}>
                <Icon
                    name="close"
                    color={theme.secondaryColor}
                    size={30}
                />
            </TouchableOpacity>
        </CloseStory>
    )
}