import styled from "styled-components/native";

import { theme, fontStyle } from "../../Theme/theme"

export const RoomInfoContainer = styled.View`
     height: 100%;
     width: 100%;
`

export const ShadowBg = styled.ImageBackground`
    width: 100%;
    height: 270px;
`

export const Shadow = styled.View`
    width: 100%;
    height: 100%;
    background-color: #00000070;
    padding: 19px 24px 14px;
    justify-content: space-between;
`

export const ContentPage = styled.View`
    padding: 15px 20px 20px;
    gap: 10px;

`

export const PublicImage = styled.Image`
    object-fit: cover;
    width: 100%;
    height: 240px;
`

export const RowDirection = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
`

export const ParticipantsLine = styled.View`
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    margin-top: 20px;
`

export const ParticipantsText = styled.Text`
    font-size:14px;
    color: ${theme.textDark};
    font-family: ${fontStyle.regular};
`

export const ParticipantsContainer = styled.View`
    margin-top: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

`
export const Separator = styled.View`
    width: 90%;
    height: 0.5px;
    background-color: ${theme.lightGray};
    align-self: center;
`

export const ToRightContainer = styled.View`
    margin-right: 25px;

`

export const ContainerAdjust = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
`

export const BottomOptions = styled.View`
    flex-direction: row;
    justify-content: space-evenly;
    border-top-width: 0.3px;
    border-top-color: ${theme.inputTextColor};
    align-items: center;
    padding: 18px 0px;
    margin-top: 20px;
`

export const Text14 = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 14px;
    color: ${theme.textDark};
`

export const AdminLine = styled.View`
    width: 70%;
    align-self: flex-end;
    padding: 5px 10px 2px;
    border-bottom-width: 0.5px;
    border-bottom-color: ${theme.inputTextColor};
`

export const MoreText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 12px;
    color: ${theme.lightGray};
    align-self: flex-end;
`

export const Divisor = styled.View`
    width: 1px;
    height: 80%;
    background-color: ${theme.lightGray};
`