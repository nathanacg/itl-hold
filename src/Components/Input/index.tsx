import React, { SetStateAction, useState } from "react";
import { StyleSheet, TextInput, View, KeyboardTypeOptions, Text } from "react-native";
import { Icon } from 'react-native-elements'
import { Image } from "react-native"
import { TouchableOpacity } from "react-native"

import { theme, fontStyle } from "../../Theme/theme"
import DropDown from "../DropDown";


import {
    Container,
    ContainerInput,
    TextLabel,
    LabelContentSelect,
    TextLabelDropDown,
    TextError,
    ContainerIcons,
    TextErrorUsername
} from "./style"
import { EyeSvgComponent } from "../Icons/Eye";

interface inputProps {
    label: string
    labelComponent?: React.ReactNode
    type: string,
    onSetText: React.Dispatch<SetStateAction<string>>
    value: string
    placeholder?: string
    textError?: string
    error?: boolean
    checkSucess?: boolean
    checkError?: boolean
}


export default function Input(props: inputProps) {
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const getKeyboardType = (type: string): KeyboardTypeOptions => {
        switch (type) {
            case "phone":
                return "numeric"
            case "email":
                return "email-address"
            default:
                return "default"
        }
    }

    const getStyle = (type: string) => {
        return type === "phone" ? styles.inputPhone : styles.input;
    }

    const getSecureTextEntry = (type: string) => {
        return type === "password" ? !showPassword : false;
    }


    const textChange = (text: string) => {
        props.onSetText(text)
    }

    return (
        <Container>
            {props.label && (
                <TextLabel>{props.label}</TextLabel>
            )}
            {props.error && (
                props.type !== "username" ? (
                    <TextError>
                        {props.textError}
                    </TextError>
                ) : (
                    <TextErrorUsername>
                        {props.textError}
                    </TextErrorUsername>
                )
            )}

            {props.labelComponent && (
                props.labelComponent
            )}

            <ContainerInput error={props.error}>
                {props.type === "phone" && (
                    <DropDown
                        width="24%"
                        list={[
                            <LabelContentSelect>
                                <Image source={require("../../Assets/Icons/brasilLogo.png")} style={{ marginRight: 5 }} />
                                <TextLabelDropDown>+55</TextLabelDropDown>
                            </LabelContentSelect>
                        ]}

                    />
                )}

                <TextInput
                    keyboardType={getKeyboardType(props.type)}
                    style={getStyle(props.type)}
                    value={props.value}
                    maxLength={props.type === "phone" ? 11 : 999}
                    onChangeText={(text: string) => textChange(text)}
                    secureTextEntry={getSecureTextEntry(props.type)}
                    placeholder={props.placeholder}
                    placeholderTextColor="#231F20"
                    autoComplete={props.type == 'email' ? "email" : 'off'}
                    autoCorrect={false}
                    autoCapitalize="none"
                />

                <ContainerIcons>
                    {props.checkSucess ? (
                        <Icon
                            name={'checkmark-circle-sharp'}
                            type='ionicon'
                            color={theme.green}
                            size={20}
                        />
                    ) : props.checkError ?
                        (<Icon
                            name={'close-circle'}
                            type='ionicon'
                            color={theme.dangerColor}
                            size={20}
                        />) : (
                            <View style={{ width: 20 }} />

                        )}

                    {props.type === "password" && (
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            {!showPassword ? (
                                <EyeSvgComponent show width={19} height={20} fill="none" stroke1={theme.darkBlue} stroke2={theme.primarycolor} />
                            ) : (
                                <EyeSvgComponent width={19} height={20} fill="none" stroke1={theme.darkBlue} stroke2={theme.primarycolor} />
                            )}

                        </TouchableOpacity>
                    )}
                </ContainerIcons>
            </ContainerInput>

        </Container>
    )
}

const styles = StyleSheet.create({
    input: {
        padding: 10,
        width: "90%",
        position: "relative",
        color: theme.inputTextColor,
        fontSize: 14,
        fontFamily: fontStyle.regular
    },
    inputPhone: {
        padding: 2,
        width: "65%",
        position: "relative",
        color: theme.inputTextColor,
        fontSize: 14,
        fontFamily: fontStyle.regular
    },
});