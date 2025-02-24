import { useState } from 'react'
import { ScrollView, View } from 'react-native'

import { useRoute } from '@react-navigation/native'
import { ContainerPage } from './styled'
import { UserAccept } from '../Notifications'

import { SafeAreaViewContainer } from '../../Components/elementsComponents'
import Header from '../../Components/Header'

import FollowRequest from '../Notifications/Components/FollowRequest'

export default function PageRequestFollowers() {
    const { params } = useRoute()
    const routeParams = params as { followers: UserAccept[] }
    const [followers, setFollowers] = useState<UserAccept[]>(routeParams.followers)

    return (
        <SafeAreaViewContainer >
            <Header titleHeader="Solicitações para seguir" />
            <ContainerPage>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {followers.map(item => (
                        <View key={item.userId}>
                            <FollowRequest
                                notificationId={0}
                                user={{
                                    userNickname: item.userNickname,
                                    imageUrl: item.profileImage,
                                    userId: item.userRequestId
                                }}
                                removeFollowers={setFollowers}
                                private={true}
                                action={`solicitou para te seguir.`}
                                time={""}
                            />
                        </View>
                    ))}
                </ScrollView>
            </ContainerPage>
        </SafeAreaViewContainer >
    )
}