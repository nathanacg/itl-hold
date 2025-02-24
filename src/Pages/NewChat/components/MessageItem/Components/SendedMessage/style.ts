import styled from "styled-components/native";

import { theme, fontStyle } from "../../../../../../Theme/theme"

export const MessageContainer = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 8px 25px;
    gap: 6px;
`

export const Message = styled.View`
    justify-content: center;
    position: relative;
    z-index: 2;
    width: auto;
    background-color: #F4F4F4;
    border-radius: 10px;
    padding: 12px 6px 12px 15px;
    height: auto;
    margin-left: 50px;
    margin-bottom: -10px;
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
    font-size: 11px;
`

export const ViewImage = styled.Image`
    width: 13px;
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