import styled from "styled-components/native";

import { theme, fontStyle } from "../../../../Theme/theme"


export const OptionContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    gap: 11px;
    margin: 10px 0;
`

export const OptionText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 14px;
    color: ${theme.textDark};
`
