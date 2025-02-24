import { PopOutContainer, PopoutText } from "./style"
import Icon from "react-native-vector-icons/Feather"
import Modal from "react-native-modal";
import { theme } from "../../Theme/theme";


interface PopoutProps {
    text: string
    isVisible: boolean
}

export default function Popout(props: PopoutProps) {

    return (
        <Modal
            animationIn="slideInUp"
            animationOut="slideOutDown"
            isVisible={props.isVisible}
            style={{ flex: 1, justifyContent: "flex-end" }}
            backdropColor={theme.textDark}
            backdropOpacity={.3}
            >
            <PopOutContainer>
                <Icon
                    style={{ position: "absolute", bottom: 16, left: 14 }}
                    name="info"
                    color={"#FFF"}
                />
                <PopoutText>
                    {props.text}
                </PopoutText>
            </PopOutContainer>
        </Modal>

    )
}