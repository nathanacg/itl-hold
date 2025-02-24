import styled from "styled-components/native";

import { theme, fontStyle } from "../../Theme/theme"


export const InputLegend = styled.View`
    position: relative;
    width: 100%;

    border-radius: 10px;
    border: 1px;
    border-color: ${theme.lightGray};
    padding: 0 14px 20px;
    gap: 10px;
`

export const InputIconcontainer = styled.View`
    flex-direction: row;
    gap: 15px;
    position: absolute;
    bottom: 5px;
    right: 40px;
`

export const InputIcons = styled.Image`
    width: 20px;
`


export const InputCount = styled.Text`
    align-self: flex-end;
    font-family: ${fontStyle.medium};
    font-size: 12px;
    color: ${theme.textLight};
    margin-top: 9px;
    margin-right: 2px;
`

export const AudioBoxContainer = styled.View`
    flex-direction: row;
    align-self: center;
    align-items: center;
    gap: 5px;
    margin-top: 15px;
`