import styled from "styled-components/native";

import { theme, fontStyle } from "../../Theme/theme"
import { typeTheme } from "../../Config/enumTheme"
import { Platform } from "react-native";

interface buttonOptionProps {
    themeButton: string
}

export const ContainerButtons = styled.KeyboardAvoidingView`
    flex-direction:row;
    align-items:center;
    justify-content:center;
    padding: 10px;
    margin:50px 0;
`

export const ButtonOption = styled.TouchableOpacity`
    width:100px;
    background-color:${(props: buttonOptionProps) => props.themeButton === typeTheme.default ? (theme.primarycolor) : (theme.secondaryColor)};
    border:2px;
    border-color:${(props: buttonOptionProps) => props.themeButton === typeTheme.default ? (theme.primarycolor) : (theme.primarycolor)};
    border-radius:4px;
    padding: 2px 10px;
    justify-content: center; 
    margin:5px;
`

export const TextButton = styled.Text`
    color:${(props: buttonOptionProps) => props.themeButton === typeTheme.default ? (theme.secondaryColor) : (theme.primarycolor)};
    font-size:14px;
    font-family: ${fontStyle.regular};
    text-align:center;
`

export const TextButton2 = styled.Text`
    color:${(props: buttonOptionProps) => props.themeButton === typeTheme.default ? (theme.secondaryColor) : (theme.primarycolor)};
    font-size:14px;
    font-family: ${fontStyle.regular};
    text-align:center;
`

export const LoginOptionsContainer = styled.View`
    width: 100%;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;;
    gap:10px;
    margin-bottom:135px;
`

export const ContentLeft = styled.TouchableOpacity`
    flex-direction:row;
    align-items:center;
    gap:10px;
`

export const TextConected = styled.Text`
    color:${theme.textDark};
    font-size:13px;
    margin-bottom: ${Platform.OS == 'android' ? '-2px' : '0px'};
    font-family: ${fontStyle.regular};
`

export const TextForwardPassword = styled.Text`
    text-decoration:underline;
    color:${theme.textDark};
    font-family: ${fontStyle.regular};
    font-size: 12px;
    padding: 5px;
`
export const ButtonMini = styled.TouchableOpacity`
    padding: 5px;
    width: 60px;
    height: 60px;
    border-width: 1px;
    align-self: center;
    justify-content: center;
    background-color: #fff;
    flex-direction: row;
    align-items: center;
    margin: 5px;
    border-radius: 60px;
`

export const GoogleButton = styled.TouchableOpacity`
    padding: 12px 25px;
    width: 90%;
    align-self: center;
    justify-content: center;
    background-color: #fff;
    flex-direction: row;
    align-items: center;
    gap: 15px;
    margin: 0 18px;
    border-radius: 10px;
    box-shadow:  0px 2px 5px #000;
`

export const GoogleText = styled.Text`
    font-family: ${fontStyle.medium};
    color: ${theme.textLight};
    font-size: 18px;
`