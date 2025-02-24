import styled from "styled-components/native"

import { fontStyle } from "../../Theme/theme"

export const Container = styled.View`
    width: 100%;
    height: 100%;
`

export const IconLanguage = styled.Image`
    width: 35px;
    height: 25px;
    margin:3px;
`

export const SelectDropdownLanguageContainer = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: flex-end;
    right: 15px;
`

export const ContentPage2 = styled.View`
    padding: 15px 0px 0px;
    height: 100%;
    display: flex;
    justify-content: space-between;
`

export const ContentPage = styled.View`
    padding: 15px 0px 60px;
    height: 100%;
    display: flex;
    justify-content: space-between;
`

export const ContentBottomPage = styled.View`
    height: 100%;
    display: flex;
    justify-content: flex-end;
`

export const ImageBackground = styled.ImageBackground`
    width: 100%;
    height: 100%;
`

export const TextContent = styled.Text`
    color: #fff;
    font-weight: 400;
    font-size: 16px;
    font-family: ${fontStyle.regular};
`

export const TitleHome = styled.Text`
    color: #fff;
    font-size: 28px;
    padding: 0px 22px 0px;
    margin-bottom: 10px;
    font-family: ${fontStyle.Bold};
`

export const ButtonLogin = styled.Text`
    color: #fff;
    font-size: 15px;
    text-align: center;
    font-family: ${fontStyle.regular};
`

export const TextUnderline = styled.Text`
    text-decoration: underline;
    color: #fff;
    font-size: 15px;
    font-family: ${fontStyle.regular};
    margin-left:10px;

`
export const ContainerText = styled.View`
    margin-bottom:10%;
    padding: 0px 22px 0px;
`