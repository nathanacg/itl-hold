import { useRef, useState, memo } from "react";
import { Message, MessageContainer, MessageTextLong, MessageText, MessageInfo, Time, ViewImage, UserImage } from "./style";
import AudioContainer from "../../../AudioContainer";

interface SendedMessageProps {
    uri: string
    position?: { x: number, y: number }
    onPressFunction?: (text: string, timeHour: string, positionX: number, positionY: number) => void
    read?: boolean
    audioonly: boolean
    audioTotalTime?: number
    configAudMetrics: string
}

const AudioMessageReceived = memo((props: SendedMessageProps) => {

    const messageRef = useRef(null)



    return (
        <MessageContainer
            ref={messageRef}
        >
            <Message>
                <AudioContainer
                    configAudMetrics={props.configAudMetrics}
                    path={props.uri}
                    post={props.audioonly}
                    recordingTime={props.audioTotalTime} />
            </Message>
        </MessageContainer>

    )
})

export default AudioMessageReceived