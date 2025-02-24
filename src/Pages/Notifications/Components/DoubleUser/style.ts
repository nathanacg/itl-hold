import styled from "styled-components/native";

import { theme, fontStyle } from "../../../../Theme/theme"

export const DoubleUserContainer = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    gap: 8px;
`
export const LetfContainer = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 8px;
`

export const UserdoubleImage = styled.Image`
    width: 32px;
    height: 32px;
    border-radius: 16px;
    border: 1px;
    border-color: ${theme.secondaryColor};
`

export const SecondUserImage = styled.Image`
    width: 32px;
    height: 32px;
    border-radius: 16px;
    border: 1px;
    border-color: ${theme.secondaryColor};
    margin-top: -20px;
    margin-left: 10px;
`

export const NotificationContent = styled.View`
    width: 70%;
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