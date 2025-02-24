import styled from 'styled-components/native';
import { theme,fontStyle } from '../../Theme/theme';

export const Container = styled.ScrollView`
   flex-direction: row;
   margin-top: 5%;
   margin-left: 17px;
   margin-bottom: -15px;
`;

export const CardContainer=styled.TouchableOpacity`
   justify-content: flex-end;
   gap: 9.5px;
   margin-right: 8px;
   margin-bottom: 9px;
   margin-left: 10px;
`

export const CardAddDestack=styled.View`
   width: 85px;
   height: 85px;
   border: 1px;
   border-radius: 8px;
   border-color: ${theme.primarycolor};
   justify-content: center;
   align-items: center;
`

export const AddTitleCard=styled.Text`
   text-align: center;
   color: ${theme.primarycolor};
   font-family: ${fontStyle.medium};
   font-size: 14px;
`

export const CardImage=styled.Image`
   width: 85px;
   height: 85px;
   border-radius: 8px;
`

export const TitleCard=styled.Text`
   text-align: center;
   color: ${theme.textDark};
   font-family: ${fontStyle.medium};
   font-size: 14px;
`

