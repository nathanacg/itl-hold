import styled from "styled-components/native";

import { theme, fontStyle } from "../../../../../../Theme/theme"

export const ShareMessageContainer = styled.TouchableOpacity`
    width: 193px;
    border-radius: 6px;
    border: 1px;
    border-color: ${theme.lightGray};
    margin-left: 24px;
    margin-right: 24px;
    margin-bottom: 10px;
    margin-top: 10px;
    justify-content: center;
    align-items: center;
    align-self: ${(props) => props.isMy ? "flex-end" : "flex-start"};
    overflow: hidden;
`

export const PostInfo = styled.View`
    width: 100%;
    padding: 14px 12px 9px 11px;
`

export const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 5px;
`

export const UserImage = styled.Image`
    width: 30px;
    height: 30px;
    border-radius: 15px;
`

export const UserName = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 12px;
    color: ${theme.textDark};
`

export const PostLegend = styled.Text`
    font-size: 11px;
    font-family: ${fontStyle.regular};
    color: ${theme.textDark};
`

export const PostImage = styled.Image`
    width: 192px;
    height: 203px;
`