import styled from "styled-components/native";

import { theme, fontStyle } from "../../../../Theme/theme"


export const LegendButtonsContainer = styled.View`
    justify-content: center;
    align-items: center;
    margin: 40px 0;
`

export const ButtonContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    margin-bottom: 10px;
`

export const LegendButtons = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 0 12px;
    gap: 8px;
    width: 245px;
    border: 1px;
    border-radius: 50px;
    border-color: #d0d0d0;
`

export const LegendButtonLetter = styled.Text`
    text-align: center;
    font-family: ${fontStyle.Bold};
    width: 22px;
    height: 22px;
    border: 1.25px;
    border-radius: 12px;
    border-color: #000;
`

export const AddButton = styled.TouchableOpacity`
    width: 80%;
    /* height: 40px; */
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 4px 12px;
    background-color: ${theme.primarycolor};
    border-radius: 6px;
    gap: 6px;
`

export const AddButtonText = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 15.5px;
    color: ${theme.secondaryColor};
    margin-top: 2px;
`
