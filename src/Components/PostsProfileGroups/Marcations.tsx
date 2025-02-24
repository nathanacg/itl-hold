import React, { memo, useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, ImageBackground, Text, View } from 'react-native';

import { getAllInMarcations, getPostProfile } from '../../Service/Profile';

import {
    PublicationCard, PublicationContainer, Separator, CarouselIndex, IndexContainer,
} from './style';
import useOtherProfilePost from '../../GlobalState/otherProfilePosts.zustand';
import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';
import { PublicationType } from '../../Types/myPublications.types';
import { fontStyle, theme } from '../../Theme/theme';
import { AddText, TextNotPublicationsArchiveds, TextNotPublicationsNot } from '../AlbumCard/style';
import { Icon } from 'react-native-elements';
import { IRepost } from '../../Types/repost.type';
import Post from '../Post';
import { IUserInfoConfig, feed } from '../../Types/feedProps';
import { getPost } from '../../Service/Publications';
import useUserProfile from '../../GlobalState/userProfile.zustand';
import useFeedData from '../../GlobalState/feed.zustand';

interface PublicationProps {
    userId: number,
    filter?: string
}

const Marcations = ({ userId, filter }: PublicationProps) => {
    const navigation = useNavigation<StackRoutes>();
    const [userPost, setUserPost] = useState();
    const [userSearchPost, setUserSearchPost] = useState<PublicationType[]>();
    const { setRepost, setPost } = useOtherProfilePost()
    const { user } = useUserProfile()
    const { feedList } = useFeedData()
    const [account, setAccount] = useState<IUserInfoConfig>()

    const handleNavigationToPost = async (post: PublicationType) => {
        let tempFind = feedList.find(item => item.postHexId == post.postHexId)
        if (!tempFind) {
            const res = await getPost(post.postHexId)
            tempFind = res.data.post[0]

        }
        const data = {
            ...tempFind,
            accountConfig: {
                showLikes: !!account?.showLikes,
                showVisualizations: !!account?.showVisualizations
            }
        }
        setPost(data)
        navigation.push("PostScreen", { isAquivaded: false, postHexId: post.postHexId, postId: post.postId })
    }


    useEffect(() => {
        getAllInMarcations(userId).then(response => {
            setUserPost(response.data.result)
        }).catch(err => {
            console.warn(err)
        })

    }, [])


    // if (!userPost) {
    //     return <ActivityIndicator size={'small'} color={theme.primarycolor} style={{ marginTop: 40 }} />;
    // }


    const dimensions = Dimensions.get('screen').width


    return (
        <>
            <FlatList
                data={userPost}
                numColumns={3}
                scrollEnabled={false}
                ListEmptyComponent={
                    <View style={{ width: '75%', padding: 20, justifyContent: 'center', alignSelf: 'center', alignContent: 'center' }}>
                        <TextNotPublicationsNot>
                            {userId === user.userId ? 'Quando você for marcado em fotos e vídeos, eles aparecem aqui.' :
                                `Este perfil ainda não possui marcação\nem fotos e vídeos.`
                            }
                        </TextNotPublicationsNot>
                    </View>
                }
                keyExtractor={(item, index) => "post" + item.postHexId + (item.repostOwner && item.repostOwner.repostHexId)}
                renderItem={({ item }) => (

                    <View>

                        <>




                            <PublicationContainer
                                onPress={() => handleNavigationToPost(item)}
                            >
                                {item.mediaUrl && !item.postColor && (
                                    <>
                                        {item.postSpoiler == 1 ? (
                                            <View style={{
                                                backgroundColor: '#000000',
                                                borderWidth: 1,
                                                borderColor: '#fff',
                                                height: '100%',
                                                width: '100%'
                                            }}>
                                                <PublicationCard
                                                    style={{
                                                        width: 25,
                                                        height: 25,
                                                        marginTop: 37,
                                                        marginLeft: dimensions <= 393 ? 52 : 58,
                                                        borderColor: '#fff',
                                                    }}
                                                    source={require('../../Assets/Icons/spoilerIcon.png')}
                                                />
                                                <View style={{ position: 'absolute', bottom: 25, left: 0, width: '100%' }}>
                                                    <Text style={{ paddingLeft: 30, paddingRight: 30, fontFamily: fontStyle.light, color: '#fff', fontSize: dimensions <= 393 ? 6 : 8, textAlign: 'center' }}>Publicação ocultada por conter spoiler.</Text>
                                                    <Text style={{ paddingTop: 12, fontFamily: fontStyle.Bold, color: '#fff', fontSize: dimensions <= 393 ? 6 : 8, textAlign: 'center' }}>Ver spoiler</Text>
                                                </View>
                                            </View>
                                        ) : (
                                            <PublicationCard
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    borderWidth: 1,
                                                    borderColor: '#fff',
                                                }}
                                                source={{ uri: item.mediaUrl }}
                                            />
                                        )}
                                    </>
                                )}

                                {item.postColor && (
                                    <>
                                        {item.postSpoiler == 1 ? (
                                            <View style={{
                                                backgroundColor: '#000000',
                                                borderWidth: 1,
                                                borderColor: '#fff',
                                                height: '100%',
                                                width: '100%'
                                            }}>
                                                <PublicationCard
                                                    style={{
                                                        width: 25,
                                                        height: 25,
                                                        marginTop: 37,
                                                        marginLeft: dimensions <= 393 ? 52 : 58,
                                                        borderColor: '#fff',
                                                    }}
                                                    source={require('../../Assets/Icons/spoilerIcon.png')}
                                                />
                                                <View style={{ position: 'absolute', bottom: 25, left: 0, width: '100%' }}>
                                                    <Text style={{ paddingLeft: 30, paddingRight: 30, fontFamily: fontStyle.light, color: '#fff', fontSize: dimensions <= 393 ? 6 : 8, textAlign: 'center' }}>Publicação ocultada por conter spoiler.</Text>
                                                    <Text style={{ paddingTop: 12, fontFamily: fontStyle.Bold, color: '#fff', fontSize: dimensions <= 393 ? 6 : 8, textAlign: 'center' }}>Ver spoiler</Text>
                                                </View>
                                            </View>
                                        ) : (
                                            <View
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    borderWidth: 1,
                                                    borderColor: '#fff',
                                                    backgroundColor: item.postSpoiler == 1 ? '#000000' : item.postColor.split("&")[0],
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Text numberOfLines={3} style={{ padding: 10, fontSize: 10, color: item.postColor.split("&")[1], fontFamily: fontStyle.light, textAlign: 'center' }}>
                                                    {item.postLegend}
                                                </Text>
                                            </View>

                                        )}</>
                                )}

                            </PublicationContainer>
                        </>


                    </View>
                )}
            />
            <Separator />
        </>
    )
}

export default memo(Marcations);