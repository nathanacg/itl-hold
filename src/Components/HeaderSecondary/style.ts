import styled from "styled-components/native";

import { theme } from '../../Theme/theme';
import { Dimensions, Platform } from "react-native";



export const HeaderApp = styled.View`
    width: 100%;
    justify-content: space-between;
    flex-direction: row;
    background-color: ${theme.secondaryColor};
    padding: 10px 25px 22px 15px;
    box-shadow:  0px 1px #00000010;
`

export const Logo = styled.View`
    flex-direction: row;
    align-items: center;
`

export const IconsContainer = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 22px;
    overflow: visible;
`

export const NotificationsInfo = styled.View`
    border-radius: 10px;
    height: 18px;
    width: 18px;
    z-index: 100;
    font-size: 20px;
    text-align: center;
    justify-content: center;
    align-items: center;
    background-color: ${theme.dangerColor};
    position: absolute;
    top: 40%;
    right: -10px;
`

export const Notification = styled.Text`
    font-size: 13px;
    text-align: center;
    color: ${theme.secondaryColor};
`