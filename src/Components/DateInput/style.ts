import styled from "styled-components/native";
import { fontStyle, theme } from "../../Theme/theme";


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
     padding-bottom: 2px;
     padding-top: 10px;
`

export const ContainerBottom = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: flex-end;
    gap: 16px;
    /* border-bottom-width: 0.3px;
    border-bottom-color: ${theme.lightGray}; */
    padding-bottom: 2px;
    justify-content: flex-start;
`

export const BorderBottom = styled.TouchableOpacity`
     flex: 1;
     flex-direction: row;
     align-items: flex-end;
     gap: 16px;
     /* border-bottom-width: 0.3px;
     border-bottom-color: ${theme.lightGray}; */
     padding-bottom: 2px;
     justify-content: flex-start;
`


export const TimeOptionText = styled.Text`
    text-align: right;
    font-family: ${fontStyle.regular};
    font-size: 14px;
    color: ${theme.textDark};
    margin-right: 8px;
`