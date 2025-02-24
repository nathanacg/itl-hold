import styled from 'styled-components/native';


import { fontStyle, theme } from "../../Theme/theme"

export const Header = styled.View`
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
   padding:18px 20px 0px 28px;
`;

export const UserPrifleContainer = styled.View`
    flex-direction: row;
    align-items: center;
    gap:10px;
    margin-bottom: 10%;
    margin-top: 6%;
`

export const PorfileName = styled.Text`
    font-size:16px;
    color: ${theme.secondaryColor};
    font-family: ${fontStyle.semiBold};

`

export const ContainerBottonMenus = styled.View`
    margin-top:35%;
    justify-content: flex-end;
`

