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


export const BorderBottom = styled.View`
     flex: 1;
     flex-direction: row;
     align-items: flex-end;
     gap: 10px;
     /* border-bottom-width: 0.3px;
     border-bottom-color: ${theme.lightGray}; */
     padding-bottom: 12px;
     justify-content: center
`


export const TimeOptionText = styled.Text`
    text-align: right;
    font-family: ${fontStyle.regular};
    font-size: 14px;
    color: ${theme.textDark};
    margin-right: 8px;
`