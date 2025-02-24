import styled from "styled-components/native";

import { theme } from "../../Theme/theme"


export const PostContainer = styled.View`
    flex: 1;
    position: relative;
    overflow: hidden;
`

export const ImagePublication = styled.Image`
    width: 347px;
    height: 389px;
`

export const User = styled.TouchableOpacity`
    position: absolute;
    left: 12px;
    bottom: 6px;
`

export const IndexContainer = styled.View`
    background-color: #000000C2;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 7px;
    bottom: 7px;
    width: 38px;
    height: 20px;
    border-radius: 3px;
    
`

export const CarouselIndex = styled.Text`
    text-align: center;
    vertical-align: middle;
    color: ${theme.secondaryColor};
    font-size: 11px;
`

export const IndexIndicator = styled.View`
    flex-direction: row;
    position: absolute;
    bottom: 10px;
    align-self: center;
`

export const Indicator = styled.View`
    margin-right: 12px;
    width: 6px;
    height: 6px;
    border-radius: 2px;
    background-color: ${(props: { active: boolean }) => props.active ? ('#fff') : ('transparent')};
`

export const PostImageContainer = styled.ImageBackground`
    position: relative;
    align-self: center;
    width: 100%;
    height: 100%;
    object-fit: contain;
`

export const MarkedContainer = styled.View`
    flex-direction: row;
    align-items: center
`

export const MarkedUserImage = styled.Image`
    width: 30px;
    height: 30px;
    border-radius: 30px;
`

export const MarkedUserImageBlank = styled.View`
    width: 30px;
    height: 30px;
    border-radius: 30px;
    background-color: white;
    align-items: center;
    justify-content: center;
`

export const MarkedUserImageNone = styled.Text`
    font-size: 20px;
`

export const MarkedUserNameContainer = styled.View`
    margin-left: 12px;
    margin-bottom: 10px;
    align-items: center;
    background-color: #eeeeee;
    min-width: 40px;
    max-width: 150px;
    height: 23px;
    border-radius: 5px;
    padding: 2px 5px;
`

export const MarkedUserName = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #231F20;
`