import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useOtherProfilePost from '../../../../GlobalState/otherProfilePosts.zustand';
import { StackRoutes } from '../../../../Routes/StackTypes';
import { Container, ContainerGroups } from './style';
import ArquivedCardPost from '../../../../Components/ArchivedCardPost';
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
    postEnable: 0 | 1;
    postEvaluation: string;
    postHexId: string;
    postId: number;
    postLegend: string;
    postSpoiler: number;
    profileImage: string;
    tmdbMovieId: number;
    userId: number;
    publicationType: string,
    accountConfig: {
        showLikes: boolean
        showVisualizations: boolean
    },
    isClosed: 0 | 1,
    isSaved: boolean,
    followingUser: number,
    userName: string;
    userNickname: string;
}

interface PubliCard {
    postCard?: Post[];
}

export default function PodcastFilter(props: PubliCard) {

    const [publi, setPubli] = useState<Post[]>([]);
    const { setPost } = useOtherProfilePost();
    const navigation = useNavigation<StackRoutes>();
    const filteredPubli = publi.filter(item => item.postCategorie === 'Podcast');

    useEffect(() => {
        setPubli(props.postCard || []);
    }, [props.postCard]);

    return (
        <Container>
            <ContainerGroups>
                <FlatList
                    data={filteredPubli}
                    numColumns={3}
                    scrollEnabled={false}
                    keyExtractor={(item, index) => 'post' + item.postHexId}
                    renderItem={({ item }) => {
                        const markedUsers = item?.medias[0]?.markedUsers || [];
                        const firstMarkedUser = markedUsers[0];


                        return (
                            <ArquivedCardPost
                                source={{ uri: item?.medias[0].mediaUrl }}
                                onPress={() => {
                                    setPost({
                                        postId: item?.postId,
                                        publicationType: item?.medias[0].mediaType,
                                        profileImage: item?.profileImage,
                                        postLegend: item?.postLegend,
                                        postHexId: item?.postHexId,
                                        postSpoiler: 0,
                                        isClosed: 0,
                                        isSaved: false,
                                        accountConfig: {
                                            showLikes: true,
                                            showVisualizations: true,
                                        },
                                        postEvaluation: item?.postEvaluation,
                                        postCategorie: item?.postCategorie,
                                        postEnable: 1,
                                        userId: item?.userId,
                                        postDate: item?.postDate,
                                        userNickname: item?.userNickname,
                                        tmdbMovieId: item.tmdbMovieId,
                                        medias: [
                                            {
                                                mediaUrl: item?.medias[0].mediaUrl,
                                                markedUsers: [
                                                    {
                                                        username: firstMarkedUser?.username || '',
                                                        position: firstMarkedUser?.position || { x: 0, y: 0 }
                                                    }
                                                ],

                                                mediaExtension: item?.medias[0].mediaExtension
                                            },
                                        ],
                                        followingUser: 0,
                                    }

                                    )
                                    navigation.push("PostScreenSearch", { postHexId: item.postHexId, postId: item.postId, isArquivaded: false })
                                }}
                                styleType={
                                    publi?.length === 1
                                        ? 'single'
                                        : publi?.length === 2
                                            ? 'double'
                                            : 'triple'
                                }
                            />
                        );
                    }}
                />
            </ContainerGroups>
        </Container>
    );
}
