import styled from "styled-components/native";

import { theme, fontStyle } from "../../../../Theme/theme"

export const MusicCardContainer = styled.TouchableOpacity`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`

export const LeftContainer = styled.View`
    flex-direction: row;
    gap: 9px;
`

export const MusicImage = styled.Image`
    width: 47px;
    height: 47px;
`

export const BoldText = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 13px;
    color: ${theme.textDark};
`

export const TextLine= styled.View`
    flex-direction: row;
    align-items: center;
    gap: 4px;
`

export const LightText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 13px;
    color: ${theme.textDark};
    align-items: center;
`

export const Dot = styled.View`
    width: 3px;
    height: 3px;
    border-radius: 1.5px;
    background-color: ${theme.textDark};
`