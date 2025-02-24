import styled from "styled-components/native";

import { theme, fontStyle } from '../../Theme/theme'

interface UserListProps {
    border: boolean
}

export const Container = styled.View.attrs({
    style: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
})`
    flex-direction:row;
    padding:20px;
    border-radius: 15px;
    background-color:${theme.lightGray};
    gap:10px;
`;

export const ModalContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const CardContainer = styled.TouchableOpacity`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border: 0.5px;
    border-color: ${theme.lightGray};
    border-top-color: transparent;
    border-left-color: transparent;
    border-right-color: transparent;
    padding: 6px 27px 7px 25px;
    border-bottom-width: ${(props: UserListProps) => props.border ? "0.5px" : "0"};
    margin-bottom: 1px;
`

export const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 10px;
`
export const UserName = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 12px;
    color: ${theme.inputTextColor};
    line-height: 18px;
`
export const UserAddress = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 12px;
    line-height: 17px;
    color: ${theme.textDark};
`