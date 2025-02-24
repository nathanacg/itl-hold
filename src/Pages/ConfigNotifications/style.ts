import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';

export const ContentPage = styled.View`
   padding: 0 25px;
   margin-top: 35px;
`

export const TextContainer = styled.View`
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
   margin-top: 2px;
   margin-bottom: 15px;
`;


export const Text = styled.Text`
    color:${theme.textDark};
    font-family: ${fontStyle.regular};
    font-size:14px;
`

export const Text12 = styled.Text`
    color:${theme.textDark};
    font-family: ${fontStyle.regular};
    font-size:12px;
`