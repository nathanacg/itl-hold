import { useEffect, useRef, useState } from "react"
import { Image, TouchableOpacity, View } from "react-native"

import { useNavigation } from "@react-navigation/native"
import { StackRoutes } from "../../../../Routes/StackTypes"

import { Container, Infos, InfoCard, InfoText, InfoTextProfile } from "./style"

import { getLikes } from "../../../../Service/Like"
import { getComments } from "../../../../Service/Comment"

import { getViewsDrop } from "../../../../Service/Visualizations"
import { formatNumbers } from "../../../../Utils/formatNumbers"
import Video, { VideoProperties } from "react-native-video"
import UserImageRounded from "../../../../Components/UserImageProfile"
import { UserImage, UserImageFeed } from "../../../Drop/style"
import useUserProfile from "../../../../GlobalState/userProfile.zustand"

interface DropCardProps {
    url: string
    userNickname: string
    profileImage: string
    postHexId: string
    index: number
    /* thumbnailUrl: string */
    commentsCount: number
    likesCount: number
    viewCount: number
}

export default function DropCard(props: DropCardProps) {

    const navigation = useNavigation<StackRoutes>()

    const { user } = useUserProfile()

    const [commentList, setCommentList] = useState([])
    const [likesList, setLikesList] = useState([])
    const [pausedVideo, setPausedVideo] = useState(false)

    const [viewsCount, setViewsCount] = useState<number>(0)

    const videoRef = useRef<VideoProperties>();

    const onLoad = ({ duration }) => {
        videoRef.current?.seek(0)
    }

    const handlePauseVideo = () => {
        setTimeout(() => {
            setPausedVideo(true)
        }, 2000)
    }

    const viewsDrop = async () => {
        try {
            getViewsDrop(props.postHexId)
                .then(res => {
                    setViewsCount(res.data.reelsTotalVisualization)
                })
        } catch (error) {
            console.log('DEU RUIM BUSCAR A VISUALIZAÇÃO: ', error)
        }

    }

    const updateLikes = () => {
        getLikes(props.postHexId)
            .then(res => {
                setLikesList(res.data.users)
            })
            .catch(erro => console.log("erro ao buscar likes", erro))
    }

    const getAllComments = () => {
        getComments(props.postHexId)
            .then(res => {
                const onlyComments = res.data.filter((comment: any) => comment.commentedId == null)
                setCommentList(onlyComments)
            })
    }

    useEffect(() => {
        viewsDrop()
        getAllComments()
        updateLikes()
        handlePauseVideo()
    }, [])

    return (

        <TouchableOpacity onPress={() => navigation.push("DropsScreen", { postHexId: props.postHexId, index: props.index })}>
            <Container>
                <Video ref={videoRef} onLoad={onLoad} source={{ uri: props.url }} style={{ zIndex: 0, width: 150, height: 219, borderRadius: 6 }} paused resizeMode="cover" />
                <View style={{ position: 'absolute', flexDirection: 'row', gap: 6, top: 8, left: 10, alignItems: 'center' }}>
                    <UserImageFeed source={{ uri: props.profileImage, cache: "reload" }} />
                    <InfoTextProfile>{props.userNickname}</InfoTextProfile>
                </View>
                <Infos>

                    <InfoCard>
                        <InfoText>{props.likesCount}</InfoText>
                        <TouchableOpacity>
                            <Image source={require('../../../../Assets/Icons/likeSmall.png')} />
                        </TouchableOpacity>
                    </InfoCard>
                    <InfoCard>
                        <InfoText>{props.commentsCount}</InfoText>
                        <TouchableOpacity>
                            <Image style={{ borderRadius: 6 }} source={require('../../../../Assets/Icons/commentsSmall.png')} />
                        </TouchableOpacity>
                    </InfoCard>
                    {user.userNickname === props.userNickname && (
                        < InfoCard >
                            <InfoText>{viewsCount}</InfoText>
                            <TouchableOpacity>
                                <Image source={require('../../../../Assets/Icons/views.png')} style={{ width: 15, height: 15, resizeMode: 'contain' }} />
                            </TouchableOpacity>
                        </InfoCard>
                    )}
                </Infos>
            </Container>
        </TouchableOpacity >

    )
}