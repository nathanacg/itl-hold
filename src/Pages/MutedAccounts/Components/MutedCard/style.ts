import styled from "styled-components/native";
import { fontStyle, theme } from "../../../../Theme/theme";


export const ContainerAccounts = styled.View`
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
   padding: 0px 25px 3px;
`;

export const ImageProfile = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 50px;
`


export const UserName = styled.Text`
    font-size:14px;
   color: ${theme.textDark};
   font-family: ${fontStyle.semiBold};
`

export const UserNickname = styled.Text`
    font-size:12px;
   color: ${theme.textDark};
   font-family: ${fontStyle.regular};
`

export const Text = styled.Text`
    color:${theme.textDark};
    font-family: ${fontStyle.regular};
    font-size:11px;
`