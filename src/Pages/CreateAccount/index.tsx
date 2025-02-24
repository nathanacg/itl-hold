import React, { useState, useEffect } from "react";
import SelectDropdown from 'react-native-select-dropdown'
import { TouchableOpacity, StyleSheet, Text, View, Alert } from "react-native"
import { Icon } from 'react-native-elements';
import { useNavigation } from "@react-navigation/native";
import { StackRoutes } from "../../Routes/StackTypes";

import Header from "../../Components/Header";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import MeasureSecurityPassword from "../../Components/MeasureSecurityPassword";

import { theme, fontStyle } from "../../Theme/theme"
import { typeTheme } from "../../Config/enumTheme";
import { clearStorage, setStoreItem, setStoreObject } from "../../Lib/asyncStorage";
import { validateEmail } from "../../Utils/validateEmailString";

import {
    SafeAreaViewContainer,
    Container,
    ContentPage,
    CircleSelectButton,
    TitlePagelight,
    BoldDarkBlue,
    CircleSelectButtonCancel,
    ContentPage2
} from "../../Components/elementsComponents";

import {
    TextOrientationPassword,
    FlexContent,
    TextTermsOfUse,
    UnderlineText,
    FlexContentDateBirthday,
    BirthDateText,
    TextBirthdayDateError,
    TextTerms
} from "./style"
import { validatePhone } from "../../Utils/validatePhone";
import { calculatePasswordStrength } from "../../Utils/CalculatePasswordStrength";
import { days, months, monthsName, yearsArray } from "../../Utils/Date";
import { registerUser } from "../../Service/UserRegister";
import userToken from "../../GlobalState/userToken.zustand";
import { Text12 } from "../Comentary/style";
import { TextRegular12, TextRegular12Error } from "../../Components/configurationsElemetsStyle";


