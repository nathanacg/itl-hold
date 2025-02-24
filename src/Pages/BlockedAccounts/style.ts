import styled from "styled-components/native";
import { fontStyle, theme } from "../../Theme/theme";

export const ContainerResultSeacrh = styled.View`
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
   margin-bottom: -12px;
`

export const TextResultTotal = styled.Text`
   font-size:12px;
   color: ${theme.textDark};
   font-family: ${fontStyle.regular};
`

export const SeeMoreText = styled.Text`
   align-self: flex-start;
   font-size:14px;
   color: ${theme.textDark};
   font-family: ${fontStyle.regular};
   margin-bottom: 5px;
`

export const UndelineText = styled.Text`
   text-align:center;
   font-size:14px;
   font-family:${fontStyle.regular};
   color:${theme.textLight};
   text-decoration:underline;
   text-decoration-color:${theme.textLight};
`

export const SeeMoreContainer = styled.View`
   width: 100%;
   padding: 8px 25px;
   align-items: flex-end;
`
