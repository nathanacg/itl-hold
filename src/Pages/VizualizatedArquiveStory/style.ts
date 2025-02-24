import styled from 'styled-components/native';
import { theme, fontStyle } from '../../Theme/theme';

export const Container = styled.View`
     align-items: center;
     justify-content: center;
`

export const CardImage = styled.Image`
   top: 12%;
   width: 100%;
   height: 80%;
   border-radius: 10px;
   `
export const UserImage = styled.Image`
   width: 40px;
   height: 40px;
   /* background-color: white; */
   border-radius: 50px;
   border-width: 1px;
   border-color: white;
   `
export const TextUserName = styled.Text`
       color: ${theme.lightGray};
       font-family: ${fontStyle.regular};
       font-size: 15px;
       margin-left: -3px;
   `

export const CardImageCreate = styled.View`
   width: 85px;
   height: 85px;
   border-radius: 8px;
   justify-content: center;
   align-items: center;
   margin-top: 26px;
   margin-left: 16px;
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
export const StoryOptionsPoints = styled.TouchableOpacity`
    position: absolute;
    top: 1%;
    right: 15%;
    z-index: 2;
`;

export const StoryOptions = styled.TouchableOpacity`
    color: #000;
    flex-direction: row;
    align-items: center;
    gap: 11px;
    margin: 0px 0;
`

export const OptionText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 14px;
    color: ${theme.textDark};
`