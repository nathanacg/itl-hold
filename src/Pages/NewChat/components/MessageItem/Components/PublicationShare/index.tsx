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
import { getPost } from "../../../../../../Service/Publications";
import { feed } from "../../../../../../Types/feedProps";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import useOtherProfilePost from "../../../../../../GlobalState/otherProfilePosts.zustand";
import { useNavigation } from "@react-navigation/native";
import { StackRoutes } from "../../../../../../Routes/StackTypes";
import UserImageRounded from "../../../../../../Components/UserImageProfile";


interface PublicationShareProps {
    postHexId: string
    isMy: boolean
}


export default function PublicationShare(props: PublicationShareProps) {

    const [post, setPost] = useState<feed>()
    const navigation = useNavigation<StackRoutes>()


    useEffect(() => {
        getPost(props.postHexId)
            .then(res => {
                setPost(res.data.post[0])
            })
            .catch((e) => {
                console.warn('GetPost - PublicationShare')
                console.log(e)
            })
    }, [])

    /* 
    const navigationDrop = (postHexId: string) => {
            getDropNav(postHexId)
            .then(res => {
                setInitialDrop(res.data[0])
            })
            navigation.navigate("DropsScreen", { postHexId: postHexId })
        }
    */

    return (
        <ShareMessageContainer disabled={!post} onPress={() => {
            useOtherProfilePost.setState({
                post
            })
            navigation.navigate("PostScreen")
        }} isMy={props.isMy}>
            {!post ?
                <ActivityIndicator />
                :
                <>
                    <PostInfo>
                        <UserInfo>
                            <UserImageRounded url={post.profileImage} />
                            <UserName>
                                {post.userNickname}
                            </UserName>
                        </UserInfo>
                        <PostLegend
                            numberOfLines={1}
                        >
                            {post.postLegend}
                        </PostLegend>
                    </PostInfo>
                    <PostImage source={{ uri: post.medias[0].mediaUrl, cache: "reload" }} />
                </>}
        </ShareMessageContainer>
    )
}