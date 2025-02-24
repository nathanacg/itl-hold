import React, { useState, useEffect } from 'react'
import { TouchableOpacity, StyleSheet, Text, StatusBar } from 'react-native'

import { CommonActions, useIsFocused } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { StackRoutes } from '../../Routes/StackTypes'
import { typeTheme } from '../../Config/enumTheme'
import { fontStyle } from '../../Theme/theme'


import Button from '../../Components/Button'

import {
    Container,
    TextContent,
    ImageBackground,
    TitleHome,
    ContentPage,
    ButtonLogin,
    TextUnderline,
    IconLanguage,
    ContentBottomPage,
    SelectDropdownLanguageContainer,
    ContainerText
} from './style'

import homebg1 from '../../Assets/Image/homebg1.png'
import homebg2 from '../../Assets/Image/homebg2.png'
import homebg3 from '../../Assets/Image/homebg3.png'
import homebg4 from '../../Assets/Image/homebg4.png'

import brasil from '../../Assets/Icons/brasilLogo.png'
import spanish from '../../Assets/Icons/espanish.png'
import unitedStates from '../../Assets/Icons/unitedStates.png'

import { Icon } from 'react-native-elements'

const backgroudImages = [homebg1, homebg2, homebg3, homebg4]


export default function Welcome() {
    const navigation = useNavigation<StackRoutes>()
    const [languageSelected, setLanguageSelected] = useState()
    const isFocused = useIsFocused()


    const [imageBackground, setImageBackground] = useState()

    const [languageOptions, setlanguageOptions] = useState<any[]>([
        <IconLanguage source={brasil} />,
        <IconLanguage source={spanish} />,
        <IconLanguage source={unitedStates} />
    ])

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            if (!isFocused) {
                return
            }
            e.preventDefault()
            navigation.dispatch({
                ...CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                }),
            })
        })
        return unsubscribe
    }, [navigation, isFocused])

    const dropDownIcon = () => {
        return <Icon type='feather' name={'chevron-down'} color={"#fff"} />
    }

    useEffect(() => {
        let index = 0
        const interval = setInterval(() => {
            const newBackgroundImage = backgroudImages[index]
            setImageBackground(newBackgroundImage)
            index = (index + 1) % backgroudImages.length
        }, 2000)

        return () => clearInterval(interval)
    }, [])


    return (
        <Container>
            <StatusBar barStyle={'dark-content'} />
            <ImageBackground defaultSource={require('../../Assets/Image/homebg1.png')} source={imageBackground} />
            <LinearGradient colors={['#e9e9ef68', '#254da3d4', '#030a1e']} style={{ width: '100%', height: '100%', position: 'absolute', }}>
                <ContentPage>
                    <ContentBottomPage>
                        <TitleHome>Seja bem-vindo(a)</TitleHome>
                        <ContainerText>
                            <TextContent>
                                A Intellectus adora todas as redes sociais e incentiva que seus usuários continuem lá, divulgando conteúdos e interagindo.
                            </TextContent>
                            <TextContent>
                                Aqui na Intellectus, queremos que compartilhem apenas conteúdos culturais, contribuindo para o aprimoramento do
                                App e em busca de uma evolução
                                intelectual de todos.
                            </TextContent>
                        </ContainerText>

                        <Button
                            pressFunction={() => navigation.navigate('CreateAccount')}
                            textButton="Criar conta"
                            typebutton={typeTheme.light}
                        />

                        <TouchableOpacity style={{ marginTop: -20 }} onPress={() => navigation.navigate('Login')}>
                            <ButtonLogin>
                                {"Já tem uma conta? "}
                                <Text style={styles.UnderlineText}>Entrar</Text>
                            </ButtonLogin>
                        </TouchableOpacity>
                    </ContentBottomPage>
                </ContentPage>
            </LinearGradient>
        </Container>
    )
}

const styles = StyleSheet.create({
    selctDropDownButtonStyle: {
        width: "24%",
        height: 40,
        borderColor: "#c4c4c44",
        backgroundColor: "#ffffff0",
        marginTop: 35,
    },
    UnderlineText: {
        textDecorationLine: 'underline',
        color: "#fff",
        marginLeft: 10,
        fontSize: 15,
        fontFamily: fontStyle.regular
    }
});

