import styled from "styled-components/native";
import { fontStyle, theme } from "../../../../Theme/theme";

export const TextModal = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 15px;
    color: ${theme.textDark};
`

export const OptionContainer = styled.TouchableOpacity`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 18px 10px 25px;
`

export const Container = styled.View`
    padding-right: 5px;
    width: 245px;
    background-color: ${theme.secondaryColor};
    z-index: 6;
`

export const Separator = styled.View`
    height: 1px;
    background-color: ${theme.lightGray}
`