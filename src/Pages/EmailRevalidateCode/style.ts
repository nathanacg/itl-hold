import styled from "styled-components/native";

import { theme, fontStyle } from "../../Theme/theme"

interface textUnderlineProps {
    active?: boolean
}

export const TextInformation = styled.Text`
    text-align:left;
    color: ${theme.textDark};
    font-size: 14px;
    font-family: ${fontStyle.regular};
`

export const ContainerText = styled.View`
    margin: 40px 0;
`

export const AlignInfoText = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 10px 14% 0;
`

export const TextCenter = styled.Text`
    display: flex;
    flex-direction: row;
    text-align:center;
    align-items:center;
    color: ${theme.textDark};
    font-size: 15px;
    font-family: ${fontStyle.regular};
`
export const UnderlineText = styled.Text`
    text-decoration:underline;
    text-decoration-color: ${(props: textUnderlineProps) => props.active ? (theme.textDark) : (theme.lightGray)};
    color: ${(props: textUnderlineProps) => props.active ? (theme.textDark) : (theme.lightGray)};
    font-size: 15px;
    font-family: ${fontStyle.regular};
    margin: 10px 0 7px;
    text-align:center;
`

export const CodeInputContent = styled.View`
    width: 100%;
    flex-direction:row;
    align-items:center;
    justify-content:center;
    gap: 10px;
    margin-bottom:12px;
`

export const InputBox = styled.View`
    width:52px;
    border: 1px;
    border-color:#C4C4C4;
    border-radius:8px;
`

export const CodeInput = styled.TextInput`
    width:100%;    
    padding: 10px 15px;
    font-size:30px;
    text-align:center;
    font-family: ${fontStyle.Bold};
    color: ${theme.textDark};
`
export const TextErrorCode = styled.Text`
    color:${theme.dangerColor};
    font-size:14px;
    text-align:right;
    margin-right:17%;
    margin-bottom:10px;
`

export const TextBold = styled.Text`
    color:${theme.textDark};
    font-size:16px;
    font-family: ${fontStyle.Bold};
`

export const FlexContent = styled.View`
    display: flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
`