import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';

export const Container = styled.View`
   flex: 1;
`;

export const TextModal = styled.Text`
   color:#231F20;
   font-size:16px;
   font-family: ${fontStyle.regular};
   text-align: center;
`

export const HeaderTextButton = styled.Text`
    color:${theme.textDark};
    font-family: ${fontStyle.regular};
    font-size:14px;
`