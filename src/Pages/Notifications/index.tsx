import { useEffect, useState } from 'react'
import { ActivityIndicator, SectionList, TouchableOpacity, View } from 'react-native'

import { Container, SafeAreaViewContainer } from '../../Components/elementsComponents'
import OneUserAction from './Components/OneUserAction'
import FollowRequest from './Components/FollowRequest'
import StartToFollow from './Components/StartToFollow'
import Header from '../../Components/Header'
import AntDesign from 'react-native-vector-icons/AntDesign'

import {
    ActivitiesTime,
    ActivitiesContainer,
    ActivitiescontainerList
} from './style'

import { useNavigation } from '@react-navigation/native'
import { StackRoutes } from '../../Routes/StackTypes'

import { getAllNotifications } from '../../Service/Notifications'
import { handleTime } from '../../Utils/handleTime'

import { EndFeedImage, EndFeedText, EndFeedcontainer } from '../Feed/style'

import { getPost } from '../../Service/Publications'

import { theme } from '../../Theme/theme'

import useOtherProfilePost from '../../GlobalState/otherProfilePosts.zustand'
import useUserProfile from '../../GlobalState/userProfile.zustand'
import { listRequestFollowers } from '../../Service/Profile'
import { Image } from 'react-native-elements'
import UserImageRounded from '../../Components/UserImageProfile'
import { UserAddresss } from './Components/FollowRequest/style'

export interface NotificationType {
    notificationId: number
    notificationText: string
    notificationType: string
    postHexId: string
    notificationActionUserId: number
    notificationOwnerUserId: number
    notificationTimeDate: string
    commentId: number
    profile: {
        userId: number
        profileImage: string
        userNickname: string
    }
    media: {
        mediaUrl: string | null
        mediaType: string
        mediaExtension: string
    }
}

export interface UserAccept {
    userName: string,
    userNickname: string,
    userRequestId: number,
    profileImage: string,
    createAt: string
    userId: number
}

