import styled from "styled-components/native";
import { theme } from "../../Theme/theme";


export const SafeAreaViewContainer = styled.View`
    flex: 1;
    background-color: ${theme.secondaryColor};
    justify-content: flex-end;
    `
export const LoagingContainer = styled.View`
    z-index: 4;
    top: 50%;
    left: 45%;
    position: absolute;
`
