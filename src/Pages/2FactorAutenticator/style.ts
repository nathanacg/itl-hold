import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';

export const Container = styled.View`
    flex: 1;
    gap: 15px;
    margin-top: 35px;
`

export const OptionsContainer = styled.View`
   padding: 0px  25px;
   gap: 19px;
`

export const Text = styled.Text`
    color:${theme.textDark};
    font-family: ${fontStyle.regular};
    font-size:13px;
`


export const TextAutenticator = styled.Text`
   color:${theme.textDark};
    font-family: ${fontStyle.regular};
    font-size:16px;
`;

export const TextDetails = styled.Text`
    color:${theme.textDark};
    font-family: ${fontStyle.regular};
    font-size:12px;
    width: 95%;
    margin-top: -5px;
`

