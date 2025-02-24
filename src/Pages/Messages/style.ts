import styled from 'styled-components/native'
import { theme, fontStyle } from "../../Theme/theme"

export const MessagesContainer = styled.View`
    width: 100%;
    height: 100%;
    background-color: ${theme.secondaryColor};
`

export const ButttonsContainer = styled.View`
    margin-top: 27px;
    flex-direction: row;
    justify-content: center;
    padding: 0px 24px;
    gap: 7px;
`

export const Button = styled.TouchableOpacity`
    width: 49%;
    justify-content: center;
    align-items: center;
    padding: 4px;
    border: 1px;
    border-color: ${theme.primarycolor};
    border-radius: 6px;
    background-color: ${(props: { background: string }) => props.background || theme.secondaryColor};;
`

export const ButtonText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 14px;
    line-height: 24px;
    color:  ${(props: { color: string }) => props.color || theme.primarycolor};
`

export const InputContainer = styled.View`
    padding: 0px 24px;
`


export const NotificationsInfo = styled.View`
    border-radius: 10px;
    height: 20px;
    width: 20px;
    font-size: 20px;
    text-align: center;
    justify-content: center;
    align-items: center;
    background-color: #F00D;
    position: absolute;
    top: 70%;
    right: -10px;
`

export const Notification = styled.Text`
    font-size: 14px;
    text-align: center;
    color: ${theme.secondaryColor};
`

export const IconNumber = styled.Text`
    text-align: center;
    font-family: ${fontStyle.regular};
    font-size: 12px;
    color: ${theme.secondaryColor};
`

