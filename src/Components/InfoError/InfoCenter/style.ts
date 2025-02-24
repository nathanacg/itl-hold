import styled from 'styled-components/native';
import { fontStyle } from '../../Theme/theme';

export const Container = styled.View`
   width: 100%;
   flex-direction: row;
   justify-content: center;
   align-items: center;
   bottom: 8%;
`;

export const ContentInfo=styled.View`
    flex-direction: row;
   align-items: center;
   justify-content: space-between;
   /* padding: 2px 10px; */
   padding: 11px 16px;
   background-color: rgba(94, 94, 94, 0.7);
   z-index: 2;
   position: absolute;
   width: 95%;
   border-radius: 6px;
`

export const TextInfo=styled.Text`
    font-family: ${fontStyle.regular};
    text-align: center;
    font-size:14px;
    color: #fff;
    font-family: ${fontStyle.regular};
`