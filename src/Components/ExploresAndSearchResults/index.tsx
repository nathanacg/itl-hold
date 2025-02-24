import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, TouchableOpacity, View } from 'react-native';
import { Container, ContainerGroups } from './style';
import ArquivedCardPost from '../ArchivedCardPost';
import useOtherProfilePost from '../../GlobalState/otherProfilePosts.zustand';
import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';
import { PostLegendText } from '../../Pages/PostPreview/style';

interface Post {
    medias: [
        {
            angle: number | null;
            idmedias: number;
            markedUsers: {
                username: string,
                position: { x: number, y: number },
                idmarcations: number
            }[];
            mediaExtension: string;
            mediaName: string;
            mediaSize: string;
            mediaType: string;
            mediaUrl: string;
        }
    ];
    postCategorie: string;
    postDate: string;
    postColor?: string
    postEnable: string;
    postEvaluation: string;
    postHexId: string;
    postId: number;
    postLegend: string;
    postSpoiler: number;
    profileImage: string;
    tmdbMovieId: number;
    userId: number;
    userName: string;
    userNickname: string;
}

interface PubliCard {
    postCard?: Post[];
}

const dimension = Dimensions.get('screen').width

export default function ExploresAndSearchResults(props: PubliCard) {
    const [publi, setPubli] = useState<Post[]>();
    const { setPost } = useOtherProfilePost()
    const navigation = useNavigation<StackRoutes>()

    useEffect(() => {
        setPubli(props.postCard)
    }, [props.postCard])

    return (
        <Container>
            <ContainerGroups>
                <FlatList
                    data={publi}
                    scrollEnabled={false}
                    numColumns={3}
                    keyExtractor={(item, index) => 'post' + index}
                    renderItem={({ item }) => {
                        const markedUsers = item?.medias[0]?.markedUsers || [];
                        const firstMarkedUser = markedUsers[0];

                        return (
                            <>
                                {item?.medias[0].mediaExtension === 'jpg' ? (
                                    <ArquivedCardPost
                                        source={{ uri: item?.medias[0].mediaUrl }}
                                        onPress={() => {
                                            setPost({
                                                postId: item?.postId,
                                                postColor: item?.postColor,
                                                publicationType: item?.medias[0].mediaType,
                                                profileImage: item?.profileImage,
                                                postLegend: item?.postLegend,
                                                postHexId: item?.postHexId,
                                                postSpoiler: item?.postSpoiler,
                                                isClosed: 0,
                                                postEvaluation: item?.postEvaluation,
                                                postCategorie: item?.postCategorie,
                                                postEnable: 1,
                                                userId: item?.userId,
                                                postDate: item?.postDate,
                                                userNickname: item?.userNickname,
                                                tmdbMovieId: item?.tmdbMovieId,
                                                medias: [
                                                    {
                                                        mediaUrl: item?.medias[0].mediaUrl,
                                                        markedUsers: firstMarkedUser
                                                            ? [
                                                                {
                                                                    username: firstMarkedUser?.username,
                                                                    position: firstMarkedUser?.position
                                                                }
                                                            ]
                                                            : null,
                                                        mediaExtension: item?.medias[0].mediaExtension
                                                    },
                                                ],
                                                followingUser: 0,
                                            })

                                            navigation.push("PostScreenSearch", { isArquivaded: false, postHexId: item?.postHexId, postId: item?.postId })
                                        }}
                                        styleType={
                                            publi?.length === 1
                                                ? 'single'
                                                : publi?.length === 2
                                                    ? 'double'
                                                    : 'triple'
                                        }
                                    />
                                ) : (
                                    <TouchableOpacity
                                        onPress={() => {
                                            setPost({
                                                postId: item?.postId,
                                                postColor: item?.postColor,
                                                publicationType: item?.medias[0].mediaType,
                                                profileImage: item?.profileImage,
                                                postLegend: item?.postLegend,
                                                postHexId: item?.postHexId,
                                                postSpoiler: item?.postSpoiler,
                                                isClosed: 0,
                                                postEvaluation: item?.postEvaluation,
                                                postCategorie: item?.postCategorie,
                                                postEnable: 1,
                                                userId: item?.userId,
                                                postDate: item?.postDate,
                                                userNickname: item?.userNickname,
                                                tmdbMovieId: item?.tmdbMovieId,
                                                medias: [
                                                    {
                                                        mediaUrl: item?.medias[0].mediaUrl,
                                                        markedUsers: firstMarkedUser
                                                            ? [
                                                                {
                                                                    username: firstMarkedUser?.username,
                                                                    position: firstMarkedUser?.position
                                                                }
                                                            ]
                                                            : null,
                                                        mediaExtension: item?.medias[0].mediaExtension
                                                    },
                                                ],
                                                followingUser: 0,
                                            })

                                            navigation.push("PostScreenSearch", { isArquivaded: false, postHexId: item?.postHexId, postId: item.postId })
                                        }}
                                        style={{
                                            backgroundColor: item?.postColor ? item?.postColor.split("&")[0] : '#000',
                                            width: dimension > 394 ? 142 : 132,
                                            margin: 1,
                                            borderWidth: 1,
                                            borderColor: 'white',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: dimension > 394 ? 142 : 132

                                        }}>

                                        <PostLegendText
                                            style={{
                                                color: item?.postColor ? item?.postColor.split("&")[1] : '#fff',
                                                fontWeight: 400,
                                                fontSize: 10
                                            }}
                                        >{item.postLegend}</PostLegendText>

                                    </TouchableOpacity>
                                )}

                            </>
                        );
                    }}
                />
            </ContainerGroups >
        </Container>

    )
}