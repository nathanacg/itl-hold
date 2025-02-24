import { memo, useEffect, useState } from "react"
import { ActivityIndicator, Alert, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { StackRoutes } from "../../Routes/StackTypes"

import { ButtonText, HeaderButton, PostLegendText, RespostContainer } from "./style"

import useUserProfile from "../../GlobalState/userProfile.zustand"

import { SafeAreaViewContainer2 } from "../../Components/elementsComponents"
import { getPost, repostPublication, repostPublicationWithAudio } from "../../Service/Publications"
import useRepostPubli from "../../GlobalState/repostPost.zustand"
import RepostHeader from "./RepostHeader"
import { AllTypesPostsFeed } from "../../Types/discriminator"
import Post from "../../Components/Post"
import useFeedData from "../../GlobalState/feed.zustand"
import { ContentPage } from "../Welcome/style"
import { theme } from "../../Theme/theme"
import PostInputRepost from "../../Components/PostInputRepost"
import AudioMessageReceived from "../../Components/PostInputRepost/AudioMessageReceived"

const Repost = () => {
    const navigation = useNavigation<StackRoutes>()
    const [postLegend, setPostLegend] = useState<string>("")
    const { repost } = useRepostPubli();
    const [post, setPost] = useState<AllTypesPostsFeed | null>(null)
    const [preview, setPreview] = useState<boolean>()
    const [load, setLoad] = useState(false)
    const { user } = useUserProfile();
    const { incrementFeed } = useFeedData()
    const [audioPath, setAudioPath] = useState('')
    const [metrics, setMetrics] = useState<string>('')



    function handleNavigateGoBack() {
        if (!preview) {
            navigation.pop()
        } else {
            setPreview(false)
        }
    }

    const handleNavigateToRepostPreview = () => {
        if (!post) {
            //Alert.alert('Aviso', 'Algo deu errado, favor tentar mais tarde!')
            return
        }

        setPreview(true)
    }

    const handlePublicateRepost = async () => {
        setLoad(true)
        if (!post) return


        if (audioPath) {
            const datas = new FormData()

            datas.append("file", {
                uri: audioPath,
                type: 'audio/x-m4a',
                name: 'audio.m4a',
            })

            await repostPublicationWithAudio(repost?.postHexId, repost?.postId, datas)
                .then((res) => {
                    incrementFeed({
                        medias: post?.medias,
                        postCategorie: post.postCategorie,
                        postDate: post.postDate,
                        profileImage: user.profileImage,
                        followingUser: 0,
                        postEnable: 1,
                        isClosed: post.isClosed ? 1 : 0,
                        postEvaluation: post.postEvaluation,
                        postSpoiler: post.postSpoiler ? 1 : 0,
                        postHexId: post.postHexId,
                        postId: post.postId,
                        postColor: post.postColor,
                        postLegend: post.postLegend,
                        userId: user.userId,
                        userNickname: user.userNickname,
                        publicationType: "repost",
                        tmdbMovieId: post.tmdbMovieId,
                        originalPost: {
                            post: {
                                ...post,
                                tmdbMovieId: post.tmdbMovieId
                            },
                            medias: post.medias,
                            postOwner: post,
                        },
                        repostOwner: {
                            userId: user.userId,
                            profileImage: user.profileImage,
                            userNickname: user.userNickname,
                            userName: user.userName,
                            repostId: post.postId,
                            repostHexId: res.repostHexId,
                            repostLegend: postLegend,
                            postDate: `${new Date()}`,
                            isClosed: post.isClosed,
                            postEvaluation: post.postEvaluation,
                        },
                    })
                    //navigation.push('FeedScreen')
                })
                .catch((e) => {
                    console.warn('RepostPublication - Repost')
                    console.log(e)
                }).finally(() => {
                    setLoad(false)
                })
        } else {

            await repostPublication(postLegend, repost.postHexId, repost.postId)
                .then((res) => {
                    incrementFeed({
                        medias: post?.medias,
                        postCategorie: post.postCategorie,
                        postDate: post.postDate,
                        profileImage: user.profileImage,
                        followingUser: 0,
                        postEnable: 1,
                        isClosed: post.isClosed ? 1 : 0,
                        postEvaluation: post.postEvaluation,
                        postSpoiler: post.postSpoiler ? 1 : 0,
                        postHexId: post.postHexId,
                        postId: post.postId,
                        postColor: post.postColor,
                        postLegend: post.postLegend,
                        userId: user.userId,
                        userNickname: user.userNickname,
                        publicationType: "repost",
                        tmdbMovieId: post.tmdbMovieId,
                        originalPost: {
                            post: {
                                ...post,
                                tmdbMovieId: post.tmdbMovieId
                            },
                            medias: post.medias,
                            postOwner: post,
                        },
                        repostOwner: {
                            userId: user.userId,
                            profileImage: user.profileImage,
                            userNickname: user.userNickname,
                            userName: user.userName,
                            repostId: post.postId,
                            repostHexId: res.repostHexId,
                            repostLegend: postLegend,
                            postDate: `${new Date()}`,
                            isClosed: post.isClosed,
                            postEvaluation: post.postEvaluation,
                        },
                    })
                    navigation.push('FeedScreen')
                })
                .catch((e) => {
                    console.warn('RepostPublication - Repost')
                    console.log(e)
                }).finally(() => {
                    setLoad(false)
                })
        }



    }

    useEffect(() => {
        (async () => {
            try {
                const response = await getPost(repost?.postHexId)
                setPost(response.data.post[0])
            } catch (error) {
                console.warn('GetPost - Repost')
                console.log(error)
            }
        })()
    }, [])


    if (!post) {
        return <></>
    }

    return (
        <SafeAreaViewContainer2>
            <ContentPage>
                <RespostContainer showsVerticalScrollIndicator={false}>
                    <RepostHeader
                        userImage={user.profileImage}
                        title={!preview ? 'Repostar' : 'Pré-visualizar'}
                        onPress={handleNavigateGoBack}
                        actionHeaderElement1={
                            <>
                                {!preview &&
                                    <HeaderButton onPress={handleNavigateToRepostPreview}>
                                        <ButtonText>Pré-visualizar</ButtonText>
                                    </HeaderButton>
                                }
                                {preview && !load && (
                                    <HeaderButton onPress={handlePublicateRepost}>
                                        <ButtonText>Publicar</ButtonText>
                                    </HeaderButton>
                                )}
                                {load && (
                                    <ActivityIndicator size={'small'} color={theme.primarycolor} />
                                )}
                            </>
                        }
                    />


                    {!preview &&
                        <View
                            style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10 }}
                        >
                            <PostInputRepost
                                value={postLegend}
                                setValue={setPostLegend}
                                setAudio={setAudioPath}
                                metrics={setMetrics}
                            />
                        </View>
                    }
                    {preview &&
                        <View
                            style={{ alignItems: 'flex-start', marginBottom: 20 }}
                        >
                            <PostLegendText >
                                {postLegend}
                            </PostLegendText>
                        </View>
                    }

                    {preview && audioPath &&
                        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginLeft: 20 }}>
                            <AudioMessageReceived
                                uri={audioPath}
                                configAudMetrics={[-33.92938995361328, -35.6361083984375, -22.325828552246094, -20.04671287536621, -20.937410354614258, -18.9128394814918, - 37.697021484375, -39.822540283203125, -38.041709899902344, -41.189544677734375, -35.6361083984375, -22.325828552246094, -38.041709899902344, -41.189544677734375, -35.6361083984375, -38.041709899902344, -41.189544677734375, -35.6361083984375, -22.325828552246094, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -39.822540283203125, -42.133541107177734, -42.133541107177734, -32.26824188232422, -32.26824188232422, -13.833025932312012, -13.833025932312012, -24.762142181396484, -38.041709899902344, -41.189544677734375, -35.6361083984375, -22.325828552246094, -24.762142181396484, -23.383811950683594, -23.383811950683594, -21.76665687561035, -21.76665687561035, -16.243961334228516, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -38.041709899902344, -41.189544677734375, -38.041709899902344, -41.189544677734375, -38.041709899902344, -41.189544677734375, -35.6361083984375, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -39.822540283203125, -33.92938995361328, -38.041709899902344, -41.189544677734375, -35.6361083984375, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -39.822540283203125, -20.133541107177734, -42.133541107177734, -32.26824188232422, -32.26824188232422, -13.833025932312012, -13.833025932312012, -24.762142181396484, -24.762142181396484, -23.383811950683594, -23.383811950683594, -21.76665687561035, -21.76665687561035, -16.243961334228516, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -38.041709899902344, -41.189544677734375, -38.041709899902344, -41.189544677734375, -35.6361083984375, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -39.822540283203125, -33.92938995361328, -38.041709899902344, -41.189544677734375, -35.6361083984375, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -39.822540283203125, -42.133541107177734, -42.133541107177734, -32.26824188232422, -32.26824188232422, -13.833025932312012, -13.833025932312012, -24.762142181396484, -24.762142181396484, -23.383811950683594, -23.383811950683594, -21.76665687561035, -21.76665687561035, -16.243961334228516, -22.325828552246094, -20.04671287536621, -26.937410354614258, -20.697021484375, -22.325828552246094, -20.04671287536621, -26.937410354614258, -37.697021484375, -38.041709899902344, -41.189544677734375, -38.041709899902344, -10.189544677734375]}
                                preview
                            />
                        </View>
                    }

                    <View style={{ marginTop: 20 }} />

                    <Post
                        postActions={false}
                        repostEnabled={false}
                        index={0}
                        screen={true}
                        postSpoiler={post.postSpoiler}
                        hiddenPostLegend={!!post.postColor}
                        postCategorie={post.postCategorie}
                        postColor={post.postColor}
                        userNickname={post.userNickname}
                        profileImage={post.profileImage}
                        hasSpoiler={post.postSpoiler === 1}
                        medias={post.medias}
                        postLegend={post.postLegend || ''}
                        markedUsers={post.markedUsers}
                        avaliationPost={post.postEvaluation}
                        paddingTop={post.postColor ? "10px" : "0px"}
                        postHexId={post.postHexId}
                        userId={post.userId}
                        followingUser={post.followingUser}
                        postDate={post.postDate}
                        isClosed={post.isClosed}
                        isSaved={post.isSaved}
                        tmdbMovieId={post.tmdbMovieId}
                        postId={post.postId}
                    />
                </RespostContainer>
            </ContentPage>
        </SafeAreaViewContainer2>
    )

}

export default memo(Repost)