import styled from "styled-components/native";

import { theme, fontStyle } from "../../Theme/theme"

export const ButtonNav = styled.TouchableOpacity`
    width: 33%;
    align-items: center;
    justify-content: center;
    border-width: 1px;
    border-color: ${theme.primarycolor};
    border-radius: 6px;
    padding: 7px 12px;
`

export const ContentContainer = styled.View`
    padding-top: 18px;
    flex: 1;
`

export const ButtonsContainer = styled.View`
    margin-top: 35px;
    /* margin-bottom: 10px; */
`

export const AllContainer = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 18px 27px 18px 25px;
    gap: 10px;
    border-bottom-width: 0.5px;
    border-bottom-color: ${theme.lightGray};
`

export const AllText=styled.Text`
    font-size:14px;
    color: ${theme.textDark};
    font-family: ${fontStyle.regular};
`

export const Separator = styled.View`
    width: 100%;
    height: 0.5px;
    background-color: ${theme.lightGray};
`

export const ContentBox = styled.View`
   width: 100%;
   align-items: flex-start;
   gap: 20px;
   padding: 0px 24px;
`