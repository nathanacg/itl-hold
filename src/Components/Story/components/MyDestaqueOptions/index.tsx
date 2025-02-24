import { Image, View } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { theme } from "../../../../Theme/theme"
import Feather from "react-native-vector-icons/Feather"
import { SetStateAction } from "react"
import { OptionText, StoryOptions } from "../MyStoryOptions/style"

interface MyDestaqueOptionsProps {
    closeOptionIsModalOpen: () => void
    setToFileItem: React.Dispatch<SetStateAction<boolean>>
    openUserModal: () => void
    openStoryRemoveModal: () => void
    setShowCopy: React.Dispatch<SetStateAction<boolean>>
}

export default function MyDestaqueOptions(props: MyDestaqueOptionsProps) {

    return (
        <View>
            {/*   <StoryOptions onPress={() => {
                props.closeOptionIsModalOpen()
                props.setShowCopy(true)
                setTimeout(() => {
                    props.setShowCopy(false)
                }, 2000)
            }} >
                <Image source={require("../../../../Assets/Icons/infinitySimbol.png")} />
                <OptionText>Copiar link</OptionText>
            </StoryOptions>
 */}
            <StoryOptions onPress={() => {
                props.closeOptionIsModalOpen()
            }}>
                <Icon
                    name="ios-add-circle-outline"
                    size={22}
                    color={theme.textDark}
                />
                <OptionText>Compartilhar como publicação</OptionText>
            </StoryOptions>

            <StoryOptions onPress={() => {
                props.closeOptionIsModalOpen()
                props.openUserModal()
            }} >
                <Image source={require("../../../../Assets/Icons/sendOutline.png")} />
                <OptionText>Compartilhar com</OptionText>
            </StoryOptions>

            <StoryOptions onPress={() => {
                props.closeOptionIsModalOpen()
                props.openStoryRemoveModal()
            }}  >
                <Feather
                    name="trash-2"
                    size={22}
                    color={theme.textDark}
                />
                <OptionText>Excluir do Destaque</OptionText>
            </StoryOptions>
        </View>
    )
}