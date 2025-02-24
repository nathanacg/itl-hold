import styled from "styled-components/native";
import { fontStyle, theme } from "../../Theme/theme";

export const CardButtonContainer = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 10px;
`
export const CardButton = styled.TouchableOpacity`
    border-radius: 6px;
    background-color: ${theme.primarycolor};
    padding: 3px 15px;
    border-width: 1px;
    border-color: ${theme.secondaryColor};
`

export const ButtonText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 13px;
    color: ${theme.secondaryColor};
`