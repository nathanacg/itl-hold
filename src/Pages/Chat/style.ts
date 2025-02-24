import styled from "styled-components/native";


import { theme, fontStyle, fontSize } from "../../Theme/theme"
import { SafeAreaView } from "react-native-safe-area-context";

export const MessageItemContainer = styled.View`
    margin-top: 10px;
    padding-left: 25px;
    padding-right: 25px;
`

export const StoryMessageContainer = styled.TouchableOpacity`
    width: 193px;
    border-radius: 6px;
    border: 1px;
    border-color: ${theme.lightGray};
    margin-left: ${(props) => props.isMy ? 24 : 40}px;
    margin-top: 10px;
    justify-content: center;
    align-items: center;
    align-self: ${(props) => props.isMy ? "flex-end" : "flex-start"};
    overflow: hidden;
`

export const ModalContainer = styled.View`
    position: absolute;
    bottom:0px;
    width: 100%;
    align-items: center;
`

export const ChatContainer = styled.View`
    width: 100%;
    height: 100%;
    background-color: ${theme.secondaryColor};
`
export const Title = styled.Text`
    font-size: 12px;
    padding: 5px;
    font-family: ${fontStyle.regular};
    color: ${theme.textligthGray};
`

export const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: ${theme.secondaryColor};
`

export const ChatHeader = styled.View`
    flex-direction: row;
    height: 65px;
    border-width: 2px;
    border-color: #c4c4c459;
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
    align-items: center;
    justify-content: space-between;
    padding:0px 10px;
    top:0px;
`

export const ChatHeaderUser = styled.Image`
    width: 46px;
    height: 46px;
    border-radius: 23px;
    margin-right: 12px;
`

export const MessageBox = styled.View`
    align-items: center;
    justify-content: center;
    padding: 20px 0px 5px 0px;
`

export const MessageDateGroup = styled.Text`
    color: ${theme.textligthGray};
    font-family: ${fontStyle.light};
    font-size: ${fontSize.thin}px;
`

export const UserName = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 14px;
    color: ${theme.textDark};
`

export const UserName2 = styled.Text`
    font-family: ${fontStyle.medium};
    font-size: 12px;
    margin-top: -3px;
    color: ${theme.lightGray};
`

export const UserName22 = styled.Text`
    font-family: ${fontStyle.medium};
    font-size: 14px;
    color: ${theme.lightGray};
`


export const UserOnline = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 12px;
    color: ${theme.lightGray};
`


export const UserImage = styled.Image`
    width: 35px;
    height: 35px;
    border-radius: 35px;
    border-width: 0.1px;
    margin-left: 0px;
`

export const Green = styled.Text`
    color: ${theme.green};
`

export const UserAddress = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 12px;
    color: ${theme.textDark};
    line-height: 18px;
    margin-top: -5px;
`

export const InitialChatContainer = styled.View`
    align-items: center;
    padding-top: 28px;
    padding-bottom: 0px;
    margin-bottom: 20px;
    
`

export const UserCenterImage = styled.Image`
    width: 74px;
    height: 74px;
    border-radius: 38px;
    margin-bottom: 14px;
`

export const MessagesContainer = styled.View`
    width: 100%;
    flex: 1;
    justify-content: flex-end;
`

export const AllowAlert = styled.View`
    padding-top: 14px;
    width: 100%;
    justify-content: center;
    align-items: center;
    border-top-width: 1px;
    border-top-color: #ddd;
`

export const AllowQuestion = styled.Text`
    font-family: ${fontStyle.medium};
    font-size: 12px;
    color: ${theme.textDark};
    margin-bottom: 6px;
`

export const AllowText = styled.Text`
    width: 332px;
    text-align: center;
    font-family: ${fontStyle.regular};
    font-size: 10px;
    color: ${theme.textDark};
    margin-bottom: 14px;
`

export const MessageOptions = styled.View`
    position: relative;
    z-index: 2;
    background-color: ${theme.secondaryColor};
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    border-top-width: 1px;
    border-top-color: #d9d9d9;
    padding: 12px 40px;
    height: 70px;
`

export const OptionText = styled.Text`
    flex: 1;
    text-align: center;
    font-family: ${fontStyle.semiBold};
    font-size: 14px;
    color: ${theme.textDark};
    padding: 10px;
`

export const Divisor = styled.View`
    width: 1px;
    height: 32px;
    background-color:  #d9d9d9;
`
export const Mask = styled.View`
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: #26262680;
    z-index: 2;
`

export const ModalOptions = styled.TouchableOpacity`
    flex-direction: row;
    gap: 10px;
`

export const ModalImage = styled.Image`
    width: 24px;
    height: 19px;
    object-fit: contain;
`

export const MessageDate = styled.Text`
    font-family: ${fontStyle.light};
    font-size: 12px;
    color: ${theme.textDark};
    align-self: center;
    margin-bottom: 5px;
    margin-top: 5px;
`
export const StoryOptions = styled.TouchableOpacity`
    color: #000;
    flex-direction: row;
    align-items: center;
    gap: 11px;
    margin: 0px 0;
`

export const OptionTextIn = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 14px;
    color: ${theme.textDark};
`