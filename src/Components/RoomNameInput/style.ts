import styled from "styled-components/native";
import { fontStyle, theme } from "../../Theme/theme";

export const Container = styled.View`
    flex-direction: row;
    justify-content: space-between;
`

export const Label = styled.Text`
    width: 30%;
    font-family: ${fontStyle.regular};
    color: ${theme.textDark};
    font-size: 13px;
    margin-top: 5px;
`

export const Box = styled.View`
    border-bottom-color: "#aaa";
    border-bottom-width: 0.2px;
    width: 70%;
    
    justify-content: space-between;
    padding-bottom: 12px;
`