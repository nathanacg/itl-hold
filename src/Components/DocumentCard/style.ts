import styled from "styled-components/native";
import { fontStyle, theme } from "../../Theme/theme";

export const Container = styled.View`
    position: ${(props: { position: string }) => props.position};;
    top: ${(props: { top: string }) => props.top};
    left: ${(props: { left: string }) => props.left};
    flex-direction: row;
    z-index: -1;
`

export const CardContainer = styled.View`
    width: ${(props: { size: string }) => props.size ? props.size : "100%"};
    padding: 6px 12px 6px 8px;
    height: 55px;
    flex-direction: row;
    align-items: center;
    background-color: ${theme.secondaryColor};
    border-radius: 8px;
    gap: 8px;
    border-width: 1px;
    border-color: ${theme.secondaryColor};
`
export const Title = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 11px;
    color: ${theme.textDark};
`

export const InfoText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 10px;
    color: ${theme.textDark};
`

export const Dot = styled.View`

`

export const TextContainer = styled.View`
    width: 90%;
    padding-top: 5px;
`