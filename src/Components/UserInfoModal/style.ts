import styled from "styled-components/native"
import { fontStyle, theme } from "../../Theme/theme"


export const UserInfo = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
`

export const RowDirection = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 10px;
`


export const UserImage = styled.Image`
    width: 60px;
    height: 60px;
    border-radius: 60px;
`

export const UserName = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 14px;
    color: ${theme.textDark};
`
export const UserNameValid = styled.Text`
    
    color:${theme.textDark};
    font-family: ${fontStyle.regular};
    font-size:12px;
`

export const TextOption = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 14px;
    color: #000;
`

export const OptionsContainer = styled.View`
    gap: 7px;
    margin: 10px 0;
`