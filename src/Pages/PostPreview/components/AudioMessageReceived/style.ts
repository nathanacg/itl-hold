import styled from "styled-components/native";
import { fontStyle, theme } from "../../../../Theme/theme";



export const MessageContainer = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 10px 10px;
    gap: 6px;
    height: 70px;
`

export const Message = styled.View`
    justify-content: center;
    position: relative;
    z-index: 2;
    border-radius: 10px;
    padding: 1px 6px 42px 15px;
    /* margin-left: 40.5px; */
    /* margin-bottom: -10px; */
`

export const MessageText = styled.Text`
    font-family: ${fontStyle.regular};
    color: ${theme.textDark};
    font-size: 13px;
    margin-bottom: 0px;
    bottom: 5px;
    margin-right: 10px;
    width: auto;
`
export const MessageTextLong = styled.Text`
    font-family: ${fontStyle.regular};
    color: ${theme.textDark};
    font-size: 13px;
    line-height: 18px;
    margin-right: 60px;

`

export const MessageInfo = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 2px;
    position: absolute;
    bottom: 2px;
    right: 6px;
`

export const Time = styled.Text`
    font-family: ${fontStyle.light};
    color: ${theme.textDark};
    font-size: 12px;
    margin-right: 1px;
`

export const ViewImage = styled.Image`
    width: 13px;
`
export const UserImage = styled.Image`
    width: 35px;
    height: 35px;
    border-radius: 18px;
    margin-top: 3px;
    background-color: black;
`