import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';

export const TextDetailmentPage = styled.Text`
   font-size:12px;
   color: ${theme.textDark};
   font-family: ${fontStyle.regular};
   margin-top: 10px;
   margin-bottom: 0px;
`;

export const TextDetailmentPageClose = styled.Text`
   font-size:13px;
   color: ${theme.textDark};
   font-family: ${fontStyle.regular};
   margin-top: 40px;
   margin-bottom: 0px;
`;

export const ContainerResultSeacrh = styled.View`
   flex-direction: column;
   align-items: flex-start;
   justify-content: space-between;
   margin-bottom: 12px;
`
export const SeeMoreContainer = styled.View`
   width: 100%;
   padding: 8px 25px;
   align-items: flex-end;
`

export const TextResultTotal = styled.Text`
   font-size:12px;
   color: ${theme.textDark};
   font-family: ${fontStyle.regular};
   margin-left: 0px;
`
export const BorderWidth = styled.View`
   width: 132px;
   height: 1px;
   margin-right: 17px;
   background-color: black;
   /* align-items: center;
   margin-right: 100%;
   margin-top: 15px; */
`

export const SugestionText = styled.Text`
   align-self: flex-start;
   font-size:14px;
   color: ${theme.textDark};
   font-family: ${fontStyle.regular};
   margin-top: 10px;
   margin-bottom: -5px;
`

export const UndelineText = styled.Text`
   text-align:center;
   font-size:12px;
   font-family:${fontStyle.regular};
   color:${theme.textLight};
   text-decoration:underline;
   text-decoration-color:${theme.textLight};
`
