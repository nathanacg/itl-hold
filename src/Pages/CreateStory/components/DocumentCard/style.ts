import styled from "styled-components/native";
import { fontStyle, theme } from "../../../../Theme/theme";

export const Container = styled.View`
    flex-direction: row;
`

export const CardContainer = styled.View`
    padding: 6px 12px 6px 8px;
    flex-direction: row;
    align-items: center;
    background-color: ${theme.secondaryColor};
    border-radius: 8px;
    gap: 8px;
`
export const Title = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 12px;
    color: ${theme.textDark};
`

export const InfoText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 12px;
    color: ${theme.textDark};
`

export const Dot = styled.View`

` 