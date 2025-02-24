import styled from "styled-components/native";

import { theme, fontStyle } from "../../../../Theme/theme"
import { typeTheme } from "../../../../Config/enumTheme";

interface typeButton {
    optionButton: string
}

export const ForwardMessageContainer = styled.View`
    flex-direction: row;
    gap:5px;
    align-items: center;
    margin-bottom: 10px;
`

export const ForwardMessageTitle = styled.Text`
    font-size: 10px;
    color:${theme.lightGray};
    font-weight: 600;
`

export const MessageContainer = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
`

export const Wrapper = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 3px;
    margin-bottom: 5px;
    margin-right: 5px;
`

export const TitleModal = styled.Text`
    font-size:14px;
    text-align:center;
    padding:0 0 10px;
    font-family: ${fontStyle.regular};
    color:${theme.textDark};
`

export const TextButton = styled.Text`
    text-align: center;
    font-size:14.5px;
    line-height: 23px;
    font-family: ${fontStyle.regular};
    color: ${(props: typeButton) => props.optionButton === typeTheme.default ? (theme.secondaryColor) : (theme.primarycolor)};
`

export const ButtonContent = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    padding: 3px;
    min-width: 43%;
    border-radius: 6px;
    border: 1.3px;
    border-color: ${theme.primarycolor};
    background-color : ${(props: typeButton) => props.optionButton === typeTheme.default ? (theme.primarycolor) : (theme.secondaryColor)};
`

export const TextModal = styled.Text`
    font-family: ${fontStyle.regular};
    color: ${theme.textDark};
    text-align: center;
    font-size: 14px;
`

export const ContentModalButtons = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin-top: 20px;
`

export const TitleDeleted = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 13px;
    color:${theme.lightGray};
`

export const Message = styled.View`
    justify-content: center;
    background-color: #F4F4F4;
    border-radius: 10px;
    padding: 15px 25px 5px 20px;
`

export const MessageText = styled.Text`
    font-family: ${fontStyle.regular};
    color: ${theme.textDark};
    font-size: 13px;
    margin-right: 10px;
`
export const MessageTextLong = styled.Text`
    font-family: ${fontStyle.regular};
    color: ${theme.textDark};
    font-size: 13px;
    line-height: 18px;
    margin-right: 60px;
`

export const MessageInfo = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 2px;
    position: absolute;
    bottom: 5px;
    right: 6px;
`

export const Time = styled.Text`
    font-family: ${fontStyle.regular};
    color: ${theme.textDark};
    font-size: 10px;
    margin-right: 12px;
`

export const ViewImage = styled.Image`
    width: 13px;
`