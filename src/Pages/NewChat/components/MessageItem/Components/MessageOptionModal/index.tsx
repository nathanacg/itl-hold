import Modal from "react-native-modal";
import { View } from "react-native";
import SendedMessage from "../SendedMessage";
import { SetStateAction } from "react";
import { Divisor, MessageOptions, OptionText } from "./style";

interface MessageOptionModal {
    setVissible: React.Dispatch<SetStateAction<boolean>>
    isVisible: boolean
    selectedMessage?: any
}

export default function MessageOptionModal(props: MessageOptionModal) {

    return (
        <Modal
            isVisible={props.isVisible}
            onBackdropPress={() => props.setVissible(false)}
            animationIn={"fadeIn"}
            animationOut={"fadeOut"}
            style={{ margin: 0, padding: 0, justifyContent: "flex-end" }}
            children={
                <>
                    {props.selectedMessage && (
                        <SendedMessage setvisibleBottonModal={props.setVissible} position={{ x: props.selectedMessage.positionX, y: props.selectedMessage.positionY }} text={props.selectedMessage.text} timeHour={props.selectedMessage.timeHour} onPressFunction={() => { }} />
                    )}
                    <MessageOptions>
                        <OptionText>Copiar</OptionText>
                        <Divisor />
                        <OptionText>Cancelar envio</OptionText>
                    </MessageOptions>
                </>
            }
        />
    )
}