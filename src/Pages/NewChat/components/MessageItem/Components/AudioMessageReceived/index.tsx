import { useRef, useState, memo } from "react";
import { Message, MessageContainer, MessageTextLong, MessageText, MessageInfo, Time, ViewImage, UserImage } from "./style";
import AudioContainer from "../../../../../../Components/AudioContainer";


interface SendedMessageProps {
    uri: string
    timeHour: string | Date | undefined
    position?: { x: number, y: number }
    onPressFunction: (text: string, timeHour: string, positionX: number, positionY: number) => void
    read?: boolean
    audioTotalTime: number
    userImage: string
    configAudMetrics: string
    userName?: string
    userNickname?: string
}

const AudioMessageReceived = memo((props: SendedMessageProps) => {

    const messageRef = useRef(null)

    const [date, setDate] = useState(new Date(props.timeHour || ""))


    return (
        <MessageContainer

            ref={messageRef}
            style={props.position ? { position: "absolute", right: props.position.x, top: props.position.y } : {}}
        >
            <UserImage source={{ uri: props.userImage /* + `?timestamp=${new Date().getTime()}` */ }} />



            <Message>
                <AudioContainer
                    configAudMetrics={props.configAudMetrics}
                    path={props.uri}
                    width="200px"
                    recordingTime={props.audioTotalTime} />
                <MessageInfo>
                    <Time>{`${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`}</Time>
                </MessageInfo>
            </Message>
        </MessageContainer>

    )
})

export default AudioMessageReceived