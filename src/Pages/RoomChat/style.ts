import styled from "styled-components/native";
import { fontStyle, theme } from "../../Theme/theme";


export const SalaChatContainer = styled.View`
    flex: 1;
    height: 100%;
`

export const MessagesContainer = styled.View`
    width: 100%;
    flex: 1;
    padding-top: 40px;
`

export const MessageDate = styled.Text`
    font-family: ${fontStyle.light};
    font-size: 12px;
    color: ${theme.textDark};
    align-self: center;
    margin-bottom: 5px;
    margin-top: 5px;
`