import React from 'react'
import { StyleSheet, View } from 'react-native'

import { TouchableOpacity } from 'react-native-gesture-handler'

import {
    Container,
    ContentPage,
    SafeAreaViewContainer,
    TitlePagelight,
    BoldDarkBlue,
    UndelineText
} from '../../Components/elementsComponents'

import {
    TextDescriptionPage,
    ContainerBoxShare,
    BoxShare,
    TextLinkShare,
    ButtonShare,
    TextButtonShare
} from './style'

import Header from '../../Components/Header'
import Button from '../../Components/Button'

import { typeTheme } from '../../Config/enumTheme'
import { shareLink } from '../../Utils/share'
import { useNavigation } from '@react-navigation/native'
import { StackRoutes } from '../../Routes/StackTypes'
import useUserProfile from '../../GlobalState/userProfile.zustand'

export default function InviteFriend() {

    const navigation = useNavigation<StackRoutes>()

    const { user } = useUserProfile()

    return (
        <SafeAreaViewContainer>
            <Container
                style={{ backgroundColor: '#fff' }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                enableOnAndroid={true}
                enableAutomaticScroll={true}
                extraHeight={250}
                scrollEnabled={true}
            >
                <Header />
                <ContentPage>
                    <TitlePagelight> <BoldDarkBlue>Convide</BoldDarkBlue> amigos</TitlePagelight>
                    <TextDescriptionPage>
                        Copie o link abaixo e convide amigos para a sua rede Intellectus
                    </TextDescriptionPage>

                    <ContainerBoxShare>
                        <View style={[styles.card, styles.shadowProp]}>
                            <BoxShare>
                                <TextLinkShare>
                                    intellectus.app.br/convite
                                </TextLinkShare>
                                <ButtonShare onPress={() => shareLink({
                                    title: `${user.userName} convidou você para a Intellectus`,
                                    message: 'Entre você também no app Intellectus, uma nova rede social com conteúdo de filmes, séries, livros, músicas, e muito mais.',
                                    url: 'https://intellectus.app.br',

                                })}>
                                    <TextButtonShare>
                                        Compartilhar
                                    </TextButtonShare>
                                </ButtonShare>
                            </BoxShare>
                        </View>
                    </ContainerBoxShare>

                </ContentPage>
            </Container>
            <View style={{ marginBottom: 40 }}>
                <TouchableOpacity onPress={() => navigation.push("Splash")}>
                    <UndelineText>Pular</UndelineText>
                </TouchableOpacity>
            </View>
        </SafeAreaViewContainer>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: '100%'
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: 0.5, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
})