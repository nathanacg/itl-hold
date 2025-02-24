import styled from "styled-components/native";

import { theme, fontStyle } from "../../../../Theme/theme"

export const CardContainer = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 18px 34px;

`

export const LeftContainer = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 20px;
`

export const Title = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 16px;
    color: ${theme.textDark};
`

export const TextSimple=styled.Text`
    font-size:14px;
    color: ${theme.textDark};
    font-family: ${fontStyle.regular};
`

export const SmallText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 10px;
    color: ${theme.textDark};
`