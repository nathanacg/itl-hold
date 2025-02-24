import styled from "styled-components/native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from "react-native-safe-area-context";
import { theme, fontStyle } from "../Theme/theme"
import { View } from "react-native";

interface textProps {
    color: string,
    weight: number | string;
    fontSize: string
}

interface buttonConectedProps {
    active: boolean
}



export const SafeAreaViewContainer = styled(SafeAreaView)`
    flex: 1;
    background-color: ${theme.secondaryColor};
    justify-content: flex-end;
`

export const SafeAreaViewContainer4 = styled(SafeAreaView)`
    flex: 1;
    background-color: #1a1a1a;
    justify-content: flex-end;
`

export const SafeAreaViewContainer5 = styled(SafeAreaView)`
    flex: 1;
    background-color: #000;
    justify-content: flex-end;
`


export const SafeAreaViewContainer6 = styled(SafeAreaView)`
    flex:1;
    background-color: transparent;
    justify-content:flex-end;
`

export const SafeAreaViewContainer3 = styled(SafeAreaView)`
    flex:1;
    background-color: ${theme.primarycolor};
    justify-content:flex-start;
`

export const SafeAreaViewContainer2 = styled(SafeAreaView)`
    flex:1;
    background-color: ${theme.secondaryColor};  
`

export const Container = styled(KeyboardAwareScrollView)`
    background-color: ${theme.secondaryColor};
`

export const ContainerExplore = styled(KeyboardAwareScrollView)`
margin-top: 5px;
    background-color: ${theme.secondaryColor};
`

export const Container2 = styled(View)`
    background-color: ${theme.secondaryColor};
   
`

export const Content = styled.View`
    flex: 1;
    margin-top: 35px;
    padding: 0px 25px 20px;
`

export const ContainerView = styled.View`
    margin-top: 30px;
`

export const Text500 = styled.Text`
    font-size:${(props: textProps) => props.fontSize}px;
    color: ${(props: textProps) => props.color};
    font-weight:${(props: textProps) => props.weight};
`
export const ContentPage2 = styled.View`
    padding: 15px 25px 60px;
`

export const ContentPage = styled.View`
    padding: 15px 25px 10px;
`

export const ContentPageLoading = styled.View`
    padding: 0px 25px;
`

export const ContentPageProfileMenu = styled.View`
    padding: 15px 25px 0px;
`
export const ContentPageBlocked = styled.View`
    padding: 15px 25px 5px;
`

export const ContentPageExplore = styled.View`
    padding: 15px 25px 0px;
`
export const TitlePagelight = styled.Text`
    font-size:16px;
    margin-top: 18px;
    color: ${theme.textDark};
    font-family: ${fontStyle.regular};
`

export const TitlePage = styled.Text`
    font-size:21px;
    color: ${theme.darkBlue};
    font-family: ${fontStyle.Bold};
`

export const TitlePageLogin = styled.Text`
    font-size:21px;
    margin-top: 15px;
    margin-bottom: -15px;
    color: ${theme.darkBlue};
    font-family: ${fontStyle.Bold};
`

export const Bold = styled.Text`
    font-family: ${fontStyle.Bold};
`
export const SemiBold = styled.Text`
    font-family: ${fontStyle.semiBold};
`

export const BoldDarkBlue = styled.Text`
    font-size:16px;
    color: ${theme.darkBlue};
    font-family: ${fontStyle.Bold};
`

export const ButtonBottom = styled.View`
    height: 30%;
    display: flex;
    justify-content: flex-end;
`

export const CircleSelectButton = styled.View`
    background-color:${(props: buttonConectedProps) => props.active ? (theme.primarycolor) : (theme.secondaryColor)};
    border-radius:14px;
    border-width:1px;
    border-color:${(props: buttonConectedProps) => props.active ? ("#fff") : ("#ACACAC")};
    width: 14px;
    height: 14px;
`

export const CircleSelectButtonCancel = styled.View`
    background-color:${(props: buttonConectedProps) => props.active ? (theme.primarycolor) : (theme.secondaryColor)};
    border-radius:10px;
    border-width:1px;
    border-color:${(props: buttonConectedProps) => props.active ? ("#fff") : ("red")};
    width: 14px;
    height: 14px;
`
export const TextSimple = styled.Text`

    font-size:13px;
    margin-bottom: 10px;
    margin-top: 10px;
    color: ${theme.textDark};
    font-family: ${fontStyle.regular};
`

export const TextSimpleRoom = styled.Text`
    font-size:12px;
 
    width: 74%;
    color: ${theme.textDark};
    font-family: ${fontStyle.regular};
`

export const TextSimpleRoomInfo = styled.Text`
    font-size:12px;
    margin-bottom: 5px;
    width: 74%;
    color: ${theme.textligthGray};
    font-family: ${fontStyle.regular};
`

export const ContainerImage = styled.View`
    flex-direction:row;
    justify-content:center;
    margin:30px 0px;
`

export const Image = styled.Image`
    padding:10px;
`

export const UndelineText = styled.Text`
    text-align:center;
    font-size:14px;
    font-family:${fontStyle.regular};
    color:${theme.textLight};
    text-decoration:underline;
    text-decoration-color:${theme.textLight};
    padding-bottom:15px;
`

export const ProfilePhoto = styled.Image`
    border-radius: 44px;
    width: 44px;
    height: 44px;
`

export const ProfilePhotoConfig = styled.Image`
    border-radius: 32px;
    width: 32px;
    height: 32px;
`

export const TextOptionSelectedBottom = styled.Text`
    font-size:14px;
    color: #000;
    font-family: ${fontStyle.regular};
`

export const CheckBoxUnselected = styled.View`
    border-radius:2px;
    border-width:1px;
    padding:8.75%;
    border-color: transparent;
`

export const TextInputBox = styled.TextInput`
    border-radius:10px;
    width: 100%;
    height: 179px;
    padding: 10px;
    border:1px;
    border-color:#C4C4C4;
    margin-top:7px;
    font-family: ${fontStyle.regular};
`

export const TextCountLimitCaractersBio = styled.Text`
    color: ${theme.textDark};
    text-align:right;
    font-family: ${fontStyle.regular};
`

export const TextMedium = styled.Text`
    font-family: ${fontStyle.medium};
    color: ${theme.textDark};
    font-size:${(props: textProps) => props.fontSize};
`

export const RowDirection = styled.View`
    width: 100%;
    flex-direction: row;
    gap: 4px;
    align-items: center;
`

export const OptionContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    gap: 11px;
    margin: 10px 0;
`

export const OptionText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 14px;
    color: ${theme.textDark};
    margin-top: 2px;
`
export const ListSeparator = styled.View`
    width: 100%;
    height: 0.5px;
    background-color: ${theme.lightGray};

`