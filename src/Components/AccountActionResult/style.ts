import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';

export const ContainerProfile = styled.View`
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
   padding:2% 7%;
        border-color: ${theme.lightGray};
        border-top-color: transparent;
        border-left-color: transparent;
        border-right-color: transparent;
        border-bottom-width: ${(props: { border: boolean }) => props.border ? "0.5px" : "0px"};
    margin-bottom: 1px;
`;


export const ProfileUserName = styled.Text`
    font-size:14px;
    align-items: center;
    flex-direction: row;
   color: ${theme.textDark};
   font-family: ${fontStyle.semiBold};
`

export const ImageProfile = styled.Image`
    width: 44px;
    height: 44px;
    border-radius: 44px;
`

export const Name = styled.Text`
   font-size:12px;
   color: ${theme.textDark};
   font-family: ${fontStyle.regular};
`

export const Button = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    padding: 2px 8px;
    min-width: 23.5%;
    border-radius: 6px;
    border-width: 1px;
    border-color: ${theme.primarycolor};
    background-color: ${theme.primarycolor};
`

export const TextButton = styled.Text`
    text-align: center;
    font-size: 12px;
    line-height: 21px;
    font-family: ${fontStyle.regular};
    color: #fff;
`