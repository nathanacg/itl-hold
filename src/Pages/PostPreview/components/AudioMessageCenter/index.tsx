import { useRef, memo } from "react";
import { MessageContainer, Message } from "./style";
import AudioContainer from './AudioContainer'

interface SendedMessageProps {
    uri: string
    position?: { x: number, y: number }
    onPressFunction?: (text: string, timeHour: string, positionX: number, positionY: number) => void
    read?: boolean
    audioTotalTime?: number | string
    configAudMetrics: number[]
    feed?: boolean
    publication?: boolean
    preview?: boolean
    repost?: boolean
}

const AudioMessageCenter = memo((props: SendedMessageProps) => {
    const messageRef = useRef(null)

    return (
        <MessageContainer
            ref={messageRef}
        >
            <Message>
                <AudioContainer
                    feed={props.feed}
                    repost={props.repost}
                    publication={props.publication}
                    preview={props.preview}
                    configAudMetrics={props.configAudMetrics}
                    path={props.uri}
                    recordingTime={props.audioTotalTime}
                />
            </Message>
        </MessageContainer>

    )
})

export default AudioMessageCenter