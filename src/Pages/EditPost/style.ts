import styled from "styled-components/native";
import { fontStyle, theme } from "../../Theme/theme";

export const Container = styled.View`
    /* flex: 1; */
    justify-content: flex-start;
`

export const ContainerAlign = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`
export const ContainerBottom = styled.View`
    height: 50px;
    width: 80%;
    align-items: center;
    justify-content: space-between;
    /* background-color: #c4c4c459; */
    position: absolute;
    z-index: 5;
    bottom: 60px;
    left: 38px;
    justify-content: center;
    flex-direction: row;
    border-radius: 10px;
`

export const PrincipalImage = styled.Image`
    width: 98%;
    height: 50%;
`

export const HeaderButton = styled.TouchableOpacity`
    justify-content: center;
    height: 35px;
    align-items: center;
    padding: 4px 25px;
    background-color: ${theme.primarycolor};
    border-radius: 8px;
    position: absolute;
    right: 0px;
`

export const ButtonText = styled.Text`
    font-family: ${fontStyle.semiBold};
    color: ${theme.secondaryColor};
    font-size: 14px;
    margin-top: 2px;
`