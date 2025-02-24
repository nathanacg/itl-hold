import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';

export const Container = styled.ScrollView`
   flex: 1;
   background-color: #fff;
`;

export const Header = styled.View`
    height: 65px;
    flex-direction: row;
    align-items:center;
    justify-content: space-between;
    padding:0 20px;
    top:0;
    background-color: #fff;
`

export const TitleHeader = styled.Text`
    color: ${theme.textDark};
    font-size: 18px;
    font-family: ${fontStyle.semiBold};
`

export const TextHeader = styled.Text`
    color: ${(props: { color: string }) => props.color};
    font-size: 16px;
    font-family: ${fontStyle.regular};
`

export const ImageSelected = styled.Image`
    width: 100%;
    height: 270px;
    margin-bottom: 10%;
`


export const Image = styled.Image`
    width: 106px;
    height: 112.28px;
    margin-right: 2px;
    margin-bottom: 2px;
`