import styled from "styled-components/native"

import { theme, fontStyle } from "../../Theme/theme"

export const HeaderContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    height: 65px;
    border-bottom-width: 1px;
    border-color: #c4c4c459;
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
    /* elevation: 1; */
    align-items: center;
    padding:0px 14px;
    top:0;
`

export const UserInfos = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 7px;
`

export const HeaderUser = styled.Image`
    width: 31px;
    height: 31px;
    border-radius: 15.5px;
    margin-right: 13px;
`

export const UserName = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 18px;
    align-items: center;
    color: ${theme.textDark};
    line-height: 27px;
    /* border: 1px; */
  
`

export const HeaderActions = styled.View`
    justify-self: flex-end;
    align-items: center;
    flex-direction: row;
    gap: 18px;
`