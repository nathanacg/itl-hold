import styled from "styled-components/native";
import { theme, fontStyle } from "../../../../Theme/theme";

export const UserInfo = styled.View`
    flex-direction: row;
    gap: 20px;
`

export const UserImage = styled.Image`
    width: 52px;
    height: 52px;
    border-radius: 26px;
`

export const UserName = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 14px;

`

export const TextOption = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 16px;
    color: #000;
    margin-top: 2px;
`

export const OptionsContainer = styled.View`
    gap: 7px;
    margin: 10px 0;
`