import React, { useState, useEffect } from "react";

import Header from "../../Components/Header";
import Button from "../../Components/Button";
import Input from "../../Components/Input";
import MeasureSecurityPassword from "../../Components/MeasureSecurityPassword";
import { useToast } from "react-native-toast-notifications";
import { useNavigation } from "@react-navigation/native";
import { StackRoutes } from "../../Routes/StackTypes";

import { typeTheme } from "../../Config/enumTheme";
import { updatePassword } from "../../Service/Login"
import { getStoreItem } from "../../Lib/asyncStorage"

import {
    Container,
    ContentPage,
    TitlePagelight,
    BoldDarkBlue,
    SafeAreaViewContainer
} from "../../Components/elementsComponents"

import {
    TextOrientationPassword
} from "./style"
import ModalElement from "../../Components/Modal";
import { Icon } from "react-native-elements";
import { View } from "react-native";


export default function ResetPassword() {
    const navigation = useNavigation<StackRoutes>();
    const [securityLevelPassword, setSecurityLevelPassword] = useState<number>(0)
    const [userPassword, setuserPassword] = useState<string>('')
    const [userConfirmPassword, setUserConfirmPassword] = useState<string>("")
    const [userConfirmPasswordError, setUserConfirmPasswordError] = useState<boolean>(false)
    const [userPasswordError, setUserPasswordError] = useState<boolean>(false)



    const [isModalVisible, setModalVisible] = useState<boolean>(false);


    const [email, setEmail] = useState<string>('')

    useEffect(() => {
        const getAsyncStoregare = async () => {
            const result = await getStoreItem("@intellectus:emailResetPassword")
            if (result) {
                setEmail(result)
            }
        }
        getAsyncStoregare()
    }, [])

    useEffect(() => {
        function calculatePasswordStrength(password: string): number {
            const regexUppercase = /[A-Z]/;
            const regexLowercase = /[a-z]/;
            const regexNumber = /[0-9]/;
            const regexSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

            let strength = 0;

            if (password.length >= 6) {
                strength += regexUppercase.test(password) ? 1 : 0;
                strength += regexLowercase.test(password) ? 1 : 0;
                strength += regexNumber.test(password) ? 1 : 0;
                strength += regexSpecialChar.test(password) ? 1 : 0;
            }
            return strength;
        }
        setSecurityLevelPassword(calculatePasswordStrength(userPassword))
    }, [userPassword])

    async function resetPassword() {
        if (userPassword.length === 0 || securityLevelPassword < 4) {
            setUserPasswordError(true)
            return
        } else {
            setUserPasswordError(false)
        }

        if (userPassword && userPassword === userConfirmPassword) {
            setUserConfirmPasswordError(false)

            await updatePassword(email, userPassword).then(res => {
                setModalVisible(true)
                setTimeout(() => {
                    setModalVisible(false)
                    navigation.push("Login")
                }, 1000)
            }).catch(error => console.log(error))


        } else {
            setUserConfirmPasswordError(true)
            return
        }
    }

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
                <ModalElement
                    setvisibleBottonModal={setModalVisible}
                    isModalVisible={isModalVisible}
                    iconModal={<Icon
                        name='check-circle'
                        type='feather'
                        color={"#049908"}
                        size={50}
                    />}
                    textModal="Senha atualizada."
                    textAlign='center'
                />
                <ContentPage>
                    <TitlePagelight>Criar nova <BoldDarkBlue>senha</BoldDarkBlue></TitlePagelight>
                    <View style={{ marginTop: 20 }} />
                    <Input
                        label="Senha"
                        onSetText={setuserPassword}
                        type="password"
                        textError="Senha sem os fatores de segurança"
                        error={userPasswordError}
                        value={userPassword}
                    />
                    <TextOrientationPassword>
                        Use seis ou mais caracteres, letras maiúsculas e minúsculas, números e símbolos.
                    </TextOrientationPassword>

                    <MeasureSecurityPassword securityLevel={securityLevelPassword} />

                    <Input
                        label="Confirmar senha"
                        onSetText={setUserConfirmPassword}
                        type="password"
                        textError="As senhas são diferentes"
                        error={userConfirmPasswordError}
                        value={userConfirmPassword}
                    />
                </ContentPage>
            </Container>
            <Button pressFunction={() => resetPassword()} textButton="Salvar" typebutton={typeTheme.default} />
            <View style={{ marginTop: 30 }} />
        </SafeAreaViewContainer>
    )
}