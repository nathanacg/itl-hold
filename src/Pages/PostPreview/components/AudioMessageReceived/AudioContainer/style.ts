import styled from "styled-components/native";

import { theme, fontStyle } from '../../../../../Theme/theme'

export const Container = styled.View`
    flex-direction: row;
    /* justify-content: space-between; */
    align-items: center;
    padding: 9px 10px 9px 15px;
    width: ${(props: { width: string }) => props.width ? (props.width) : ('345px')};
    /* border-radius: 34px; */
    gap: 10px;
    height: 40px;
    right: 10px;
    left: 0px;
`

export const AudioWaves = styled.View`
    flex: 1;
    background-color: ${theme.primarycolor};
    height: 5px;
    margin-left: 8px;
    margin-right: 17px;
`

export const AudioTime = styled.Text`
    font-family: ${fontStyle.regular};
    margin-top: -5px;
    font-size: 11px;
    color: ${theme.textligthGray};
    margin-bottom: -4px;
    margin-left: 54.5px;
`