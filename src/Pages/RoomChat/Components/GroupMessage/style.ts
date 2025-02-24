import styled from "styled-components/native";

import { theme, fontStyle } from "../../../../Theme/theme"

export const MessageContainer = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 8px 25px;
    gap: 6px;
    margin: 10px 0px;
`

export const UserImage = styled.Image`
    width: 35px;
    height: 35px;
    border-radius: 18px;
`

export const Message = styled.View`
    position: absolute;
    left: 66px;
    z-index: 2;
    width: 262px;
    background-color: #0245F41A;
    border-radius: 10px;
    padding: 9px 6px 4px 15px;
`

export const UserName = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 12px;
`

export const BoldName = styled.Text`
     font-family: ${fontStyle.semiBold};
    font-size: 12px;
`

export const MessageText = styled.Text`
    font-family: ${fontStyle.regular};
    color: ${theme.textDark};
    font-size: 14px;
    line-height: 26px;
    padding-bottom: 3px;
`

export const MessageInfo = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 2px;
    position: absolute;
    bottom: 6px;
    right: 6px;
`

export const Time = styled.Text`
    font-family: ${fontStyle.light};
    color: ${theme.textDark};
    font-size: 12px;
`

export const ViewImage = styled.Image`
    width: 13px;
`
