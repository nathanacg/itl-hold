import styled from "styled-components/native";

import { theme, fontStyle } from '../../Theme/theme'

export const Container = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 9px 10px 9px 15px;
    width: ${(props: { width: string }) => props.width ? (props.width) : ('345px')};
    border-radius: 6px;
    gap: 10px;
    border-width: 1px;
    border-color: #00000015;
    background-color: #00000005;
   

`

export const AudioWaves = styled.View`
    flex: 1;
    background-color: ${theme.primarycolor};
    height: 5px;
    margin-left: 8px;
    margin-right: 17px;
`

export const AudioTime = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 14px;
    color: ${theme.primarycolor};
`