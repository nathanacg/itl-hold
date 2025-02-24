import styled from "styled-components/native";
import { fontStyle, theme } from "../../Theme/theme";

export const Container = styled.Text`
    align-items: center;
    justify-content: center;
    text-align: center;
    font-family: ${fontStyle.regular};
    font-size: 16px;
    line-height: 15px;
    color: ${theme.primarycolor};
    background-color: ${theme.secondaryColor};
    padding: 7px 10px 3px;
    border-radius: 5px;

    position: absolute;
    top: ${(props: {top: string}) => props.top};
    left: ${(props: {left: string}) => props.left};
    transform: scale(${(props: {scale: number}) => props.scale});
`