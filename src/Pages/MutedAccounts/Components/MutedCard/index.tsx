import { View } from "react-native";
import { ContainerAccounts, ImageProfile, Text, UserName, UserNickname } from "./style";
import ToggleSwitch from "../../../../Components/ToggleSwitch";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Users {
    usernickName?: string,
    userImage?: string,
    userName?: string
    publicationMuted?: boolean,
    storyMuted?: boolean,
    onPublicationMutedChange?: (value: boolean) => void
    onStoryMutedChange?: (value: boolean) => void
    handleLongPress?: () => void
}

export default function MutedCard(props: Users) {
    const [publicationMuted, setPublicationMuted] = useState(props.publicationMuted || false);
    const [cartazMuted, setCartazMuted] = useState(props.storyMuted || false);

    const passingPublication = () => {
        const newPublicationMuted = !publicationMuted;
        setPublicationMuted(newPublicationMuted);

        if (props.onPublicationMutedChange) {
            props.onPublicationMutedChange(newPublicationMuted);
        }
    };

    const passingStory = () => {
        const newCartazMuted = !cartazMuted;
        setCartazMuted(newCartazMuted);

        if (props.onStoryMutedChange) {
            props.onStoryMutedChange(newCartazMuted);
        }
    };

    return (
        <>
            <View >
                <ContainerAccounts>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <ImageProfile source={{ uri: props.userImage }} />
                        <View>
                            <UserName>
                                {props.usernickName}
                            </UserName>
                            <UserNickname>
                                {props.userName}
                            </UserNickname>
                            <Text>Silenciar publicação</Text>
                            <Text>Silenciar Cartaz</Text>
                        </View>
                    </View>
                    <View style={{ gap: -15, paddingTop: 30 }}>
                        <ToggleSwitch value={publicationMuted} setValue={() => passingPublication()} />
                        <ToggleSwitch value={cartazMuted} setValue={() => passingStory()} />
                    </View>
                </ContainerAccounts>
            </View>
        </>
    )
}