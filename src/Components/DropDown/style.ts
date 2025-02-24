import styled from "styled-components/native";

interface containerDropDow {
    width?: string
}

export const ContainerDropDown = styled.View`
    background-color: #fff;
    width: ${(props: containerDropDow) => props.width || '100%'};
    z-index: 4;
    border-width:1px;
    border-color:#fff;
    border-right-color:#c4c4c4;
    border-radius:5px;
    position: relative;
    justify-content:space-between;
    margin-left:7px;
    height: 41px;
`

export const SelectedValue = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content:space-between;
    padding: 3px 5px 2px 5px;
`

export const DropDownItem = styled.Text`
    background-color: #fff;
`

export const ButtonText = styled.Text`
    margin-top:6px;
`

