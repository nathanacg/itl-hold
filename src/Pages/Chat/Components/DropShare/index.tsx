import { Image } from "react-native-elements";
import {
    ShareMessageContainer,
    UserImage,
    PostInfo,
    UserInfo,
    UserName,
    PostLegend,
    PostImage,
    Title
} from "./style";
import { useEffect, useState } from "react";
import { getPost } from "../../../../Service/Publications";
import { feed } from "../../../../Types/feedProps";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import useOtherProfilePost from "../../../../GlobalState/otherProfilePosts.zustand";
import { useNavigation } from "@react-navigation/native";
import { StackRoutes } from "../../../../Routes/StackTypes";
import { getDropNav } from "../../../../Service/Drop";
import useDropsStore from "../../../../GlobalState/drops.zustand";
import Video from "react-native-video";


interface DropShareProps {
    postHexId: string
    isMy: boolean
}


export default function DropShare(props: DropShareProps) {
    const [drop, setDrop] = useState()
    const [errorDrop, setErrorDrop] = useState<boolean>(false)
    const navigation = useNavigation<StackRoutes>()


    useEffect(() => {
        getDropNav(props.postHexId)
            .then(res => {
                if (res.data.error) {
                    setErrorDrop(true)
                } else {
                    setDrop(res.data[0])
                }

            })
            .catch((e) => {
                console.warn('GetDropNav - DropShare')
                console.log(e)
                setErrorDrop(true)
            })
    }, [])


    return (
        <ShareMessageContainer
            disabled={errorDrop}
            onPress={() => {
                if (drop) {
                    useDropsStore.getState().setInitialDrop(drop)
                    navigation.push("DropsScreen", { postHexId: props.postHexId })
                }
            }}
            isMy={props.isMy}>
            {errorDrop ?
                <Title>Drops excluído</Title>
                : !drop ?
                    <ActivityIndicator />
                    :
                    <>
                        <TouchableOpacity ></TouchableOpacity>
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