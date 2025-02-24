import styled from "styled-components/native";

import {theme, fontStyle} from '../../Theme/theme'


export const SmallButton = styled.TouchableOpacity`
    height: 26px;
    width: 27%;
    padding: 3px 12px;
    justify-content: center;
    align-items: center;
    background-color: ${theme.primarycolor};
    border-radius: 6px;
`  

export const SmallText = styled.Text`
    font-family: ${fontStyle.regular};
    color: ${theme.secondaryColor};
    font-size: 12px;
    margin-top: 0.5px;
`

export const LargeButton = styled.TouchableOpacity`
    width: 46%;
    padding: 5px 7px;
    justify-content: center;
    align-items: center;
    background-color: ${theme.primarycolor};
    border-radius: 6px;
` 

export const LargeText = styled.Text`
    font-family: ${fontStyle.regular};
    color: ${theme.secondaryColor};
    font-size: 16px;
    vertical-align: middle;
`
 