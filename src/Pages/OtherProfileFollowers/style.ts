import styled from "styled-components/native"

import { theme, fontStyle } from "../../Theme/theme"

export const FollowersContainer = styled.View`
    width: 100%;
    height: 100%;
    background-color: ${theme.secondaryColor};
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
   gap: 20px;
   margin-top: 20px;
   padding: 0px 27px;
`

export const ContentContainer = styled.View`
   width: 100%;
   align-items: center;
   justify-content: space-between;
   flex-direction: row;
   padding: 4px 24px;
`

export const ContentContainerComum = styled.View`
   width: 100%;
  justify-content: space-between;
  align-items: center;
   display: flex;
   flex-direction: row;
   padding: 0px 24px;
`

export const SmallText = styled.Text`
   font-family: ${fontStyle.regular};
   font-size: 12px;
   text-align: center;
   color: ${theme.textDark};
   margin: 6px 0px;
`

export const SeeAllFollow = styled.Text`
   font-family: ${fontStyle.regular};
   font-size: 12px;
   text-align: center;
   color: ${theme.textDark};
`

export const SameSmallText = styled.Text`
   font-family: ${fontStyle.regular};
   font-size: 12px;
   text-align: left;
   color: ${theme.textDark};
   margin: 10px 0px;
`

export const ListContainer = styled.View`
   height: 100%;
   padding-bottom: 50px;
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
    padding:0px 20px;
    top:0px;
`
export const GoBackHeader = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    gap: 7px;
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