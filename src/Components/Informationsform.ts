import styled from "styled-components/native";

import { theme, fontStyle } from "../Theme/theme"


export const ProfilePhotoContainer = styled.View`
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
  
    padding-bottom: 5px;
`

export const ActionsEditProfilePhotoContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    /* gap: 10px; */
`

export const ImageProfile = styled.Image`
    width: 132px;
    height: 132px;
    border-radius: 132px;
`


export const ContentPage = styled.View`
    padding: 15px 25px 0px;
    gap: 10px;
`

export const InputStyle = styled.TextInput`
    flex: 1;
    padding-right: 10px;
    padding-left: 10px;
    padding-bottom: 2px;
    color: ${theme.inputTextColor};
    font-size: 14px;
    font-family: ${fontStyle.regular};
    border-color: '#ababab';
    border-width: 0.3px;
    border-left-width: 0px;
    border-top-width: 0px;
    border-right-width: 0px;
    padding-top: 12px;
    padding-bottom: 12px;
`


export const RowDirection = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
`

export const Separator = styled.View`
    width: 90%;
    height: 0.5px;
    background-color: ${theme.lightGray};
    align-self: center;
`

export const GrayText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 12px;

    color: ${theme.textligthGray};
`
export const GrayTextCenter = styled.Text`
    font-family: ${fontStyle.regular};
    text-align: center;
    font-size: 12px;
    margin-bottom: ${(props: { marginBottom: number; }) => props.marginBottom ? props.marginBottom : 0}px;
    color: ${theme.lightGray};
`

export const LimitText = styled.Text`
    font-family: ${fontStyle.regular};
    color: ${theme.lightGray};
    font-size: 12px;
    position: absolute;
    bottom: 0px;
    right: 0px;
    `

export const ContentCentered = styled.View`
    padding-left: 25px;
    padding-right: 25px;
`