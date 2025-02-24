import styled from "styled-components/native";

import { theme, fontStyle } from "../../Theme/theme"

export const ActivitiesContainer = styled.View`
    background-color: ${theme.secondaryColor};
`

export const ActivitiesTime = styled.Text`
    font-family: ${fontStyle.medium};
    font-size: 14px;
    margin-top: 10px;
    margin-bottom: 4px;
    color: ${theme.textDark};
`

export const ActivitiescontainerList = styled.View`
    justify-content: flex-start;
    padding: 23px 20px;
    background-color: ${theme.secondaryColor};
    height: 100%;
    width: 100%;
`