import styled from "styled-components/native";

import { fontStyle, theme } from "../../Theme/theme"
import { Platform } from "react-native";


export const Container = styled.View`
    background-color: #FFF;
    padding-bottom: 20px;
`

export const Notifications = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 166px;
    padding: 5px 10px;
    background-color: #0245F4;
    border-radius: 18px;
    margin: 26px auto;
`

export const NewPublication = styled.TouchableOpacity`
    background-color: #0245F4;
    border-radius: 16px;
    align-items: center;
    align-self: center;
    justify-content: center;
    width: ${Platform.OS == 'ios' ? '170px' : '42.3%'};
    margin-top: ${Platform.OS == 'ios' ? '10px' : '5px'};
    margin-bottom: ${Platform.OS == 'ios' ? '20px' : '10px'};
`

export const TextNew = styled.Text`
    color: #fff;
    font-size: 13px;
    padding-left: 15px; 
    padding-right: 15px;
    padding-top: 5px; 
    padding-bottom: 5px; 
`

export const DropLoading = styled.View`
    width: 150px;
    height: 219px;
    margin-right: 16px;
    border-radius: 6px;
    background-color: ${theme.lightGray};
`

export const arrowUpImage = styled.Image`
    height: 14px;

`
export const NotificationsText = styled.Text`
    color: #FFF;
    text-align: center;
`

export const EndFeedcontainer = styled.View` 
    margin-top: 30px;
    margin-bottom: 30px;
    justify-content: center;
    align-items: center;
`

export const EndFeedImage = styled.Image`
    width: 40px;
    height: 40px;
`

export const EndFeedTitle = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 20px;
    color: ${theme.primarycolor};
`

export const EndFeedText = styled.Text`
    width: 164px;
    font-family: ${fontStyle.regular};
    font-size: 16px;
    margin-top: 10px;
    color: ${theme.textDark};
    text-align: center;
`