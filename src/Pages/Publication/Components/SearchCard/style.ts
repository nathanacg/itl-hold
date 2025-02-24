import styled from "styled-components/native";

import { theme, fontStyle } from "../../../../Theme/theme"

export const SeachCardContainer = styled.TouchableOpacity`
    width: 100%;
    height: 124px;
    flex-direction: row;
    align-items: center;
    padding: 13px 23px;
    background-color: #EEEEEE;
    gap: 16px;
`

export const CardImage = styled.Image`
    width: 86px;
    height:86px;
    border-radius: 6px;
`

export const CardTitle = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 14px;
    width: 215px;
    color: ${theme.textLight};
`

export const CardText = styled.Text`
    width: 215px;
    font-family: ${fontStyle.regular};
    font-size: 11px;
    color: #5D5D5D;
`

