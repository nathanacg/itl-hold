import { TouchableOpacity, View } from "react-native"

import { Icon, Text } from "react-native-elements"

import {
    StartToFollowContainer,
    UserAddresss,
    NotificationContent,
    NotificationTime,
    LetfContainer,
    ButtonContent,

} from "./style";
import { typeTheme } from "../../../../Config/enumTheme";
import UserImageRounded from "../../../../Components/UserImageProfile";
import { theme } from "../../../../Theme/theme";
import { actionPendingMarcation, getPost } from "../../../../Service/Publications";
import { useNavigation } from "@react-navigation/native";
import { StackRoutes } from "../../../../Routes/StackTypes";
import useOtherProfilePost from "../../../../GlobalState/otherProfilePosts.zustand";
import { postMarcation } from "../../../../Types/postProps";

interface NotificationCardProps {
    user: {
        userId: number
        userNickname: string
        imageUrl: string
    }
    time: string
    postHexId: string
    idmarcations: number
    action?: string
    removeFollowers?: React.Dispatch<React.SetStateAction<postMarcation[]>>
}

export default function PostRequest(props: NotificationCardProps) {

    const navigation = useNavigation<StackRoutes>()

    console.log('id mark', props.idmarcations)

    const { setPost } = useOtherProfilePost()

    const navigationPost = async (postHexId: string) => {
        await getPost(postHexId).then((res) => {
            setPost(res.data.post[0])
            if (res.data.post[0]) {
                navigation.push("PostScreen", {
                    isAquivaded: false,
                    postHexId: res.data.post[0].postHexId,
                    postId: res.data.post[0].postId
                })
            }

        }).catch((e) => {
            console.warn('GetPost - NotificationProvider')
            console.log(e)
        })
    }

    const accept = async () => {
        await actionPendingMarcation(props.idmarcations, 1)
        props.removeFollowers && props.removeFollowers(
            prevUsersSelected => {
                const filter = prevUsersSelected.filter(post =>
                    post.idmarcations != props.idmarcations
                )
                return filter
            }
        )

    }
    const recuse = async () => {
        await actionPendingMarcation(props.idmarcations, 0)
        props.removeFollowers && props.removeFollowers(
            prevUsersSelected => {
                const filter = prevUsersSelected.filter(post =>
                    post.idmarcations != props.idmarcations
                )
                return filter
            }
        )
    }

    return (
        <TouchableOpacity onPress={() => navigationPost(props.postHexId)}>
            <StartToFollowContainer>
                <LetfContainer>
                    <UserImageRounded size={40} url={props.user.imageUrl} />
                    <NotificationContent>
                        <Text>
                            <UserAddresss>{props.user.userNickname} </UserAddresss>
                            {props.action}
                            <NotificationTime>
                                {props.time}
                            </NotificationTime>
                        </Text>
                    </NotificationContent>
                </LetfContainer>

                <View style={{ gap: 7, flexDirection: 'row' }}>

                    <ButtonContent
                        onPress={accept}
                        optionButton={typeTheme.default}
                    >
                        <Icon
                            name="check"
                            size={19}
                            color={theme.secondaryColor}
                        />
                    </ButtonContent>
                    <ButtonContent
                        onPress={recuse}
                        optionButton={typeTheme.light}
                    >
                        <Icon
                            name="close"
                            size={20}
                            color={theme.primarycolor}
                        />
                    </ButtonContent>

                </View>

            </StartToFollowContainer>
        </TouchableOpacity>
    )
}  