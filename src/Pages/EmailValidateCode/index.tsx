import React, { useEffect, useState, useRef, SetStateAction } from "react";
import { TextInput, TouchableOpacity, Text, Platform, KeyboardAvoidingView } from "react-native"
import { Icon } from "react-native-elements";
import { StackRoutes } from "../../Routes/StackTypes";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useToast } from 'react-native-toast-notifications';

import Header from "../../Components/Header";
import Button from "../../Components/Button";
import ModalElement from "../../Components/Modal";
import { typeTheme } from "../../Config/enumTheme";

import { sendEmailValidation, verifyCodeEmail } from "../../Service/Validators"
import { getStoreObject } from "../../Lib/asyncStorage";
import { User } from "../../Types/User";

import {
    Container,
    TitlePagelight,
    BoldDarkBlue,
    ContentPage,
    SafeAreaViewContainer,
} from "../../Components/elementsComponents"

import {
    TextInformation,
    ContainerText,
    TextCenter,
    UnderlineText,
    CodeInputContent,
    AlignInfoText,
    CodeInput,
    TextErrorCode,
    InputBox,
    TextBold,
    FlexContent
} from "./style"

interface EmailProps {
    setvisibleBottonModal: React.Dispatch<SetStateAction<boolean>>
}

export default function EmailValidateCode({ setvisibleBottonModal }: EmailProps) {

    const navigation = useNavigation<StackRoutes>()


    const input1Ref = useRef<TextInput>()
    const input2Ref = useRef<TextInput>()
    const input3Ref = useRef<TextInput>()
    const input4Ref = useRef<TextInput>()

    const [timeSendNewCode, setTimeSendNewCode] = useState<number>(59)
    const [errCode, setErrCode] = useState<boolean>(false)
    const [showButton, setShowButton] = useState<boolean>(true)

    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [user, setUser] = useState<User>()

    const [codeValidate, setcodeValidate] = useState('')

    async function getCodeEmail() {
        await sendEmailValidation(user)
    }

    async function getUserAsyncStorage() {
        const userData = await getStoreObject("@intellectus:User")
        setUser(userData.userEmail)
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
        getCodeEmail()
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

    const inputRefs = [input1Ref, input2Ref, input3Ref, input4Ref];

    const changeCodeDigit = (code: string, index: number) => {
        setcodeValidate(
            codeValidate.slice(0, index) + code + codeValidate.slice(index + 1)
        );

        if (code.length === 0) {
            const prevIndex = index - 1;
            if (prevIndex >= 0) {
                inputRefs[prevIndex].current?.focus();
            }
        } else if (code.length === 1 && index < inputRefs.length - 1) {
            inputRefs[index + 1].current?.focus();
        }
    };


    const sendCode = async () => {
        await verifyCodeEmail(user, codeValidate).then((response) => {
            setErrCode(false)
            setShowButton(false)
            setTimeout(() => {
                setcodeValidate("")
                setShowButton(true)
                navigation.navigate("PhoneValidateCode")
            }, 1000)
        }).catch((err) => {
            console.log(err)
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
                keyboardVerticalOffset={-20}
                style={{ flex: 1 }}
            >
                <Container
                    style={{ backgroundColor: '#fff' }}
                    resetScrollToCoords={{ x: 100, y: 0 }}
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
                                    ref={inputRefs[0]}
                                    value={codeValidate.charAt(0)}
                                    onChangeText={(code: string) => changeCodeDigit(code, 0)}
                                />
                            </InputBox>
                            <InputBox>
                                <CodeInput
                                    keyboardType="numeric"
                                    ref={inputRefs[1]}
                                    maxLength={1}
                                    value={codeValidate.charAt(1)}
                                    onChangeText={(code: string) => changeCodeDigit(code, 1)}
                                />
                            </InputBox>
                            <InputBox>
                                <CodeInput
                                    keyboardType="numeric"
                                    ref={inputRefs[2]}
                                    maxLength={1}
                                    value={codeValidate.charAt(2)}
                                    onChangeText={(code: string) => changeCodeDigit(code, 2)}
                                />
                            </InputBox>
                            <InputBox>
                                <CodeInput
                                    keyboardType="numeric"
                                    ref={inputRefs[3]}
                                    maxLength={1}
                                    value={codeValidate.charAt(3)}
                                    onChangeText={(code: string) => changeCodeDigit(code, 3)}
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