import styled from "styled-components/native";

import { theme, fontStyle } from "../../../../Theme/theme"

export const MarkedUsersContainer = styled.View`
    flex-direction: row;
    align-items: center;
    border-radius: 11px;
    flex-direction: row;
    background-color: ${theme.secondaryColor};
    padding: 0 10px;
`

export const MarkedUsersContainerOther = styled.View`
    flex-direction: row;
    align-items: center;
    border-radius: 11px;
    flex-direction: row;
    background-color: #0003;
    padding: 0 10px;
`