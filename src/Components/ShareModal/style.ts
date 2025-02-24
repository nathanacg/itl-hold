import styled from "styled-components/native";

export const Container = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    gap: 20px;
    margin-bottom: 10px;
    flex-wrap: wrap;
`

export const OptionContainer = styled.TouchableOpacity`
    width: 25%;
    height: 100px;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
`

export const ShareImage = styled.Image`
    width: 55px;
    object-fit: contain;
`