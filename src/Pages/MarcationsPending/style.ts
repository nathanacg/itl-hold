import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';

export const TitlePage = styled.Text`
   color:${theme.textDark};
    font-family: ${fontStyle.semiBold};
    font-size:14px;
    margin-top: 20px;
`;

export const Text = styled.Text`
    color:${theme.textDark};
    font-family: ${fontStyle.regular};
    font-size:12px;
`

export const HeaderTextButton = styled.Text`
    color:${theme.textDark};
    font-family: ${fontStyle.regular};
    font-size:14px;
`

export const ButtonsContainer = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    border: 1px;
    border-color: #D9D9D9;
    border-left-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
    padding: 3%;
`

export const Divisor = styled.View`
    width: 1px;
    height: 90%;
    background-color: #D9D9D9;
`