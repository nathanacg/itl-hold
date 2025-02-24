import styled from 'styled-components/native';
import { theme, fontStyle } from '../../Theme/theme';

export const CardAddDestack = styled.TouchableOpacity`
   width: 85px;
   height: 85px;
   border-width: 1px;
   border-radius: 8px;
   border-color: ${theme.primarycolor};
   justify-content: center;
   align-items: center;
   margin-top: 26px;
   margin-left: 26px;
`
export const CardNull = styled.View`
   width: 85px;
   height: 85px;
   border-radius: 8px;
   background-color: #CECECE;
   justify-content: center;
   align-items: center;
   margin-top: 26px;
   margin-left: 16px;
`
export const AddTitleCard = styled.Text`
   color: ${theme.primarycolor};
   font-family: ${fontStyle.medium};
   font-size: 14px;
   margin-left: 23px;
   margin-bottom: -2.5px;
   /* margin-top: 10px; */
`

export const NotificationsInfo = styled.View`
    border-radius: 10px;
    height: 20px;
    width: 20px;
    font-size: 20px;
    text-align: center;
    justify-content: center;
    align-items: center;
    background-color: #F00D;
    position: absolute;
    top: 10px;
    right: -10px;
`

export const Notification = styled.Text`
    font-size: 16px;
    text-align: center;
    color: ${theme.secondaryColor};
`

export const ViewDestackSquare = styled.View`
   background-color: #fff;
   margin-top: 15px;
   margin-bottom: -18px;
   margin-left: 19px;
`

export const ViewDestackScrowl = styled.View`
  align-self: flex-start; 
  flex-direction: row;
  margin-bottom: 5px;
`

export const ViewDestackSquareText = styled.Text`
    color: #231F20;
    font-family: ${fontStyle.medium};
    font-size: 15px;
`
