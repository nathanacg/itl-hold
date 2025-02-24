import styled from "styled-components/native";

import { theme, fontStyle } from '../../Theme/theme'
export const Container = styled.View`
`

export const SubContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
`

export const AudioWaves = styled.View`
    background-color: ${theme.textligthGray};
`

export const AudioTime = styled.Text`
    font-family: ${fontStyle.Bold};
    font-size: 10px;
    color: ${theme.textligthGray};
    margin-left: 40px;
`