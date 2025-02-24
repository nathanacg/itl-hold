import styled from "styled-components/native";
import { theme, fontStyle } from "../../../../Theme/theme"

export const StoryOption = styled.TouchableOpacity`
    width: 100%;
    flex-direction: row;
    align-items: center;
    gap: 13px;
`

export const RigthView = styled.TouchableOpacity`
    position: absolute;
    right: 0;
`

export const WhiteText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 14px;
    line-height: 18px;
    color: ${theme.secondaryColor};
`

export const FontText = styled.Text`
    font-family: ${(props: { font: string }) => props.font};
    font-size: 14px;
    line-height: 18px;
    color: ${(props: { selected: boolean }) => props.selected ? theme.primarycolor : theme.secondaryColor};
`

export const FontOption = styled.TouchableOpacity`
    width: 108px;
    height: 23px;
    justify-content: center;
    align-items: center;
    background-color:#FFFFFF4D;
    border-radius: 5px;
    margin-right: 11px;
`

export const ColorCircle = styled.TouchableOpacity`
    background-color:#FFFFFF4D;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    margin: 0 8px;
`