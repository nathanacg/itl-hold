import styled from "styled-components/native"

import { theme, fontStyle } from "../../../../../../Theme/theme"

export const MessageContainer = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 2px 15px;
    gap: 7px;
    max-width: 100%;
    margin-top: -5px;

`

export const UserInfo = styled.View`
    align-items: flex-start;
    justify-content: center;
    margin-top: 6px;
`

export const UserNameTitle = styled.Text`
    font-family: ${fontStyle.regular};
    color: ${theme.primarycolor};
    font-size: 12px;
    font-weight: 900;
`

export const UserImage = styled.Image`
    width: 35px;
    height: 35px;
    border-radius: 35px;
    margin-top: 10px;
`

export const Message = styled.View`
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 10;
    background-color: #0245F41A;
    border-radius: 10px;
    min-width: 50px;
    padding: 13px 6px 20px 15px;
    margin-right: 80px;
  
`

export const MessageText = styled.Text`
    font-family: ${fontStyle.regular};
    color: ${theme.textDark};
    font-size: 13px;
    line-height: 18px;
    margin-right: 10px;
`
export const MessageTextLong = styled.Text`
    font-family: ${fontStyle.regular};
    color: ${theme.textDark};
    font-size: 13px;
    line-height: 18px;

    margin-right: 10px;
`

export const MessageInfo = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 3px;
    position: absolute;
    bottom: 3px;
    right: 6px;
`

export const Time = styled.Text`
    font-family: ${fontStyle.light};
    color: ${theme.textDark};
    font-size: 11px;
    margin-right: 2px;
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