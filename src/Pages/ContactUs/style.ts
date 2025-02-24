import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';

export const TextLimitCaracters = styled.Text`
    color: ${theme.textligthGray};
    text-align:right;
    font-family: ${fontStyle.regular};
    font-size:12px;
    margin-top: 7px;
`

export const TextLight = styled.Text`
    color:${theme.textLight};
    font-family: ${fontStyle.regular};
    font-size:13px;
`

export const ContianerRecaptcha = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 10px;
    margin-top: 5%;
`