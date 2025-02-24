import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';


export const Content = styled.View`
    flex: 1;
    margin-top: 35px;
    padding: 0px 25px 20px;
`

export const ContainerForgotPassword = styled.View`
    flex-direction: row;
    margin-bottom: 15px;
   justify-content: flex-end;
`;

export const RepeatePasswordContainer = styled.View`
    margin-top: 15px;
`

export const UndelineText = styled.Text`
    text-align:right;
    font-size:12px;
    font-family:${fontStyle.regular};
    color:${theme.textDark};
    text-decoration:underline;
    text-decoration-color:${theme.textDark};
`