import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';

export const Content = styled.View`
   padding: 0px 23px 20px;
   margin-top: 35px;
`;


export const TextDescription = styled.Text`
    color:${theme.textDark};
    font-family: ${fontStyle.regular};
    font-size:13px;
    text-align: left;
`

export const LocalizationName = styled.Text`
    color:${theme.textDark};
    font-family: ${fontStyle.semiBold};
    font-size:14px;
    margin-top: 15px;
    margin-bottom: 6px;
`