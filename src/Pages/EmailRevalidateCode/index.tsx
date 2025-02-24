import React, { useEffect, useState, useRef, SetStateAction } from 'react'
import { TextInput, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native'

import { Icon } from 'react-native-elements'

import { StackRoutes } from '../../Routes/StackTypes'
import { useNavigation } from '@react-navigation/native'

import Header from '../../Components/Header'
import Button from '../../Components/Button'
import ModalElement from '../../Components/Modal'
import { typeTheme } from '../../Config/enumTheme'

import { sendEmailValidation, verifyCodeEmail } from '../../Service/Validators'

import { getStoreItem } from '../../Lib/asyncStorage'

import {
    Container,
    TitlePagelight,
    BoldDarkBlue,
    ContentPage,
    SafeAreaViewContainer,
} from '../../Components/elementsComponents'

import {
    TextInformation,
    ContainerText,
    TextCenter,
    UnderlineText,
    CodeInputContent,
    CodeInput,
    TextErrorCode,
    InputBox,
    TextBold,
    FlexContent
} from './style'

interface EmailProps {
    setvisibleBottonModal: React.Dispatch<SetStateAction<boolean>>
}

export default function EmailRevalidateCode({ setvisibleBottonModal }: EmailProps) {

    const navigation = useNavigation<StackRoutes>()

    const input1Ref = useRef<TextInput>()
    const input2Ref = useRef<TextInput>()
    const input3Ref = useRef<TextInput>()
    const input4Ref = useRef<TextInput>()

    const [timeSendNewCode, setTimeSendNewCode] = useState<number>(59)
    const [errCode, setErrCode] = useState<boolean>(false)
    const [showButton, setShowButton] = useState<boolean>(true)

    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [user, setUser] = useState('')

    const [codeValidate, setcodeValidate] = useState('')

    async function getCodeEmail() {
        await sendEmailValidation(user)
    }
    async function getUserAsyncStorage() {
        const userData = await getStoreItem("@intellectus:emailResetPassword")
        const userMail = JSON.stringify(userData)
        const cleanedUserMail = userMail.replace(/^"(.*)"$/, '$1')
        setUser(cleanedUserMail)
    }

    useEffect(() => {
        getUserAsyncStorage()
        countdown()
    }, [])

    useEffect(() => {
        setModalVisible(true)
        setTimeout(() => {
            setModalVisible(false)
        }, 1500)
    }, [user])

    function countdown() {
        var seconds = 59;
        var countdownInterval = setInterval(function () {
            setTimeSendNewCode(seconds--)
            if (seconds < 0) {
                clearInterval(countdownInterval)
            }
        }, 1000)
    }

    const changeCodeDigit1 = (code: string) => {
        setcodeValidate(code)
        if (code.length === 4) {
            input4Ref.current?.focus()
        } else if (code) {
            input2Ref.current?.focus()
        } else if (code.length === 2) {
            input3Ref.current?.focus()
        } else if (code.length === 3) {
            input4Ref.current?.focus()
        }
    }

    const changeCodeDigit2 = (code: string) => {
        setcodeValidate(codeValidate.slice(0, 1) + code + codeValidate.slice(2))
    }

    const changeCodeDigit3 = (code: string) => {
        setcodeValidate(codeValidate.slice(0, 2) + code + codeValidate.slice(3))
    }

    const changeCodeDigit4 = (code: string) => {
        setcodeValidate(codeValidate.slice(0, 3) + code)
    }

    useEffect(() => {
        if (codeValidate.length === 1) {
            input2Ref.current?.focus()
        } else if (codeValidate.length === 2) {
            input3Ref.current?.focus()
        } else if (codeValidate.length === 3) {
            input4Ref.current?.focus()
        }
    }, [codeValidate])

    const sendCode = async () => {

        verifyCodeEmail(user, codeValidate).then((response) => {
            setErrCode(false)
            setShowButton(false)
            setTimeout(() => {
                setcodeValidate("")
                setShowButton(true)
                navigation.navigate("ResetPassword")
            }, 1000)
        }).catch((err) => {
            console.log('deu ruim.', err.response.data)
            setErrCode(true)
        })

    }

    const newGetCode = async () => {
        await getCodeEmail()
        countdown()
        setcodeValidate("")
        setErrCode(false)
        setModalVisible(true)
        setTimeout(() => {
            setModalVisible(false)
        }, 1500)
    }

    return (
        <SafeAreaViewContainer>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <Container
                    style={{ backgroundColor: '#fff' }}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    enableOnAndroid={true}
                    enableAutomaticScroll={true}
                    extraHeight={250}
                    scrollEnabled={true}
                >
                    <Header />
                    <ModalElement
                        setvisibleBottonModal={setvisibleBottonModal}
                        isModalVisible={isModalVisible}
                        iconModal={<Icon
                            name='check-circle'
                            type='feather'
                            color={"#049908"}
                            size={50}
                        />}
                        textModal="Código enviado."
                        textAlign='center'
                    />
                    <ContentPage>
                        <TitlePagelight>Enviamos <BoldDarkBlue>um código</BoldDarkBlue> para você</TitlePagelight>

                        <ContainerText>
                            <TextInformation>
                                Enviamos um código de autenticação para o seu <TextBold>e-mail</TextBold> cadastrado.
                            </TextInformation>
                            <TextInformation>
                                Caso não tenha recebido, consulte também sua caixa de spam.
                            </TextInformation>
                            <TextInformation>
                                O código expira em 60 segundos.
                            </TextInformation>
                        </ContainerText>

                        <CodeInputContent>
                            <InputBox>
                                <CodeInput
                                    keyboardType="numeric"
                                    ref={input1Ref}
                                    value={codeValidate.charAt(0)}
                                    onChangeText={changeCodeDigit1}
                                />
                            </InputBox>
                            <InputBox>
                                <CodeInput
                                    keyboardType="numeric"
                                    ref={input2Ref}
                                    maxLength={1}
                                    value={codeValidate.charAt(1)}
                                    onChangeText={(code: string) => changeCodeDigit2(code)}
                                />
                            </InputBox>
                            <InputBox>
                                <CodeInput
                                    keyboardType="numeric"
                                    ref={input3Ref}
                                    maxLength={1}
                                    value={codeValidate.charAt(2)}
                                    onChangeText={(code: string) => changeCodeDigit3(code)}
                                />
                            </InputBox>
                            <InputBox>
                                <CodeInput
                                    keyboardType="numeric"
                                    ref={input4Ref}
                                    maxLength={1}
                                    value={codeValidate.charAt(3)}
                                    onChangeText={(code: string) => changeCodeDigit4(code)}
                                />
                            </InputBox>
                        </CodeInputContent>

                        {errCode && (
                            <TextErrorCode>
                                Código incorreto
                            </TextErrorCode>
                        )}

                        <FlexContent>
                            <TextCenter>
                                Não recebi o código.
                            </TextCenter>
                            {timeSendNewCode <= 0 ? (
                                <TouchableOpacity style={{ padding: 0, marginBottom: 3, }} onPress={() => newGetCode()}>
                                    <UnderlineText active={timeSendNewCode <= 0}> Clique aqui</UnderlineText>
                                </TouchableOpacity>
                            ) : (
                                <UnderlineText active={timeSendNewCode <= 0}> Clique aqui</UnderlineText>
                            )}

                        </FlexContent>
                        <TextCenter>
                            para enviar novamente em {timeSendNewCode} segundos.
                        </TextCenter>
                    </ContentPage>
                </Container>
                {showButton && (
                    <Button
                        pressFunction={() => sendCode()}
                        textButton="Avançar"
                        typebutton={typeTheme.default}
                    />
                )}
            </KeyboardAvoidingView>

        </SafeAreaViewContainer>
    )
}