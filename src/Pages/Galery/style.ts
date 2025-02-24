import styled from 'styled-components/native';
import { fontStyle } from '../../Theme/theme';

export const Container = styled.ScrollView`
   flex: 1;
   background-color: #171717;
`;

export const Header=styled.View`
    height: 65px;
    flex-direction: row;
    align-items:center;
    justify-content: flex-end;
    padding:0 20px;
    top:0px;
    background-color: #171717;
`

export const TextHeader=styled.Text`
    color: #fff;
    font-size: 16px;
    font-family: ${fontStyle.regular};
`

export const ImageContainer = styled.TouchableOpacity`
    width: 25%;
    margin-right: 2px;
    margin-bottom: 2px;
`

export const Image=styled.Image`
    width: 100%;
    height: 112.28px;
`