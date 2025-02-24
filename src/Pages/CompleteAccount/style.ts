import styled from "styled-components/native";

import { theme, fontStyle } from "../../Theme/theme"

interface profileImgProps {
    rounded: boolean
}

export const ProfileImageContent = styled.View`
    width:100%;
    flex-direction:row;
    justify-content:center;
    padding: 10px;
    margin: 20px 0px;
`

export const CameraIcon = styled.Image`
    width:22%;
`

export const ProfileIcon = styled.Image`
    width:140px;
    height:140px;
    border-radius:${(props: profileImgProps) => props.rounded ? '100px' : '0px'};
`
export const TextLabel = styled.Text`
    font-size:15px;
    padding: 0px 20px 0px 0px;
    color: ${theme.textDark};
    font-family: ${fontStyle.regular};
`

export const TextLabelBold = styled.Text`
    font-size:15px;
    font-family: ${fontStyle.semiBold};
    color: ${theme.textDark};
    margin-top:8px;
`

export const PrivateProfileContent = styled.View`
    flex-direction:row;
    justify-content:space-between;
    margin:20px 0px;
    margin-top:10px; 
`

