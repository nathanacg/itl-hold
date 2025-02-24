import styled from "styled-components/native"
import { fontStyle, theme } from "../../Theme/theme"

export const Button = styled.View`
    padding: 3px 8px;
    border-radius: 6px;
    background-color: ${theme.primarycolor};
`

export const ButtonText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 14px;
    color: ${theme.secondaryColor};
`

export const AllContainer = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 18px 30px 18px 25px;
    gap: 10px;
    border-bottom-width: 0.5px;
    border-bottom-color: ${theme.lightGray};
`

export const AllText=styled.Text`
    font-size:14px;
    color: ${theme.textDark};
    font-family: ${fontStyle.regular};
`