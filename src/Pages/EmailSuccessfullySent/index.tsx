import React from 'react'
import { Image, View } from 'react-native'
import { StackRoutes } from '../../Routes/StackTypes'

import { useNavigation } from '@react-navigation/native'

import Header from '../../Components/Header'
import Button from '../../Components/Button'

import { typeTheme } from '../../Config/enumTheme'

import mailImage from '../../Assets/Image/mail.png'

import {
    Container,
    ContentPage,
    TitlePagelight,
    BoldDarkBlue,
    TextSimple,
    ContainerImage,
    SafeAreaViewContainer
} from "../../Components/elementsComponents"

export default function EmailSuccessfullySent() {
    const navigation = useNavigation<StackRoutes>();
    return (
        <SafeAreaViewContainer>
            <Container>
                <Header />
                <ContentPage>
                    <TitlePagelight><BoldDarkBlue>E-mail enviado </BoldDarkBlue>com sucesso</TitlePagelight>
                    <ContainerImage>
                        <Image style={{ width: 120, height: 120, resizeMode: 'contain' }} source={mailImage} />
                    </ContainerImage>
                    <TextSimple>
                        Verifique sua caixa de entrada de e-mails. Caso não tenha recebido, consulte também a pasta
                        de spam.
                    </TextSimple>
                </ContentPage>
            </Container>

            <Button pressFunction={() => navigation.navigate('EmailRevalidateCode')} textButton="Avançar" typebutton={typeTheme.default} />
            <View style={{ marginTop: 30 }} />
        </SafeAreaViewContainer>
    )
}