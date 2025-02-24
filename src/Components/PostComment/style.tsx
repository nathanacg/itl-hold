import styled from "styled-components/native";

import { theme, fontStyle } from "../../Theme/theme"

export const Container = styled.View`
    width: 100%;
`

export const Header = styled.View`
    padding: 0px 32px;
    margin-top: -13px;
    flex-direction: row;
    justify-content: space-between;
`

export const HeaderTitle = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 14px;
    color: ${theme.textDark};
`

export const TitleCount = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 14px;
    color: ${theme.textDark};
`

export const Button = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 14px;
    color: ${theme.textligthGray};

`