import styled from "styled-components/native";
import { fontStyle, theme } from "../../Theme/theme";

export const Container = styled.View`
    flex-direction: row;
    justify-content: space-between;
`

export const Label = styled.Text`
    width: 80px;
    font-family: ${fontStyle.regular};
    color: ${theme.textDark};
    font-size: 14px;
    margin-top: 0px;
`

export const Box = styled.View`
    border-bottom-color: "#c4c4c4";
    border-bottom-width: 0.5px;
    width: 70%;
    justify-content: space-between;
    padding-bottom: 2px;
`