export default function Notifications() {

    const [notificationsList, setNotificationsList] = useState<NotificationType[]>([])

    const navigation = useNavigation<StackRoutes>()

    const { setPost } = useOtherProfilePost()

    const [isLoading, setIsLoading] = useState(false)

    const { user } = useUserProfile()

    const [listPrivade, setListPrivade] = useState<UserAccept[]>([])

    const groupedNotifications = notificationsList.reduce((groups, notification) => {

        const date = new Date(notification.notificationTimeDate)

        if (isToday(date)) {
            groups.today.push(notification)
        } else if (isYesterday(date)) {
            groups.yesterday.push(notification)
        } else if (isThisWeek(date)) {
            groups.thisWeek.push(notification)
        } else if (isThisMonth(date)) {
            groups.thisMonth.push(notification)
        } else {
            groups.older.push(notification)
        }

        return groups

    }, { today: [], yesterday: [], thisWeek: [], thisMonth: [], older: [] } as {
        today: NotificationType[]
        yesterday: NotificationType[]
        thisWeek: NotificationType[]
        thisMonth: NotificationType[]
        older: NotificationType[]
    })

    function isToday(date: Date) {
        const today = new Date()
        return date.toDateString() === today.toDateString()
    }

    function isYesterday(date: Date) {
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - date.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays === 1
    }

    function isThisWeek(date: Date) {
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - date.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays <= 7 && diffDays > 1
    }

    function isThisMonth(date: Date) {
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - date.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays <= 30 && diffDays > 7
    }

    const sections: {
        title: string
        data: NotificationType[]
    }[] = [
        { title: 'Hoje', data: groupedNotifications.today },
        { title: 'Ontem', data: groupedNotifications.yesterday },
        { title: 'Esta semana', data: groupedNotifications.thisWeek },
        { title: 'Este mês', data: groupedNotifications.thisMonth },
        { title: 'Antigas', data: groupedNotifications.older },
    ].filter(section => section.data.length > 0)



    const handleNotificationType = (notification: NotificationType) => {

        const time = handleTime(notification.notificationTimeDate)

        const navigationPost = async (postHexId: string) => {
            await getPost(postHexId).then((res) => {
                setPost(res.data.post[0])
                if (res.data.post[0]) {
                    navigation.navigate("PostScreen", {
                        isAquivaded: false,
                        postHexId: notification.postHexId,
                        postId: notification.notificationId
                    })
                }

            }).catch((e) => {
                console.warn('GetPost - NotificationProvider')
                console.log(e)
            })
        }

        switch (notification.notificationType) {

            case 'LIKED_POST':
                return (
                    <TouchableOpacity onPress={() => navigationPost(notification.postHexId)}>
                        <OneUserAction
                            action={'curtiu sua publicação.'}
                            time={time}
                            user={{
                                name: notification.profile.userNickname,
                                imageUrl: notification.profile.profileImage
                            }}
                            postUrl={notification.media && notification.media.mediaUrl}
                        />
                    </TouchableOpacity>
                )
            case 'COMMENT_POST':
                return (
                    <TouchableOpacity onPress={() => navigationPost(notification.postHexId)}>
                        <OneUserAction
                            action={`comentou: ${notification.notificationText}.`}
                            time={time}
                            user={{
                                name: notification.profile.userNickname,
                                imageUrl: notification.profile.profileImage
                            }}
                            postUrl={notification.media ? notification.media.mediaUrl : null}
                        />
                    </TouchableOpacity>
                )

            case 'RESPONSE_COMMENT':
                return (
                    <TouchableOpacity onPress={() => navigationPost(notification.postHexId)}>
                        <OneUserAction
                            action={`respondeu seu comentário: ${notification.notificationText}.`}
                            time={time}
                            user={{
                                name: notification.profile.userNickname,
                                imageUrl: notification.profile.profileImage
                            }}
                            postUrl={notification.media ? notification.media.mediaUrl : null}
                        />
                    </TouchableOpacity>
                )

            case 'LIKED_COMMENT':
                return (
                    <TouchableOpacity onPress={() => navigationPost(notification.postHexId)}>
                        <OneUserAction
                            action={`curtiu seu comentário: ${notification.notificationText}.`}
                            time={time}
                            user={{
                                name: notification.profile.userNickname,
                                imageUrl: notification.profile.profileImage
                            }}
                            postUrl={notification.media ? notification.media.mediaUrl : null}
                        />
                    </TouchableOpacity>
                )

            case 'LIKED_ANSWER':
                return (
                    <TouchableOpacity onPress={() => navigationPost(notification.postHexId)}>
                        <OneUserAction
                            action={`curtiu sua resposta: ${notification.notificationText}.`}
                            time={time}
                            user={{
                                name: notification.profile.userNickname,
                                imageUrl: notification.profile.profileImage
                            }}
                            postUrl={notification.media ? notification.media.mediaUrl : null}
                        />
                    </TouchableOpacity>
                )

            case 'LIKED_DROP':
                return (
                    <TouchableOpacity onPress={() => navigation.navigate("DropsScreen", { postHexId: notification.postHexId, index: 0 })}>
                        <OneUserAction
                            action={'curtiu o seu drop.'}
                            time={time}
                            user={{
                                name: notification.profile.userNickname,
                                imageUrl: notification.profile.profileImage
                            }}
                        />
                    </TouchableOpacity>
                )


            case 'FOLLOWER':
                return (
                    <StartToFollow
                        user={{
                            userNickname: notification.profile.userNickname,
                            imageUrl: notification.profile.profileImage,
                            userId: notification.profile.userId
                        }}
                        action={`começou a te seguir.`}
                        time={time}
                    />
                )

            case 'ASKED_TO_FOLLOW':
                return (
                    <FollowRequest
                        notificationId={notification.notificationId}
                        user={{
                            userNickname: notification.profile.userNickname,
                            imageUrl: notification.profile.profileImage,
                            userId: notification.profile.userId
                        }}
                        action={`solicitou para te seguir.`}
                        time={time}
                    />
                )

            case 'REQUEST_MARCATION':
                return (
                    <TouchableOpacity onPress={() => navigationPost(notification.postHexId)}>
                        <OneUserAction
                            action={`marcou você em uma publicação.`}
                            time={time}
                            user={{
                                name: notification.profile.userNickname,
                                imageUrl: notification.profile.profileImage
                            }}
                            postUrl={notification.media ? notification.media.mediaUrl : null}
                        />
                    </TouchableOpacity>
                )

            case 'LIKED_CARTAZ':
                return (
                    <TouchableOpacity onPress={() => navigationPost(notification.postHexId)}>
                        <OneUserAction
                            action={`curtiu seu cartaz.`}
                            time={time}
                            user={{
                                name: notification.profile.userNickname,
                                imageUrl: notification.profile.profileImage
                            }}
                            postUrl={notification.media ? notification.media.mediaUrl : null}
                        />
                    </TouchableOpacity>
                )

            default:
                return <></>
        }

    }

    useEffect(() => {
        const getNotify = async () => {
            setIsLoading(true)
            try {
                const res = await getAllNotifications(1)
                const listFollowers = await listRequestFollowers()

                setListPrivade(listFollowers.data)
                setNotificationsList(res.data)
            } catch (error) {
                console.log('Erro ao buscar as notificações.', error)
                console.error('Erro ao buscar as notificações.', error)
            } finally {
                setIsLoading(false)
            }
        }

        getNotify()

    }, [])

    const onPressRequestFollowersPage = () => {
        navigation.push("RequestFollower", { followers: listPrivade })
    }
    return (
        <SafeAreaViewContainer>
            <Container>
                <ActivitiesContainer>
                    <Header titleHeader="Atividades" />
                    <ActivitiescontainerList>
                        {user.private_account == 1 && (
                            <TouchableOpacity onPress={onPressRequestFollowersPage}>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    marginBottom: 10
                                }}>
                                    {listPrivade.length == 0 ? (
                                        <>
                                            <AntDesign
                                                name="adduser"
                                                color={"#231F20"}
                                                size={30}
                                            />


                                            <View style={{
                                                flexDirection: 'column',
                                                alignItems: 'flex-start',
                                                justifyContent: 'flex-start',
                                                marginLeft: "3%"
                                            }}>

                                                <UserAddresss>
                                                    Solicitações para seguir
                                                </UserAddresss>
                                                <UserAddresss
                                                    style={{
                                                        color: "#231f2058"
                                                    }}
                                                >
                                                    Aprove ou ignore para solicitações
                                                </UserAddresss>

                                            </View>
                                        </>
                                    ) :

                                        (
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                width: '100%',
                                            }}>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',

                                                }}>
                                                    <UserImageRounded size={45} url={listPrivade[0].profileImage} />
                                                    <View style={{
                                                        flexDirection: 'column',
                                                        alignItems: 'flex-start',
                                                        justifyContent: 'flex-start',
                                                        marginLeft: "5%"
                                                    }}>

                                                        <UserAddresss>
                                                            Solicitações para seguir
                                                        </UserAddresss>
                                                        <UserAddresss style={{
                                                            color: "#231f2058"
                                                        }}>

                                                            {listPrivade[0].userNickname}
                                                            {listPrivade.length > 1 ? `e outras pessoas ${listPrivade.length}` : ''}
                                                        </UserAddresss>

                                                    </View>
                                                </View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-around',
                                                    alignItems: 'center'
                                                }}>
                                                    <View style={{
                                                        backgroundColor: theme.primarycolor,
                                                        height: 6,
                                                        width: 6,
                                                        borderRadius: 6
                                                    }} />
                                                    <AntDesign
                                                        name="right"
                                                        color={"#231f2058"}
                                                        size={23}
                                                    />
                                                </View>
                                            </View>
                                        )
                                    }


                                </View>



                            </TouchableOpacity>
                        )}

                        {isLoading ? <ActivityIndicator style={{ marginTop: 200 }} size={'small'} color={theme.primarycolor} /> : (

                            <SectionList
                                sections={sections}
                                keyExtractor={(item) => 'notification' + item.notificationId}
                                scrollEnabled={false}
                                renderSectionHeader={({ section: { title } }) => (
                                    <ActivitiesTime>{title}</ActivitiesTime>
                                )}

                                ListEmptyComponent={
                                    <EndFeedcontainer style={{ marginTop: 30 }}>
                                        <EndFeedImage source={require("../../Assets/Image/face-logo.png")} />
                                        <EndFeedText>Nenhuma atividade até o momento.</EndFeedText>
                                    </EndFeedcontainer>
                                }

                                renderItem={({ item }) => handleNotificationType(item)}
                            />
                        )}
                    </ActivitiescontainerList>
                </ActivitiesContainer>
            </Container>
        </SafeAreaViewContainer >
    )
}