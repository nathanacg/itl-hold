import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';

export const Title = styled.Text`
    color:${theme.textDark};
    font-family: ${fontStyle.semiBold};
    font-size:16px;
`
export const RegularText = styled.Text`
    color:#8A8A8A;
    font-family: ${fontStyle.regular};
    font-size:13px;
    text-align: justify;
`

export const ContentContainer = styled.View`
    padding: 0px 25px 20px 25px;
    gap: 20px;
    margin-top: 35px;
`