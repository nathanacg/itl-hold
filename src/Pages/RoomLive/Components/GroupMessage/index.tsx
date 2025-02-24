import {
    Message,
    MessageContainer,
    MessageText,
    UserImage,
    Time,
    MessageInfo,
    ViewImage,
    UserName,
    BoldName
} from "./style";

interface GroupMessageProps {
    text: string
    timeHour: string
    userImage: string
    onLongPress: () => void
    userName: string
    userAddress: string
}

export default function GroupMessage(props: GroupMessageProps) {
    return (
        <MessageContainer>
            <UserImage source={require("../../../../Assets/Image/background_app.png")} />
            <Message onLongPress={props.onLongPress}>
                <UserName
                    style={{ color: "#44A02D" }}>
                    <BoldName>{props.userAddress} </BoldName>
                    - {props.userName}
                </UserName>
                <MessageText>{props.text}</MessageText>
                <MessageInfo>
                    <Time>{props.timeHour}</Time>
                    <ViewImage source={require("../../../../Assets/Icons/doubleCheck.png")} />
                </MessageInfo>
            </Message>
        </MessageContainer>
    )
}