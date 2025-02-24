import styled from "styled-components/native";

import { theme, fontStyle } from "../../../../Theme/theme"

export const MoreOptionsInput = styled.TouchableOpacity`
     flex-direction: row;
     justify-content: space-between;
     width: 240;
     border-bottom-width: 0.3px;
     border-bottom-color: ${theme.inputTextColor};
     padding-bottom: 10px;
     padding-top: 10px;
`

export const BorderBottom = styled.View`
     flex: 1;
     gap: 32px;
     flex-direction: row;
     align-items: flex-end;
     justify-content: flex-end;
     border-bottom-width: 0.3px;
     border-bottom-color: ${theme.lightGray};
     padding-bottom: 15px;
`

export const ModalContent = styled.View`
    justify-content: space-between;
    background-color: ${theme.secondaryColor};
    padding: 5px 14px 19px;
    gap: 10px;
`

export const ModalButton = styled.TouchableOpacity`
    align-self: center;
    align-items: center;
    justify-content: center;
    background-color: ${theme.primarycolor};
    border-radius: 5px;
    width: 100px;
    padding: 5px 8px;
    margin: 15px 0 5px;
`

export const OptionContainer = styled.TouchableOpacity`
    width: 100%;
    gap: 10px;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
`