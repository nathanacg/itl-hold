import styled from "styled-components/native"

import {theme, fontStyle} from "../../../../Theme/theme"


export const AddAvaliationContainer = styled.View`
    padding: 10px;
    padding-top: 30px;
    padding-bottom: 0;
`
export const AddAvaliationList = styled.View`
    flex-direction: row;
    gap: 10px;
    margin: 10px 0;
`
export const FaceCard = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    gap: 6px;
`

export const AvaliationText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 14px;
    color: ${theme.textLight};
`

export const AvaliationMediaText = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 12px;
    color: ${theme.textLight};
`

export const RowDirection = styled.View`
    flex-direction: row;
    align-items: center;
`