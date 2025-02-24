import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';

export const Container = styled.View`
   flex: 1;
   margin-top: 30px;
`;

export const AccountPrivateContainer = styled.View`
   padding: 0px 25px;
   /* border-width: 1px;
   border-color: #C4C4C4;
   border-left-color: transparent;
   border-right-color: transparent;
   border-top-color: transparent; */
`

export const ContentOptions = styled.View`
   gap: 22px;
   padding: 30px  25px 20px;
`

export const TextContainer = styled.View`
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
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
    width: 90%;
`