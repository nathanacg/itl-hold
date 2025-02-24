import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';

export const Text=styled.Text`
    font-size:14px;
    color: ${theme.textDark};
    font-family: ${fontStyle.regular};
`

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
export const TextTab=styled.Text`
   color: ${(props:{active:boolean})=>props.active?(theme.primarycolor):('#c4c4c4')};
   font-family: ${fontStyle.regular};
   font-size: 14px;
   padding-top: 3px;
`
export const TabsContainer=styled.View`
   flex-direction: row;
   align-items: center;
   justify-content: flex-start;
   border-bottom-color: ${theme.primarycolor};
   margin-top: 5px;
`