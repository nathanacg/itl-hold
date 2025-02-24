import styled from "styled-components/native"

import { theme, fontStyle } from "../../../Theme/theme"

export const HeaderContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    height: 65px;
    border-bottom-width: 2px;
    border-color: #c4c4c459;
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
    /* elevation: 1; */
    align-items: center;
    padding:0px 20px;
    top:0px;
`

export const UserInfos = styled.View`
    flex-direction: row;
    align-items: center;
    flex: 1;
    gap: 4px;
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
    color: ${theme.textDark};
    line-height: 27px;
    flex: 1;
    margin-left: 4px;
  
`

export const HeaderActions = styled.View`
    justify-self: flex-end;
    align-items: center;
    flex-direction: row;
    gap: 18px;
`