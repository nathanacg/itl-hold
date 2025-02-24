import styled from "styled-components/native";

import { theme, fontStyle } from "../../Theme/theme"

export const PostContainer = styled.View`
   width: 100%;
   border: 0.3px;
   border-color: ${theme.lightGray};
`

export const ProfileName = styled.Text`
   color: ${theme.textDark};
   font-size: 16px;
   font-family: ${fontStyle.semiBold};
`

export const PostImageContainer = styled.ImageBackground`
    position: relative;
    align-self: center;
    width: 100%;
    height: 100%;
    object-fit: contain;
`

export const TimerPublicationContent = styled.View`
    flex-direction: row;
    gap: 5px;
    align-items: center;
    margin-top: -4px;

`
export const TimerPublication = styled.Text`
   color: ${theme.textLight};
   font-size: 10px;
   font-family: ${fontStyle.regular};
`

export const PostHeader = styled.View`
    padding: 12px;
    margin-bottom: 5px;
`