import styled from "styled-components/native";

import { theme, fontStyle } from "../../Theme/theme"

export const TextOrientationPassword = styled.Text`
    margin-top: 2px;
    font-size: 13px;
    color: ${theme.textDark};
    font-family: ${fontStyle.regular};
`

export const FlexContent = styled.View`
    display: flex;
    flex-direction:row;
    align-items:center;
    gap:4px;
    margin:10px 0;
`

export const FlexContentDateBirthday = styled.View`
    width: 100%;
    display: flex;
    flex-direction:row;
    align-items:center;
    margin-bottom:5px;
    gap:10px;
`

export const TextTermsOfUse = styled.View`
    text-align:left;
    color: ${theme.textDark};
    font-size: 13px;
    word-break: break-all;
    width: 320px;
    font-family: ${fontStyle.regular};
`

export const UnderlineText = styled.Text`
    text-decoration:underline;
    font-size: 13px;
    margin-top: 4px;
    font-family: ${fontStyle.regular};
    color: ${theme.textDark};
`

export const TextTerms = styled.Text`
    color: ${theme.textDark}
`

export const BirthDateText = styled.Text`
    color: ${theme.textDark};
    font-family: ${fontStyle.semiBold};
    font-size:14px;
    margin:7px 0;
`
export const TextBirthdayDateError = styled.Text`
    color: ${theme.dangerColor};
    font-size:12px;
    text-align:right;
   
`