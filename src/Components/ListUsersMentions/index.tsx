import { View } from "react-native";

import { UserInfo, UserName, UserAddress, CardContainer } from "./style";
import UserImageRounded from "../UserImageProfile";
import Ionicons from "react-native-vector-icons/Ionicons";

interface LikeCardProps {
    userName: string
    userAddress: string
    userHasCartaz?: boolean
    profileImage?: string
    onPress?: () => void
}

export default function ListUsersMentions(props: LikeCardProps) {


    return (
        <CardContainer onPress={props.onPress} >
            <UserInfo>
                {props.profileImage ?
                    <UserImageRounded
                        hasCartaz={props.userHasCartaz}
                        url={props.profileImage}
                    /> :
                    <Ionicons
                        name='person-circle'
                        size={50}
                        color={"#c4c4c4"}
                        style={{marginRight: -5, justifyContent: "center", alignItems: "center" }}
                    />}

                <View style={{ justifyContent: "center" }}>
                    <UserAddress>{props.userAddress}</UserAddress>
                    <UserName>{props.userName}</UserName>
                </View>
            </UserInfo>


        </CardContainer>
    )
}