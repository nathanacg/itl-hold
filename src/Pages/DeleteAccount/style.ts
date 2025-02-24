import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';

export const TextModal = styled.Text`
   color:#231F20;
    font-size:14px;
    font-family: ${fontStyle.regular};
   text-align: center;
`;

export const TextDescriptionPage = styled.Text`
    color:${theme.textDark};
    font-family: ${fontStyle.regular};
    font-size:16px;
    margin-top: 10px;
    width: 70%;
`