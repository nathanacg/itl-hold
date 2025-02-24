import styled from "styled-components/native"
import { fontStyle, theme } from "../../Theme/theme"


export const ContainerInput = styled.View`
   flex-direction: row;
   align-items: flex-start;
   justify-content: flex-start;
`

export const LabelContainer = styled.View`
    align-items: flex-start;
`

export const LabelText = styled.Text`
    justify-content: center;
    font-family: ${fontStyle.regular};
    font-size: 14px;
    color: ${theme.textDark};
    width: 100px;
    text-align: left;
`

export const RowDirection = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 5px;
`

export const OptionContainer = styled.View`
    flex-direction: row;
    align-items: flex-end;
    gap: 16px;
`
