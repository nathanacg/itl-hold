import styled from "styled-components/native";

import { theme, fontStyle } from "../../Theme/theme"

export const PopOutContainer = styled.View`
    position: relative;
    width: 365px;
    height: 43px;
    background-color:#5E5E5EB2;
    border-radius: 6px;
    padding: 11px 14px;
    flex-direction: row;
    justify-content: center;

`

export const PopoutText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 14px;
    color: ${theme.secondaryColor};
`

