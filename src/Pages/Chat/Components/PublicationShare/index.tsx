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
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import useOtherProfilePost from "../../../../GlobalState/otherProfilePosts.zustand";
import { useNavigation } from "@react-navigation/native";
import { StackRoutes } from "../../../../Routes/StackTypes";
import UserImageRounded from "../../../../Components/UserImageProfile";
import { fontSize, fontStyle } from "../../../../Theme/theme";


interface PublicationShareProps {
    postHexId: string
    isMy: boolean
}


export default function PublicationShare(props: PublicationShareProps) {
    const [post, setPost] = useState<feed>()
    const [errorPost, setErrorPost] = useState<boolean>(false)
    const navigation = useNavigation<StackRoutes>()


    useEffect(() => {
        getPost(props.postHexId)
            .then(res => {
                if (res.data.post.length < 1) {
                    setErrorPost(true)
                } else {
                    setPost(res.data.post[0])
                }
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
        <ShareMessageContainer
            disabled={errorPost}
            onPress={() => {
                useOtherProfilePost.setState({
                    post
                })
                navigation.push("PostScreen", { postHexId: post.postHexId, postId: post?.postId, isAquivaded: false })
            }} isMy={props.isMy}>
            {errorPost ?
                <Title>Publicação excluída</Title>
                : !post ?
                    <ActivityIndicator />
                    :
                    <>
                        <PostInfo>
                            <UserInfo >
                                <UserImageRounded size={30} url={post.profileImage} />
                                <UserName>
                                    {post.userNickname}
                                </UserName>
                            </UserInfo>
                            {!post.postColor && <PostLegend
                                numberOfLines={1}
                            >
                                {post.postLegend}
                            </PostLegend>}
                        </PostInfo>
                        {post.postColor ?
                            <View
                                style={{
                                    height: 120,
                                    width: '100%',
                                    marginTop: -8,
                                    backgroundColor: post.postColor.split('&')[0],
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Text
                                    style={{
                                        color: post.postColor.split('&')[1],
                                        fontSize: 11,
                                        fontFamily: fontStyle.regular,
                                    }}
                                >{post.postLegend}</Text>
                            </View>
                            :
                            <PostImage source={{ uri: post.medias[0].mediaUrl, cache: "reload" }} />
                        }

                    </>}

        </ShareMessageContainer>
    )
}