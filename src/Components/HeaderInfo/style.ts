import styled from "styled-components/native"

import { theme, fontStyle } from "../../Theme/theme"

export const HeaderContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    height: 64px;
    border-bottom-width: 2px;
    border-color: #c4c4c459;
    border-top-width: 0px;
    border-left-width: 0px;
    border-right-width: 0px;
    align-items: center;
    padding:0px 14px;
    top:0px;
`

export const Info = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const Title = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 18px;
    align-items: center;
    color: ${theme.textDark};
  
`

export const HeaderActions = styled.View`
    align-items: center;
    flex-direction: row;
    margin-right: 16px;
`