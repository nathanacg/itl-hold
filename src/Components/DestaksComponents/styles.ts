import styled from 'styled-components/native';
import { theme, fontStyle } from '../../Theme/theme';

export const Container = styled.View`
     align-items: center;
     justify-content: center;
`

export const CardImage = styled.Image`
   width: 85px;
   height: 85px;
   border-radius: 8px;
   background-color: #CECECE;
   justify-content: center;
   align-items: center;
   margin-top: 26px;
   margin-left: 16px;
`
export const CardImageCreate = styled.View`
   width: 85px;
   height: 85px;
   border-radius: 8px;
   justify-content: center;
   align-items: center;
   margin-top: 26px;
   margin-left: 20px;
   border-width: 1px;
   border-color: ${theme.primarycolor};
`



export const TitleCard = styled.Text`
   text-align: center;
   color: ${theme.textDark};
   font-family: ${fontStyle.medium};
   font-size: 14px;
   margin-right: -15px;
`

export const TitleCardCreate = styled.Text`
   text-align: center;
   color: ${theme.primarycolor};
   font-family: ${fontStyle.semiBold};
   font-size: 14px;
   margin-right: -15px;
`

export const TitleCardList = styled.Text`
   text-align: center;
   align-items: center;
   color: ${theme.textDark};
   font-family: ${fontStyle.Bold};
   font-size: 14px;
   margin-bottom: 10px;
   padding-bottom: -60px;
   margin-right: -14px;
   padding-top: 10px;
`