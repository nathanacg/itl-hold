import styled from 'styled-components/native';
import { fontStyle, theme } from '../../../Theme/theme';

export const TextDetailmentPage = styled.Text`
   font-size:12px;
   color: ${theme.textDark};
   font-family: ${fontStyle.regular};
   margin-top: 20px;
   margin-bottom: 10px;
`;

export const ContainerResultSeacrh = styled.View`
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
   margin-bottom: -12px;
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
