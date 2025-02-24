import { Image } from "react-native-elements";
import {
    ShareMessageContainer,
    UserImage,
    PostInfo,
    UserInfo,
    UserName,
    PostLegend,
    PostImage
} from "./style";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackRoutes } from "../../../../../../Routes/StackTypes";
import { getDropNav } from "../../../../../../Service/Drop";
import useDropsStore from "../../../../../../GlobalState/drops.zustand";
import Video from "react-native-video";
import { reels } from "../../../../../../Components/PostsProfileGroups/Drops";


interface DropShareProps {
    postHexId: string
    isMy: boolean
}


export default function DropShare(props: DropShareProps) {
    console.log("Video", props)
    const [drop, setDrop] = useState<reels>()
    const navigation = useNavigation<StackRoutes>()


    useEffect(() => {
        getDropNav(props.postHexId)
            .then(res => {
                setDrop(res.data[0])
            })
            .catch((e) => {
                console.warn('GetDropNav - DropShare')
                console.log(e)
            })
    }, [])


    return (
        <ShareMessageContainer onPress={() => {
            if (drop) {
                useDropsStore.getState().setInitialDrop(drop)
                navigation.navigate("DropsScreen", { postHexId: props.postHexId })
            }
        }} isMy={props.isMy}>
            {!drop ?
                <ActivityIndicator />
                :
                <>
                    <PostInfo>
                        <UserInfo>
                            <UserImage source={{
                                uri: drop.profileImage,
                                cache: "reload"
                            }} />
                            <UserName numberOfLines={1}>
                                {drop.username}
                            </UserName>
                        </UserInfo>
                    </PostInfo>
                    <Video source={{ uri: drop.principalMedia.url }} paused style={{ width: 200, height: 300 }} resizeMode="cover" />
                </>}
        </ShareMessageContainer>
    )
}