export default function CreateAccount() {
    const navigation = useNavigation<StackRoutes>();
    const [acceptedTermsAndServices, setAcceptedTermsAndServices] = useState<boolean>(false)
    const [securityLevelPassword, setSecurityLevelPassword] = useState<number>(0)

    const [emailError, setEmailError] = useState<boolean>(false)
    const [phoneError, setPhoneError] = useState<boolean>(false)
    const [userNameError, setUserNameError] = useState<boolean>(false)
    const [dayBirthdayError, setdayBirthdayError] = useState<boolean>(false)
    const [monthBirthdayError, setmonthBirthdayError] = useState<boolean>(false)
    const [yearBirthdayError, setyearBirthdayError] = useState<boolean>(false)
    const [userPasswordError, setUserPasswordError] = useState<boolean>(false)
    const [userConfirmPasswordError, setUserConfirmPasswordError] = useState<boolean>(false)
    const [confirmTerms, setConfirmTerms] = useState<boolean>(false)

    const [userName, setUserName] = useState<string>("")
    const [userEmail, setUserEmail] = useState<string>("")
    const [userPhoneExists, setUserPhoneExists] = useState<boolean>(false)
    const [userEmailExists, setUserEmailExists] = useState<boolean>(false)
    const [userPhone, setUserPhone] = useState<string>("")
    const [userPassword, setUserPassword] = useState<string>("")
    const [userConfirmPassword, setUserConfirmPassword] = useState<string>("")

    const [dayBirthday, setdayBirthday] = useState<string>('')
    const [monthBirthday, setmonthBirthday] = useState<string>('')
    const [yearBirthday, setyearBirthday] = useState<string>('')

    const [messageTerms, setMessageTerms] = useState<boolean>(false)

    const { setToken } = userToken()


    useEffect(() => {
        if (userName)
            setUserNameError(false)
    }, [userName])



    useEffect(() => {
        if (validateEmail(userEmail)) {
            setEmailError(false)
        }
    }, [userEmail])

    useEffect(() => {
        if (dayBirthday) {
            setdayBirthdayError(false)
        }
    }, [dayBirthday])

    useEffect(() => {
        if (monthBirthday) {
            setmonthBirthdayError(false)
        }
    }, [monthBirthday])

    useEffect(() => {
        if (yearBirthday) {
            setyearBirthdayError(false)
        }
    }, [yearBirthday])

    useEffect(() => {
        setSecurityLevelPassword(calculatePasswordStrength(userPassword))
        if (securityLevelPassword === 4 && userPassword) {
            setUserPasswordError(false)
        }
    }, [userPassword, securityLevelPassword])

    const dropDownIcon = () => {
        return <Icon type='feather' name={'chevron-down'} color={"#C4C4C4"} />
    }


    let numericMonth = ''

    async function sendData() {

        if (userName === "" || !/\S/.test(userName) || userName.split(/\s+/).length < 2 || /^\S+\s+$/.test(userName) || userName.split(' ')[1].length < 3) {
            setUserNameError(true)
        }

        if (validateEmail(userEmail) === false) {
            setEmailError(true)
        }

        if (validatePhone(userPhone) === false) {
            setPhoneError(true)
        }

        if (dayBirthday === "") {
            setdayBirthdayError(true)
        }

        if (monthBirthday === "") {
            setmonthBirthdayError(true)
        }

        if (yearBirthday === "") {
            setyearBirthdayError(true)
        }

        if (securityLevelPassword < 4 || userPassword === "") {
            setUserPasswordError(true)
        }

        if (userConfirmPassword === "" || userConfirmPassword !== userPassword) {
            setUserConfirmPasswordError(true)
        }

        if (acceptedTermsAndServices === false) {
            setConfirmTerms(true)
            setMessageTerms(true)
        }

        const monthMap: { [key: string]: string } = {
            'Jan': '01',
            'Fev': '02',
            'Mar': '03',
            'Abr': '04',
            'Mai': '05',
            'Jun': '06',
            'Jul': '07',
            'Ago': '08',
            'Set': '09',
            'Out': '10',
            'Nov': '11',
            'Dez': '12',
        }

        if (monthBirthday in monthMap) {
            numericMonth = monthMap[monthBirthday]
        }
        if (userName &&
            validateEmail(userEmail) &&
            validatePhone(userPhone) &&
            dayBirthday && monthBirthday &&
            yearBirthday &&
            securityLevelPassword === 4 &&
            userConfirmPassword === userPassword &&
            acceptedTermsAndServices) {
            const userData = {
                userName,
                userEmail,
                userBirthday: `${dayBirthday}/${numericMonth}/${yearBirthday}`,
                userPassword,
                userPhone: `+55 ${userPhone}`
            }

            await setStoreObject("@intellectus:User", userData)

            try {
                await registerUser(userData).then(async (res) => {
                    setToken(res.data.token)
                    navigation.navigate('EmailValidateCode')
                }).catch((error) => {
                    console.log(error)
                    if (error.response.data.error === "ERROR_EXISTING_EMAIL") {
                        setUserEmailExists(true)
                        setEmailError(true)
                    } else if (error.response.data.error === "ERROR_EXISTING_PHONE") {
                        setUserPhoneExists(true)
                        setPhoneError(true)
                    }
                })
            } catch (error) {
                console.log('deu ruim ao completar a conta', error)
            }
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

                <ContentPage2>
                    <View style={{ marginTop: 10 }} />
                    <TitlePagelight><BoldDarkBlue>Criar</BoldDarkBlue> uma conta</TitlePagelight>
                    <View style={{ marginTop: 15 }} />
                    <Input
                        label="Nome completo"
                        onSetText={setUserName}
                        type="email"
                        error={userNameError}
                        textError="Nome inválido"
                        value={userName}
                    />
                    <Input
                        label="E-mail"
                        onSetText={setUserEmail}
                        type="email"
                        error={emailError}
                        textError={userEmailExists ? "E-mail já cadastrado" : "E-mail inválido"}
                        value={userEmail.toLowerCase()}
                    />
                    <Input
                        label="Telefone"
                        onSetText={setUserPhone}
                        type="phone"
                        error={phoneError}
                        textError={userPhoneExists ? "Telefone já cadastrado" : "Telefone inválido"}
                        value={userPhone}
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <BirthDateText>Data de nascimento</BirthDateText>
                        {dayBirthdayError || monthBirthdayError || yearBirthdayError ? (
                            <TextBirthdayDateError>
                                Data de nascimento inválida
                            </TextBirthdayDateError>
                        ) : (<></>)}
                    </View>
                    <FlexContentDateBirthday>

                        <SelectDropdown
                            renderDropdownIcon={() => dropDownIcon()}
                            dropdownStyle={{ width: "27%", marginLeft: 1 }}
                            buttonTextStyle={styles.selectDropDownButtonTextStyle}
                            buttonStyle={styles.selctDropDownButtonStyle}
                            rowTextStyle={styles.rowTextStyle}
                            data={days}
                            defaultButtonText="Dia"
                            onSelect={(selectedItem) => { setdayBirthday(selectedItem) }}
                        />
                        <SelectDropdown
                            renderDropdownIcon={() => dropDownIcon()}
                            dropdownStyle={{ width: "27%", marginLeft: 1 }}
                            buttonTextStyle={styles.selectDropDownButtonTextStyle}
                            buttonStyle={styles.selctDropDownButtonStyle}
                            rowTextStyle={styles.rowTextStyle}
                            data={monthsName}
                            defaultButtonText="Mês"
                            onSelect={(selectedItem) => { setmonthBirthday(selectedItem) }}
                        />
                        <SelectDropdown
                            renderDropdownIcon={() => dropDownIcon()}
                            dropdownStyle={{ width: "27%", marginLeft: 1, backgroundColor: "#FFF" }}
                            buttonTextStyle={styles.selectDropDownButtonTextStyle}
                            buttonStyle={styles.selctDropDownButtonStyle}
                            rowTextStyle={styles.rowTextStyle}
                            data={yearsArray()}
                            defaultButtonText="Ano"
                            onSelect={(selectedItem) => { setyearBirthday(selectedItem) }}
                        />

                    </FlexContentDateBirthday>


                    <Input
                        label="Senha"
                        onSetText={setUserPassword}
                        type="password"
                        textError="Senha sem os fatores de segurança"
                        error={userPasswordError}
                        value={userPassword}
                        checkSucess={userPassword.length > 5 && !userPasswordError && securityLevelPassword == 3}
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
                        checkError={userConfirmPassword.length > 0 && userConfirmPassword !== userPassword}
                        checkSucess={userPassword.length > 5 && userPassword === userConfirmPassword}
                    />

                    <FlexContent>
                        <TouchableOpacity onPress={() => setAcceptedTermsAndServices(!acceptedTermsAndServices)}>
                            {acceptedTermsAndServices ? (
                                <Icon
                                    name={'checkmark-circle-sharp'}
                                    type='ionicon'
                                    color={theme.primarycolor}
                                    size={14.2}
                                />
                            ) : (
                                <>
                                    {confirmTerms == true ? (
                                        <CircleSelectButtonCancel />
                                    ) : (
                                        <CircleSelectButton />
                                    )}
                                </>
                            )}

                        </TouchableOpacity>
                        <TextTermsOfUse >
                            <View style={{ flexDirection: 'row', alignItems: 'baseline', maxWidth: 320, height: 25, flexWrap: 'wrap' }}>
                                <TextTerms>Li e concordo com os </TextTerms>
                                <UnderlineText onPress={() => navigation.navigate('TermsOfUse')}>termos de uso</UnderlineText>
                                <TextTerms>  e </TextTerms>
                                <UnderlineText onPress={() => navigation.navigate('PrivacyPolicy')} >política de privacidade.</UnderlineText>
                            </View>
                        </TextTermsOfUse>

                    </FlexContent>
                    {messageTerms && <TextRegular12Error>Para prosseguir, clique para aceitar os termos{'\n'} de uso e política de privacidade.</TextRegular12Error>}
                </ContentPage2>
                <Button
                    pressFunction={() => sendData()}
                    textButton="Avançar"
                    typebutton={typeTheme.default}
                />
            </Container>
        </SafeAreaViewContainer>
    )
}

const styles = StyleSheet.create({
    selctDropDownButtonStyle: {
        width: "31.2%",
        height: 47,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#C4C4C4",
        backgroundColor: "#ffff"
    },
    selctDropDownButtonStyleError: {
        width: "31.2%",
        height: 47,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#F40202",
        backgroundColor: "#ffff"
    },
    selectDropDownButtonTextStyle: {
        color: theme.inputTextColor,
        fontSize: 14,
        fontFamily: fontStyle.regular
    },
    rowTextStyle: {
        color: theme.inputTextColor,
        fontSize: 14
    }
});