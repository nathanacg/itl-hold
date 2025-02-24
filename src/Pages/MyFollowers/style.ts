import styled from "styled-components/native"

import { theme, fontStyle } from "../../Theme/theme"

export const FollowersContainer = styled.View`
    width: 100%;
    height: 100%;
    background-color: ${theme.secondaryColor};
`

export const GoBackHeader = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    gap: 7px;
`
export const HeaderContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    height: 65px;
    border-bottom-width: 2px;
    border-color: #c4c4c459;
    border-top-width: 0px;
    border-left-width: 0px;
    border-right-width: 0px;
    /* elevation: 1; */
    align-items: center;
    padding:0 20px;
    top:0px;
`
export const ProfilePhoto = styled.Image`
   width: 34px;
   height: 34px;
   border-radius: 34px;
`
export const UserName = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 18px;
    color: ${theme.textDark};
    line-height: 27px;
    /* border: 1px; */
  
`

export const FollowersContent = styled.View`
    flex: 1;
    width: 100%;
    padding-top: 27px;
`

export const SeeMoreContainer = styled.View`
   width: 100%;
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
   padding: 0px 24px;
`


export const ContentContainer = styled.View`
   width: 100%;
   align-items: flex-start;
   gap: 20px;
   padding: 0px 24px;
`

export const SmallText = styled.Text`
   font-family: ${fontStyle.regular};
   font-size: 12px;
   color: ${theme.textDark};
   margin: 6px 0;
`

export const ListContainer = styled.View`
   height: 100%;
`