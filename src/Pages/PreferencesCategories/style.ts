import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';

export const Text = styled.Text`
   color:${theme.textDark};
    font-size:16px;
    font-family: ${fontStyle.regular};
    text-align: left;
    margin-top: 35px;
    width: 70%;
`;