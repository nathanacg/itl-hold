import styled from "styled-components/native";
import { fontStyle, theme } from "../../Theme/theme";

export const LineContainer = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
`

export const OptionContent = styled.TouchableOpacity`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    margin: 2px 0;
`

export const AlertModalTitle = styled.Text`
    text-align: center;
    font-family: ${fontStyle.semiBold};
    font-size: 16px;
    color: ${theme.textDark};
`

export const AlertModalText = styled.Text`
    text-align: center;
    font-family: ${fontStyle.regular};
    font-size: 14px;
    color: #000;
`