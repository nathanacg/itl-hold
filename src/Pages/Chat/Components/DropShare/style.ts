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
    align-self: ${(props) => props.isMy ? "flex-end" : "flex-start"};
    overflow: hidden;
    position: relative;
`

export const Title = styled.Text`
    font-size: 12px;
    padding: 5px;
    font-family: ${fontStyle.regular};
    color: ${theme.textligthGray};
`

export const PostInfo = styled.View`
    width: 100%;
    padding: 14px 12px 9px 11px;
    position: absolute;
    z-index: 999;
    top: 0px;
`

export const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 5px;
`

export const UserImage = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 40px;
`

export const UserName = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 16px;
    color: #fff;
    width: 120px;
`

export const PostLegend = styled.Text`
    font-size: 11px;
    font-family: ${fontStyle.regular};
    color: ${theme.textDark};
`

export const PostImage = styled.Image`
    width: 192px;
    height: 283px;
`