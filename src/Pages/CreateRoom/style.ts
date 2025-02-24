import styled from "styled-components/native";

import { theme, fontStyle } from "../../Theme/theme"

export const CreateSalaContainer = styled.View`
    width: 100%;
    height: 100%;
`

export const ContainerInput = styled.View`
   flex-direction: row;
   align-items: center;
   justify-content: flex-start;
`;

export const OptionContainer = styled.View`
    flex-direction: row;
    align-items: flex-end;
    gap: 5px;
`

export const MoreOptionsInput = styled.TouchableOpacity`
     flex-direction: row;
     justify-content: space-between;
     width: 240px;
     border-bottom-width: 0.3px;
     border-bottom-color: ${theme.inputTextColor};
     padding-bottom: 10px;
     padding-top: 10px;
`


export const BorderBottom = styled.View`
     flex: 1;
     flex-direction: row;
     gap: 10px;
     border-bottom-width: 0.3px;
     border-bottom-color: ${theme.lightGray};
     padding-bottom: 5px;
     justify-content: space-around;
`

export const ModalContent = styled.View`
    width: 100%;
    justify-content: space-between;
`

export const ModalButton = styled.TouchableOpacity`
    align-self: center;
    align-items: center;
    justify-content: center;
    background-color: ${theme.primarycolor};
    border-radius: 5px;
    width: 100px;
    padding: 5px 8px;
    margin-top: 30px;
`

export const TimeOptionText = styled.Text`
    text-align: right;
    width: 90px;
    font-family: ${fontStyle.regular};
    font-size: 14px;
    color: ${theme.textDark};
    margin-right: 8px;
`