import styled from 'styled-components/native';
import { theme, fontStyle } from '../../Theme/theme';

export const Container = styled.View`
     align-items: center;
     justify-content: center;
`

export const CardImage = styled.Image`
   top: 3%;
   width: 100%;
   height: 90%;
   border-radius: 10px;
   border-bottom-left-radius: 10px;
   border-bottom-right-radius: 10px;
   `

export const CardPost = styled.Image`
   top: 24%;
   width: 100%;
   height: 50%;
   border-radius: 10px;
`

export const ImagePostColor = styled.View`
   top: 24%;
   width: 100%;
   height: 50%;
   border-radius: 10px;
   align-items: center;
   justify-content: center;
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
export const TimelineContainer = styled.View`
    top: 16%;
    width: 100%;
    z-index: 2;
`

export const IndicatorRow = styled.View`
   gap: 5px;
   flex-direction: row;
   margin-bottom: 20px;
`

export const IndicatorBG = styled.View`
   flex: 1;
   height: 3px;
   background-color: gray;
   border-radius: 10px;
   overflow: hidden;
`

export const ContainerGeral = styled.View`
   /* flex: 1; */
   height: 100%;
   background-color: black;
`

export const ProfileView = styled.View`
   left: 5%;
   top: 10%; 
   width: 70%;
   position: absolute;
   z-index: 4;
   flex-direction: row;
   align-items: center;
   gap: 15px;
`
export const OptionsView = styled.View`
   z-index: 4;
   width: 55px;
   height: 50px;
   top: 10%;
   right: 30;
   position: absolute;
`
export const CloseView = styled.View`
   z-index: 4;
   width: 50px;
   height: 50px;
   top: 9.5%;
   right: 10px;
   position: absolute;
`

export const NavigationButtons = styled.View`
   position: absolute;
   flex-direction: row;
   justify-content: space-between;
   width: 100%;
   height: 80%;
   z-index: 2;
   top: 110px;
`
export const LeftTouch = styled.TouchableOpacity`
   height: 90%;
   width: 40%;
   top: 20%;
   margin-right: 5px;
   `
export const RightTouch = styled.TouchableOpacity`
   height: 90%;
   width: 40%;
   top: 20%;
   margin-left: 5px;
`
export const CentralTouch = styled.TouchableOpacity`
   height: 100%;
   width: 35%;
   margin-right: 5px;
`