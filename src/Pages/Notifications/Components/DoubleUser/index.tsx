import { View } from "react-native";

import {
    DoubleUserContainer,
    LetfContainer,
    UserdoubleImage,
    SecondUserImage,
    UserAddresss,
    NotificationText,
    NotificationContent,
    NotificationTime,
    PostImage
} from "./style";



interface DoubleUserProps {
    users: {
        userName: string,
        imageUrl: any
    }[]
    action: string
    time: string
    postUrl?: any

}

export default function DoubleUser(props: DoubleUserProps) {
    const usersCount = props.users.length

    return (

        <DoubleUserContainer>
            <LetfContainer>
                <View>
                    <UserdoubleImage source={require("../../../../Assets/Image/background_app.png")} />
                    <SecondUserImage source={require("../../../../Assets/Image/background_app.png")} />
                </View>
                <NotificationContent>
                    <NotificationText>
                        <UserAddresss>
                            {props.users.map((user, index) => {
                                if (index == props.users.length - 1) {
                                    return `${user.userName} `
                                }
                                if (index == props.users.length - 2) {
                                    return `${user.userName} e `
                                } else {
                                    return `${user.userName}, `
                                }
                            })}
                        </UserAddresss>
                        {`${props.action} `}
                        <NotificationTime>
                            {props.time}
                        </NotificationTime>
                    </NotificationText>
                </NotificationContent>
            </LetfContainer>
            {props.postUrl ? (
                <PostImage source={require("../../../../Assets/Image/background_app.png")} />
            ) : ''}
        </DoubleUserContainer>


    )
}