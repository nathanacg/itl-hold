import { useRef, useState, memo } from "react";
import { Message, MessageContainer, MessageTextLong, MessageText, MessageInfo, Time, ViewImage } from "./style";
import AudioContainer from "../../../../../../Components/AudioContainer";

interface SendedMessageProps {
    uri: string
    timeHour: string | Date | undefined
    position?: { x: number, y: number }
    onPressFunction: (text: string, timeHour: string, positionX: number, positionY: number) => void
    read?: boolean
    audioTotalTime: number
    configAudMetrics: string
}

const AudioMessage = memo((props: SendedMessageProps) => {
    const messageRef = useRef(null)
    const [date, setDate] = useState(new Date(props.timeHour || ""))

    return (
        <MessageContainer

            ref={messageRef}
            // onLongPress={handleMeasure}
            style={props.position ? { position: "absolute", right: props.position.x, top: props.position.y } : {}}
        >
            <Message>
                <AudioContainer
                    configAudMetrics={props.configAudMetrics}
                    path={props.uri}
                    recordingTime={props.audioTotalTime} />
                <MessageInfo>
                    <Time>{`${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`}</Time>
                    <ViewImage source={props.read ? require("../../../../../../Assets/Icons/all-done-blue.png") : require("../../../../../../Assets/Icons/doubleCheck.png")} />
                </MessageInfo>
            </Message>
        </MessageContainer>

    )
})

export default AudioMessage