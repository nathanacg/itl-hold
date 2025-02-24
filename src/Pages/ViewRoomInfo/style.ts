import styled from "styled-components/native";
import { theme } from "../../Theme/theme";



export const PublicImage = styled.Image`
    object-fit: cover;
    width: 100%;
    height: 180px;
`

export const BottomOptions = styled.View`
    flex-direction: row;
    border-top-width: 0.3px;
    border-top-color: ${theme.inputTextColor};
    justify-content: space-evenly;
    align-items: center;
    height: 50px;
    margin-top: 80px;
`

export const Divisor = styled.View`
    width: 1px;
    height: 75%;
    background-color: ${theme.lightGray};
`
