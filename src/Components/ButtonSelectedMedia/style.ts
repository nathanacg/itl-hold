import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';

export const ButtonsContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    border: 1px;
    border-color: #D9D9D9;
    border-left-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
    padding: 0%;
`

export const Button = styled.TouchableOpacity`
    max-width: 40%;
    flex-direction: row;
    justify-content: center;
    gap: 5px;
    padding: 3%;
`

export const Separate = styled.View`
    width: 1px;
    height: 25px;
    margin-right: 1.5%;
    background-color: ${theme.lightGray};
`

export const TextButton = styled.Text`
    color:${theme.textDark};
    font-family: ${fontStyle.semiBold};
    font-size:14px;
`

export const CountTextButton = styled.Text`
    color:${theme.textDark};
    font-family: ${fontStyle.regular};
    font-size:14px;
`