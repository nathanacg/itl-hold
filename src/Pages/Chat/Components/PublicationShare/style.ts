import styled from "styled-components/native";

import { theme, fontStyle } from "../../../../Theme/theme"

export const ShareMessageContainer = styled.TouchableOpacity`
    width: 193px;
    border-radius: 6px;
    border: 1px;
    border-color: ${theme.lightGray};
    margin-left: 24px;
    justify-content: center;
    align-items: center;
    align-self: ${(props: { isMy: boolean; }) => props.isMy ? "flex-end" : "flex-start"};
    overflow: hidden;
`

export const PostInfo = styled.View`
    width: 100%;
    padding: 6px 12px 9px 11px;
`

export const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 7px;
    margin-bottom: 5px;
`

export const UserImage = styled.Image`
    width: 20px;
    height: 20px;
    border-radius:20px;
`

export const UserName = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 11px;
    color: ${theme.textDark};
`

export const PostLegend = styled.Text`
    font-size: 12px;
    font-family: ${fontStyle.regular};
    color: ${theme.textDark};
`

export const PostImage = styled.Image`
    width: 192px;
    height: 203px;
`

export const Title = styled.Text`
    font-size: 11px;
    font-family: ${fontStyle.regular};
    color: ${theme.textDark};
`