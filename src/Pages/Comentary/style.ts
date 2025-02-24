import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';

export const Container = styled.View`
   flex: 1;
   padding: 35px  25px 20px;
`;

export const TextContainer = styled.View`
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
`;


export const Text=styled.Text`
    color:${theme.textDark};
    font-family: ${fontStyle.regular};
    font-size:14px;
`

export const Text12=styled.Text`
    color:${theme.textDark};
    font-family: ${fontStyle.regular};
    font-size:12px;
    margin-top: 5px;
`