import styled from "styled-components/native";

import { theme, fontStyle } from "../../../../Theme/theme"

export const OneUserActionContainer = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0px;
    margin-top: -8px;
`
export const LetfContainer = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 8px;
`

export const NotificationContent = styled.View`
    width: 100%;
    flex-direction: row;
`

export const UserAddresss = styled.Text`
    font-family: ${fontStyle.medium};
    font-size: 13px;
    color: ${theme.textDark};
`

export const NotificationText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 13px;
    color: ${theme.textDark};
`

export const NotificationTime = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 13px;
    color: ${theme.textligthGray} ;
`

export const PostImage = styled.Image`
    width: 44px;
    height: 44px;
`

export const ContainerAdjust = styled.View`
    width:70%;
`