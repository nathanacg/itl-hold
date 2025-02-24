import { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'

import { ContainerPage } from './styled'

import { SafeAreaViewContainer } from '../../Components/elementsComponents'
import Header from '../../Components/Header'

import { postMarcation } from '../../Types/postProps'
import PostRequest from '../Notifications/Components/PostRequest'
import { getListMarcations } from '../../Service/Profile'
import useUserProfile from '../../GlobalState/userProfile.zustand'
import { fontStyle } from '../../Theme/theme'
import { getPost } from '../../Service/Publications'

export default function MarcationsRequest() {

    const { user } = useUserProfile()

    const [posts, setPosts] = useState<postMarcation[]>([])

    const [time, setTime] = useState<string>('')

    useEffect(() => {
        const getList = async () => {
            try {
                const res = await getListMarcations(user.userId)
                setPosts(res.data.data)
            } catch (e) {
                console.log('Erro ao buscar marcações pendentes.', e)
            }
        }
        getList()
    }, [])

    return (
        <SafeAreaViewContainer >
            <Header titleHeader="Marcações pendentes" />
            <ContainerPage>
                <View style={{ marginTop: 10 }}>
                    {posts.length > 0 ? (
                        <Text style={{ fontFamily: fontStyle.regular }}>Aprove ou desaprove as marcações.</Text>
                    ) : (
                        <Text style={{ fontFamily: fontStyle.regular }}>
                            Quando outras pessoas fizerem marcação sua em publicações delas, estas postagens serão exibidas aqui.
                        </Text>
                    )}
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {posts.map((item, index) => (
                        <>

                            <View key={index}>
                                <PostRequest
                                    idmarcations={item.idmarcations}
                                    postHexId={item.postHexId}
                                    user={{
                                        userNickname: item.userInfo.userNickname,
                                        imageUrl: item.userInfo.profileImage,
                                        userId: item.userId
                                    }}
                                    removeFollowers={setPosts}
                                    action={`marcou você em uma publicação.`}
                                    time={time}
                                />
                            </View>
                        </>
                    ))}
                </ScrollView>
            </ContainerPage>
        </SafeAreaViewContainer >
    )
}