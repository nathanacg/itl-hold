import styled from "styled-components/native";

import { theme, fontStyle } from "../../Theme/theme"
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export const SafeAreaViewContainer = styled(SafeAreaView)`
    flex:1;
    align-items: center;
    justify-content: center;
`;

export const PostLegendText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 14px;

    padding: 20px;
    margin-bottom: -20px;
    font-weight: 400;
    color: ${theme.textDark};
`

export const RespostContainer = styled(KeyboardAwareScrollView)`
    background-color: ${theme.secondaryColor};
`

export const HeaderButton = styled.TouchableOpacity`
    padding: 8px 21px;
    background-color: ${theme.primarycolor};
    border-radius: 6px;
    padding: 8px 30px;
`
export const ButtonText = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 13px;
    color: ${theme.secondaryColor};
`

export const InputRepost = styled.Text`
    width: 100%;
    padding: 10px;
    border-width: 1px;
    border-color: #e1e1e1;
    border-radius: 4px; 
`

export const RepostContent = styled.View`
    width: 100%;
    padding: 25px 22px 10px;
    align-items: center;
    gap: 28px;
`

export const UserImage = styled.Image`
   width: 58px;
   height: 58px;
   border-radius: 29px;
   margin-right: 13px;
`

export const PostContainer = styled.View`
   width: 100%;
   border-width: 1px;
   border-color: ${theme.lightGray};
   padding: 10px 0px;
   border-radius: 6px;
`


export const ProfileName = styled.Text`
   color: ${theme.textDark};
   font-size: 16px;
   font-family: ${fontStyle.semiBold};
`

export const TimerPublicationContent = styled.View`
    flex-direction: row;
    gap: 5px;
    align-items: center;
    margin-top: -4px;

`
export const TimerPublication = styled.Text`
   color: ${theme.textLight};
   font-size: 10px;
   font-family: ${fontStyle.regular};
`

export const PostHeader = styled.View`
    padding: 0px 9px;
    margin-bottom: 5px;
`