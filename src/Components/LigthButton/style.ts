import styled from "styled-components/native";

import { theme, fontStyle } from  '../../Theme/theme'


export const SmallButton = styled.TouchableOpacity`
    width: 27%;
    height: 26px;
    padding: 0 12px;
    justify-content: center;
    align-items: center;
    background-color: ${theme.secondaryColor};
    border: 1px;
    border-color: ${theme.primarycolor};
    border-radius: 6px;
`

export const LargeButton = styled.TouchableOpacity`
    width: 46%;
    padding: 0 12px;
    justify-content: center;
    align-items: center;
    background-color: ${theme.secondaryColor};
    border: 1px;
    border-color: ${theme.primarycolor};
    border-radius: 6px;
`


export const SmallText = styled.Text`
    font-family: ${fontStyle.regular};
    color: ${theme.primarycolor};
    font-size: 12px;
`
export const LargeText = styled.Text`
     font-family: ${fontStyle.regular};
    color: ${theme.primarycolor};
    font-size: 16px;
`