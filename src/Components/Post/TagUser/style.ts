import styled from "styled-components/native";
import { fontStyle, theme } from "../../../Theme/theme";

export const Container = styled.Text`
    align-items: center;
    justify-content: center;
    text-align: center;
    font-family: ${fontStyle.semiBold};
    font-size: 8px;
    line-height: 15px;
    color: ${theme.textDark};
    background-color:  #fff6;
    padding: 2px 6px 2px;
    border-radius: 5px;

    position: absolute;
    top: 0;
    left: 0;
`

