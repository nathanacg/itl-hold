import { SetStateAction, useEffect, useRef, useState } from 'react'
import { KeyboardAvoidingView, Platform, TextInput, TouchableOpacity } from 'react-native'

import { Icon } from 'react-native-elements'

import { StackRoutes } from '../../Routes/StackTypes'
import { useNavigation } from '@react-navigation/native'

import Header from '../../Components/Header'
import Button from '../../Components/Button'
import ModalElement from '../../Components/Modal'

import { typeTheme } from '../../Config/enumTheme'

import { User } from '../../Types/User'

import { getStoreObject, setStoreItem } from '../../Lib/asyncStorage'
import { sendPhoneValidation, verifyCodePhone } from '../../Service/Validators'

import {
    Container,
    TitlePagelight,
    BoldDarkBlue,
    ContentPage,
    SafeAreaViewContainer
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

import { registerUser } from '../../Service/UserRegister'
import { UserAddress } from '../../Components/ListUsersCard/style'
interface PhoneProps {
    setvisibleBottonModal: React.Dispatch<SetStateAction<boolean>>
}

export default function PhoneValidateCode({ setvisibleBottonModal }: PhoneProps) {

    const navigation = useNavigation<StackRoutes>()
    const [isModalVisible, setModalVisible] = useState<boolean>(false)

    const [user, setUser] = useState<User>()
    const [userData, setUserData] = useState<User>()

    const [timeSendNewCode, setTimeSendNewCode] = useState<number>(59)
    const [errCode, setErrCode] = useState<boolean>(false)
    const [showButton, setShowButton] = useState<boolean>(true)

    const input1Ref = useRef<TextInput>()
    const input2Ref = useRef<TextInput>()
    const input3Ref = useRef<TextInput>()
    const input4Ref = useRef<TextInput>()

    const [codeValidate, setcodeValidate] = useState('');


    async function getUserAsyncStorage() {
        const userData = await getStoreObject("@intellectus:User")
        setUser(userData.userPhone)
        setUserData(userData)
    }

    async function getCodePhone() {
        await sendPhoneValidation(user)
        setcodeValidate("")
    }

    useEffect(() => {
        countdown()
        getUserAsyncStorage()
    }, [])

    useEffect(() => {
        setModalVisible(true)
        setTimeout(() => {
            setModalVisible(false)
        }, 1500)
        getCodePhone()
    }, [user])

    function countdown() {
        var seconds = 59
        var countdownInterval = setInterval(function () {
            setTimeSendNewCode(seconds--)
            if (seconds < 0) {
                clearInterval(countdownInterval);
            }
        }, 1000)
    }

    const inputRefs = [input1Ref, input2Ref, input3Ref, input4Ref];

    const changeCodeDigit = (code: string, index: number) => {
        setcodeValidate(
            codeValidate.slice(0, index) + code + codeValidate.slice(index + 1)
        );

        if (code.length === 0) {
            // Se o código estiver vazio, volte para o input anterior
            const prevIndex = index - 1;
            if (prevIndex >= 0) {
                inputRefs[prevIndex].current?.focus();
            }
        } else if (code.length === 1 && index < inputRefs.length - 1) {
            // Se o código atingir o comprimento 1, vá para o próximo input
            inputRefs[index + 1].current?.focus();
        }
    };

    const changeCodeDigit1 = (code: string) => {
        setcodeValidate(code)
        if (code.length === 4) {
            input4Ref.current?.focus()
        } else if (code) {
            input2Ref.current?.focus()
        }
    }

    const changeCodeDigit2 = (code: string) => {
        setcodeValidate(codeValidate.slice(0, 1) + code + codeValidate.slice(2))
        if (code) {
            input3Ref.current?.focus()
        }

        if (!code) {
            input1Ref.current?.focus()
        }
    }

    const changeCodeDigit3 = (code: string) => {
        setcodeValidate(codeValidate.slice(0, 2) + code + codeValidate.slice(3))
        if (code) {
            input4Ref.current?.focus()
        }

        if (!code) {
            input2Ref.current?.focus()
        }
    }

    const changeCodeDigit4 = (code: string) => {
        setcodeValidate(codeValidate.slice(0, 3) + code)
        if (!code) {
            input3Ref.current?.focus()
        }
    }

    const sendCode = async () => {
        if (codeValidate && user) {
            await verifyCodePhone(user, codeValidate).then((response) => {
                if (response.status === 200) {
                    setErrCode(false)
                    setShowButton(false)
                    setTimeout(() => {
                        setcodeValidate("")
                        setShowButton(true)
                        navigation.reset({
                            index: 1,
                            routes: [{ name: 'CompletAccount' }],
                        });
                    }, 1000)

                }
            }).catch((err) => {
                setErrCode(true)
            })
        }
    }

    const newGetCode = async () => {
        await getCodePhone()
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
                keyboardVerticalOffset={-20}
                style={{ flex: 1 }}
            >
                <Container
                    style={{ backgroundColor: '#fff' }}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    enableOnAndroid={true}
                    enableAutomaticScroll={true}
                    extraHeight={250}
                    scrollEnabled={false}
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
                        textModal="Código enviado!"
                        textAlign='center'
                    />
                    <ContentPage>
                        <TitlePagelight>Enviamos <BoldDarkBlue>um código</BoldDarkBlue> para você</TitlePagelight>

                        <ContainerText>
                            <TextInformation>
                                Enviamos um código de autenticação para o seu <TextBold>telefone</TextBold> cadastrado.
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