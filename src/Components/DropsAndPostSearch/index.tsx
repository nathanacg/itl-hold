import { useEffect, useState } from 'react'
import { View, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native'

import { theme } from '../../Theme/theme'
import { PostLegendText } from './styles'

import Video from 'react-native-video'

import { useNavigation } from '@react-navigation/native'
import { StackRoutes } from '../../Routes/StackTypes'

import useOtherProfilePost from '../../GlobalState/otherProfilePosts.zustand'

import { getSearchExplorerv2 } from '../../Service/Publications'

import { Posts } from './interfaces/posts'
import { Drops } from './interfaces/drops'

interface Post {
    medias: [
        {
            angle: number | null;
            idmedias: number;
            markedUsers: {
                username: string,
                userNickname: string,
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
    filter: boolean
}

export function DropsAndPostSearch(props: PubliCard) {

    const [posts, setPosts] = useState<Posts[]>([])
    const [drops, setDrops] = useState<Drops[]>([])

    const [publi, setPubli] = useState<Post[]>([])

    const [loading, setLoading] = useState<boolean>(false)

    const { setPost } = useOtherProfilePost()
    const navigation = useNavigation<StackRoutes>()

    const getRandomPosts = async () => {
        setLoading(true)
        await getSearchExplorerv2()
            .then(res => {
                setPosts(res?.data.posts)
                setDrops(res?.data.reels)
            }).catch(error => {
                console.log(error)
            }).finally(() => setLoading(false))
    }

    useEffect(() => {
        getRandomPosts()
    }, [])

    useEffect(() => {
        setPubli(props.postCard || [])
    }, [props.postCard])


    if (loading) {
        return <ActivityIndicator size={'small'} color={theme.primarycolor} style={{ marginTop: '60%' }} animating />
    }

    return (
        <View style={{ marginTop: 15 }}>
            {props.filter ? (
                <FlatList
                    data={publi}
                    numColumns={3}
                    scrollEnabled={false}
                    keyExtractor={(item) => "post" + item.postHexId}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    setPost(item)
                                    navigation.push("PostScreenSearch", { isArquivaded: false, postHexId: item.postHexId, postId: item.postId })
                                }}
                                style={{ padding: 1, width: '33.33%' }}>
                                {item.medias && item?.medias[0]?.mediaExtension === 'jpg' ? (
                                    <Image
                                        resizeMode='cover'
                                        source={{ uri: item.medias[0].mediaUrl }}
                                        style={{ width: '100%', height: 129 }}
                                    />
                                ) : (
                                    <View style={{
                                        backgroundColor: item?.postColor ? item?.postColor.split("&")[0] : '#000',
                                        width: '100%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 129
                                    }}>
                                        <PostLegendText
                                            numberOfLines={3}
                                            style={{
                                                color: item?.postColor ? item?.postColor.split("&")[1] : '#fff',
                                                fontWeight: 400,
                                                fontSize: 10
                                            }}
                                        >{item.postLegend}</PostLegendText>
                                    </View>
                                )}
                            </TouchableOpacity>
                        )
                    }}
                />

            ) : (
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                    <View style={{ width: '66%' }}>
                        <FlatList
                            data={posts}
                            numColumns={2}
                            scrollEnabled={false}
                            keyExtractor={(item) => "post" + item.postHexId}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => {
                                            setPost(item)
                                            navigation.push("PostScreenSearch", { isArquivaded: false, postHexId: item.postHexId, postId: item.postId })
                                        }}
                                        style={{ padding: 1, width: '50%' }}>
                                        {item.medias && item?.medias[0]?.mediaExtension === 'jpg' ? (
                                            <Image
                                                resizeMode='cover'
                                                source={{ uri: item.medias[0].mediaUrl }}
                                                style={{ width: '100%', height: 129 }}
                                            />
                                        ) : (
                                            <View style={{
                                                backgroundColor: item?.postColor ? item?.postColor.split("&")[0] : '#000',
                                                width: '100%',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                height: 129
                                            }}>
                                                <PostLegendText
                                                    numberOfLines={3}
                                                    style={{
                                                        color: item?.postColor ? item?.postColor.split("&")[1] : '#fff',
                                                        fontWeight: 400,
                                                        fontSize: 10
                                                    }}
                                                >{item.postLegend}</PostLegendText>
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View>
                    <View style={{ width: '34%' }}>
                        <FlatList
                            data={drops}
                            numColumns={1}
                            scrollEnabled={false}
                            keyExtractor={(item) => "drops" + item.postHexId}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => {
                                            navigation.push("DropsSearch", { item })
                                        }}
                                        style={{ padding: 1, width: '100%' }}>
                                        <Video
                                            paused
                                            resizeMode='cover'
                                            source={{ uri: item.principalMedia.url }}
                                            style={{ width: '100%', height: 260 }}
                                        />
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View>
                </View>

            )}

        </View>
    )
}
