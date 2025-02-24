import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { theme, fontStyle } from "../../Theme/theme"

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const SafeAreaViewContainer = styled(SafeAreaView)`
    flex: 1;
    background-color: ${theme.textDark};
    justify-content: flex-end;
`

export const Wrapper = styled.View`
    margin-top: 200px;
    gap: 10px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const ButtonCall = styled.TouchableOpacity`
    width: 80px;
    height: 80px;
    border-radius: 80px;
    align-items: center;
    background-color: red;
    justify-content: center;
`;

export const ChatContainer = styled.View`
    position: relative;
    height: 100%;
    width: 100%;
    background-color: ${theme.secondaryColor};
`

export const ChatHeader = styled.View`
    flex-direction: row;
    height: 65px;
    border-width: 1px;
    border-color: #ffffff10;
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
    align-items: center;
    justify-content: flex-start;
    padding:0 20px;
`

export const ChatHeaderUser = styled.Image`
    width: 46px;
    height: 46px;
    border-radius: 23px;
    margin-right: 12px;
`

export const UserName = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 16px;
    color: ${theme.secondaryColor};
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
    padding-bottom: 20px;
    margin-bottom: 20px;
    
`

export const UserCenterImage = styled.Image`
    width: 74px;
    height: 74px;
    border-radius: 74px;
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
    gap: 18px;
`

export const ModalImage = styled.Image`
    width: 19px;
`

export const MessageDate = styled.Text`
    font-family: ${fontStyle.light};
    font-size: 12px;
    color: ${theme.textDark};
    align-self: center;
    margin-bottom: 5px;
    margin-top: 5px;
`